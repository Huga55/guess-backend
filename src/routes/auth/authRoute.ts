import express from "express";
import path from "path";
import { login } from "./../../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", login);