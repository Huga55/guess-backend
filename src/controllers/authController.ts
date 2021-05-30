import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import User from "./../models/user";
import { authControllerLoc, LangType } from "../localization";
import globalError from "./error";
import {RequestType} from "../middlewares/authMiddleware";
import { validationResult } from "express-validator";
import randomstring from "randomstring";
import nodemailer from "nodemailer";

type LoginBodyType = {
    email: string
    password: string
}

export type HeaderType = {
    lang: LangType
    authorization: string | null
    langInterface: LangType
} & Request["headers"]

export const login = async (req: RequestType, res: Response) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: false, error: "Неверные данные", detail: errors.array()});
        }

        const { email, password } = req.body as LoginBodyType;
        const { langInterface } = req.headers as HeaderType;

        const isUserExist = await User.findOne({email});

        const userError = () => {
            return res.status(404).send({success: false, error: authControllerLoc.errors["404"][langInterface]});
        }
        
        if(!isUserExist) return userError();

        const isPasswordTrue = await bcrypt.compare(password, isUserExist.password);

        if(!isPasswordTrue) return userError();

        const token = await jwt.sign(
            {email: isUserExist.email},
            config.get("secret-string"),
            {expiresIn: "30 days"},
        );

        await User.updateOne({_id: isUserExist._id}, {token});

        return res.status(200).send({success: true, data: {email, token, name: isUserExist.name, _id: isUserExist._id}});
    }catch(error) {
        return globalError(error, res);
    }
}

type RegisterBodyType = {
    email: string
    password: string
    name: string
}

export const register = async (req: RequestType, res: Response) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: false, error: "Неверные данные", detail: errors.array()});
        }

        const { email, password, name } = req.body as RegisterBodyType;
        const { langInterface, lang } = req.headers as HeaderType;

        const isUserExist = await User.findOne({$or: [{email}, {name}]});

        if(isUserExist) return res.status(409).send({success: false, error: authControllerLoc.errors["409"][langInterface]});

        const hashPassword = await bcrypt.hash(password, 12);

        const token = await jwt.sign(
            {email},
            config.get("secret-string"),
            {expiresIn: "30 days"},
        );

        let user = new User({email, password: hashPassword, name, langInterface, lang, token});

        user = await user.save();

        return res.status(200).send({success: true, data: {email, name, lang, langInterface, token, _id: user._id}});
    }catch(error) {
        return globalError(error, res);
    }
}

export const check = async (req: RequestType, res: Response) => {
    try {
        const { _id, email, lang, langInterface, name } = req.dataUser;

        return res.status(200).send({success: false, data: {_id, email, lang, langInterface, name}});
    }catch(error) {
        return globalError(error, res)
    }
}

export const logout = async (req: RequestType, res: Response) => {
    try {
        const { _id } = req.dataUser;

        await User.findOneAndUpdate({_id}, {token: null});

        res.status(200).send({success: true});
    }catch(error) {
        return globalError(error, res);
    }
}

type RememberPasswordType = {
    _id: string
}

export const rememberPassword = async (req: RequestType, res: Response) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: false, error: "Неверные данные", detail: errors.array()});
        }

        const { _id } = req.body as RememberPasswordType;
        const { langInterface } = req.headers as HeaderType;

        const user = await User.findOne({_id});

        if(!user) return res.status(409).send({success: false, error: authControllerLoc.errors["409-remember"][langInterface]});

        const password = await randomstring.generate(8);

        const hashPassword = await bcrypt.hash(password, 12);

        await User.updateOne({_id}, {password: hashPassword});

        await mail(user.email, password, langInterface);

        return res.status(200).send({success: true, data: {message: authControllerLoc.success.remember[langInterface]}});
    }catch(error) {
        return globalError(error, res);
    }
}

const mail = async (email: string, password: string, lang: LangType) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: config.get("email"),
            pass: config.get("password")
        },
    });

    const mailOptions = {
        from: config.get("email") as string,
        to: email,
        subject: authControllerLoc.mail.title[lang],
        text: authControllerLoc.mail.message[lang](password),
    };

    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.messageId);
        }
    });
}