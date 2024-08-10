import express from "express";
import { userSignin, userSignup } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/sign-up", userSignup);
userRouter.post("/sign-in", userSignin);
