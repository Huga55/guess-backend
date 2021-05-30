import { RequestType } from "./../../middlewares/authMiddleware";
import { authControllerLoc } from "./../../localization/index";
import { check } from "express-validator";

const emailValidate = check("email").isEmail().withMessage((req: RequestType) => authControllerLoc.validate.email[req.dataUser.lang]);
const passwordValidate = check("password").isLength({min: 6}).withMessage((req: RequestType) => authControllerLoc.validate.password[req.dataUser.lang]);
const nameValidate = check("name").isEmpty().withMessage((req: RequestType) => authControllerLoc.validate.name[req.dataUser.lang]);

export const loginValidate = [
    emailValidate,
    passwordValidate,
];

export const registerValidate = [
    emailValidate,
    passwordValidate,
    nameValidate
];