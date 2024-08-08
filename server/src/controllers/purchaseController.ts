import Razorpay from "razorpay";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { response } from "express";

dotenv.config({ path: ".env" });

const key_id: any = process.env.RAZROPAY_API_KEY;
const key_secret = process.env.RAZORPAY_SECRET_KEY;

const prisma = new PrismaClient();

const createOrder = async () => {};

export const purchasePremium = async (req: any, res: any) => {
  try {
    const options = {
      amount: 2500,
      currency: "INR",
    };

    const rpz = new Razorpay({
      key_id,
      key_secret,
    });
    rpz.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: err });
      }
      res.status(200).json({ order, orderId: order.id, amount: order.amount, key_id });
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "something went wrong", error });
  }
};
