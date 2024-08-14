import express from "express";
import {
  downloadExpenseController,
  fetchLeaderboardExpenseController,
  getReport,
} from "../controllers/FeaturesController";
import { authenticateToken } from "../utils/securityHelpers";
import { getExpenseRecordController } from "../controllers/historyController";

export const premiumFeaturesRouter = express.Router();

premiumFeaturesRouter.use(authenticateToken);
premiumFeaturesRouter.get(
  "/get-leaderboard",
  fetchLeaderboardExpenseController
);
premiumFeaturesRouter.get("/get-report", getReport);
premiumFeaturesRouter.get("/download", downloadExpenseController);
premiumFeaturesRouter.get("/expense-history", getExpenseRecordController);
