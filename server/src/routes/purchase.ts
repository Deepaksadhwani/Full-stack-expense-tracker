import dotenv from "dotenv";
import express from "express";
import { purchasePremium } from "../controllers/purchaseController";
dotenv.config({ path: ".env" });

export const purchaseRouter = express.Router();

purchaseRouter.get("/premiummembership", purchasePremium);
