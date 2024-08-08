import dotenv from "dotenv";
import express from "express";
import { purchasePremium } from "../controllers/purchaseController";
dotenv.config({ path: ".env" });

export const purchaseRouter = express.Router();

purchaseRouter.get("/premiummembership", purchasePremium);
purchaseRouter.post("/paymentverfication", (req, res) => {
  console.log( req.body);
  res.status(200).json({
    success: true,
  });
});
