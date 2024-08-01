import express from "express";
import { insertUser } from "../controllers/userController";

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
