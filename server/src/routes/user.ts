import express from "express";
import {
  fetchLeaderboardExpenseController,
  insertTotalExpenseController,
  userSignin,
  userSignup,
} from "../controllers/userController";
import { authenticateToken } from "../utils/securityHelpers";
import { sendMail } from "../services/brevo";
import { mailSchema } from "../utils/types";

export const userRouter = express.Router();

userRouter.post("/sign-up", userSignup);
userRouter.post("/sign-in", userSignin);
userRouter.post(
  "/add-totalexpense",
  authenticateToken,
  insertTotalExpenseController
);
userRouter.get(
  "/get-leaderboard",
  authenticateToken,
  fetchLeaderboardExpenseController
);

userRouter.post("/password/forgotpassword", (req, res) => {
  const response = mailSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(500).json({ message: "Invalid input found." });
  }
  const data = [req.body];
  sendMail(data);
  res.status(200).json("Verification mail is sent, check you mail id.");
});
