import dotenv from "dotenv";
import express from "express";
import Razorpay from "razorpay";
dotenv.config({ path: ".env" });

export const purchaseRouter = express.Router();



purchaseRouter.get("/premiummembership");
