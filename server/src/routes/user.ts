import express from "express";
import {
  fetchLeaderboardExpenseController,
  insertTotalExpenseController,
  userSignin,
  userSignup,
} from "../controllers/userController";
import { authenticateToken } from "../utils/securityHelpers";

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
