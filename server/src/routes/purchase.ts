import express from "express";
import {
  lastSuccessfulTransaction,
  purchasePremium,
  updateTransaction,
} from "../controllers/purchaseController";
import { authenticateToken } from "../utils/securityHelpers";
import { getReport } from "../controllers/FeaturesController";
export const purchaseRouter = express.Router();

purchaseRouter.use(authenticateToken);
purchaseRouter.get("/premiummembership", purchasePremium);
purchaseRouter.post("/update-transaction", updateTransaction);
purchaseRouter.get("/verified-premium", lastSuccessfulTransaction);
purchaseRouter.get("/get-report", getReport);
