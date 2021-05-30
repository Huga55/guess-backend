import { Request, Response, NextFunction } from "express";
import globalError from "./../controllers/error";
import { HeaderType } from "./../controllers/authController";
import { authMiddlewareLoc } from "./../localization/index";
import jwt from "jsonwebtoken";
import config from "config";
import User, {UserType} from "./../models/user";

type RequestDataUserType = {
    dataUser: UserType;
}

export type RequestType = Request & RequestDataUserType;

export default async (req: RequestType, res: Response, next: NextFunction) => {
    try {
        const { lang, langInterface } = req.headers as HeaderType;
        const token = req.headers["authorization"];

        const errorToken = () => res.status(401).send({success: false, error: authMiddlewareLoc.errors["401"][langInterface]});

        if(!token) return errorToken();

        const email = await jwt.verify(token.split(" ")[1], config.get("secret-string"));

        const user = await User.findOne({email});

        if(!user) return errorToken();

        req.dataUser = user;
        next();
    }catch(error) {
        globalError(error, res);
    }
}