import express from "express";
import {
  forgetPasswordController,
  resetPasswordController,
} from "../controllers/passwordController";

export const PasswordRouter = express.Router();

PasswordRouter.post("/forgotpassword", forgetPasswordController);
PasswordRouter.post("/resetpassword", resetPasswordController);
