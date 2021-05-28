import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import User from "./../models/user";
import { authControllerLoc, LangType } from "../localization";
import globalError from "./error";

type LoginBodyType = {
    email: string
    password: string
}

type HeaderType = {
    lang: LangType
    token?: string
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as LoginBodyType;
        const { lang } = req.headers as HeaderType;

        const isUserExist = await User.findOne({email});

        const userError = () => {
            return res.status(404).send({success: false, error: authControllerLoc.errors["404"][lang]});
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

const register = async (res: Response, req: Request) => {
    try {
        
    }catch(error) {
        return globalError(error, res);
    }
}

export { login };