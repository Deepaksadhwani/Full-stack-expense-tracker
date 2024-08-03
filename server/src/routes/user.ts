import express from "express";
import { getUser, insertUser } from "../controllers/userController";
import { authValidationSchema } from "../utils/types";
import {
  compareHashPassword,
  generateToken,
  hashPassword,
} from "../utils/securityHelpers";

export const userRouter = express.Router();

userRouter.post("/signUp", async (req, res) => {
  let { fullName, password, email } = req.body;
  password = await hashPassword(password, 10);
  try {
    const response = await insertUser(email, password, fullName);
    const { id } = response;
    const token = generateToken(id);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).json({
      message: "you account is successfully created.",
      data: { email },
    });
  } catch (error) {
    res.status(500).json("Internal server error.");
  }
});

userRouter.post("/signIn", async (req, res) => {
  const parsed = authValidationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(404).json({
      message: "User does not exist.",
    });
  }
  const email = parsed.data.email;
  const plainPassword = parsed.data.password;
  const response = await getUser(email);
  if (response) {
    const hashedPassword = response?.password;
    const isValid = await compareHashPassword(plainPassword, hashedPassword);
    if (isValid) {
      const { id } = response;
      const token = generateToken(id);
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({
        message: "logged in successfully.",
        data: { email },
      });
    } else {
      res.status(401).json({ message: "Invalid Password." });
    }
  } else {
    res.status(404).json({
      message: "User does not exist.",
    });
  }
});
