import dotenv from "dotenv";
import express from "express";
import {
  lastSuccessfulTransaction,
  purchasePremium,
  updateTransaction,
} from "../controllers/purchaseController";
import { authenticateToken } from "../utils/securityHelpers";
import { getLeaderboard } from "../controllers/FeaturesController";
dotenv.config({ path: ".env" });
export const purchaseRouter = express.Router();

purchaseRouter.use(authenticateToken);
purchaseRouter.get("/premiummembership", purchasePremium);
purchaseRouter.post("/update-transaction", updateTransaction);
purchaseRouter.get("/verified-premium", lastSuccessfulTransaction);
purchaseRouter.get("/get-leaderboard", getLeaderboard);
