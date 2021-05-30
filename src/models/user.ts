import { Schema, model } from "mongoose";
import { LangType } from "./../localization";

const languages = ["ru", "en", "es"];

const userSchema = new Schema<UserType>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    lang: {
        type: String,
        enum: languages,
        required: true,
    },
    langInterface: {
        type: String,
        enum: languages,
        required: true,
        default: "en",
    }
});

export type UserType = {
    _id: string
    email: string
    password: string
    token: string | null
    name: string
    lang: LangType
    langInterface: LangType
}

export default model<UserType>("User", userSchema);