import { Schema, model } from "mongoose";
import { LangType } from "./../localization";

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
        enum: ["ru", "en", "es"],
        required: true,
    },
});

export type UserType = {
    _id: string
    email: string
    password: string
    token: string | null
    name: string
    lang: LangType
}

export default model<UserType>("User", userSchema);