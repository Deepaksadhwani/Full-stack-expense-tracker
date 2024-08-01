import express from "express";
import { getUser, insertUser } from "../controllers/userController";
import { authValidationSchema } from "../types";

export const userRouter = express.Router();

userRouter.post("/signUp", async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
    const response = await insertUser(email, password, fullName);
    res.status(201).json({
      message: "you account is successfully created.",
      data: response,
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
  const response = await getUser(email);
  res.status(200).json({
    message: "logged in successfully.",
    data: response,
  });
});
