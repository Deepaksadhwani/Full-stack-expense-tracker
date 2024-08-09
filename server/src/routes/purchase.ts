import dotenv from "dotenv";
import express from "express";
import {
  lastSuccessfulTransaction,
  purchasePremium,
  updateTransaction,
} from "../controllers/purchaseController";
import { authenticateToken } from "../utils/securityHelpers";
dotenv.config({ path: ".env" });

export const purchaseRouter = express.Router();

purchaseRouter.get("/premiummembership", purchasePremium);
purchaseRouter.post(
  "/update-transaction",
  authenticateToken,
  updateTransaction
);
purchaseRouter.get("/verified-premium", lastSuccessfulTransaction);
