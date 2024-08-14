import express from "express";
import {
  lastSuccessfulTransaction,
  purchasePremium,
  updateTransaction,
} from "../controllers/purchaseController";
import { authenticateToken } from "../utils/securityHelpers";
export const purchaseRouter = express.Router();

purchaseRouter.use(authenticateToken);
purchaseRouter.get("/premiummembership", purchasePremium);
purchaseRouter.post("/update-transaction", updateTransaction);
purchaseRouter.get("/verified-premium", lastSuccessfulTransaction);
