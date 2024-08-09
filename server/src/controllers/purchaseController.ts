import Razorpay from "razorpay";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/securityHelpers";

dotenv.config({ path: ".env" });

const key_id: any = process.env.RAZROPAY_API_KEY;
const key_secret = process.env.RAZORPAY_SECRET_KEY;

const prisma = new PrismaClient();

interface OrderTypes {
  paymentId: string;
  orderId: string;
  status: string;
  userId: number;
}

/*----------------------Get last transaction for verification--------------------- */

export const lastSuccessfulTransaction = async (req: any, res: any) => {
  const authHeader = req.headers["user-auth-token"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided." });

  const token = authHeader.split(" ")[1];
  const userData = verifyToken(token);
  if (!userData) return res.status(401).json({ message: "Invalid token." });
  const { id }: any = userData;

  try {
    const response: any = await prisma.order.findFirst({
      where: {
        userId: id,
        status: "SUCCESSFUL",
      },
      orderBy: { createdAt: "desc" },
      select: { status: true },
    });
    console.log(response)
    res.status(200).json({ status: response.status });
  } catch (error) {
    res.status(500).json({ message: "internal error." });
  }
};
/*----------------------createOrder with database--------------------- */
export const createOrder = async (orderData: OrderTypes) => {
  const response = await prisma.order.create({
    data: {
      paymentId: orderData.paymentId,
      orderId: orderData.orderId,
      status: orderData.status,
      userId: orderData.userId,
    },
  });
  return response;
};
/*----------------------update order with payment id--------------------- */

export const updateOrder = async (
  orderId: string,
  paymentId: string,
  status: string
) => {
  const response = await prisma.order.update({
    where: {
      orderId,
    },
    data: {
      paymentId,
      status,
    },
  });
  return response;
};
/*---------------------createOrder  controller---------------- */
export const purchasePremium = async (req: any, res: any) => {
  const authHeader = req.headers["user-auth-token"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided." });

  const token = authHeader.split(" ")[1];
  const userData = verifyToken(token);
  if (!userData) return res.status(401).json({ message: "Invalid token." });
  const { id }: any = userData;
  try {
    const options = {
      amount: 2500,
      currency: "INR",
    };
    const rpz = new Razorpay({
      key_id,
      key_secret,
    });
    rpz.orders.create(options, async (err, order) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: err });
      }
      const insertOrder = await createOrder({
        paymentId: "null",
        status: "PENDING",
        orderId: order.id,
        userId: id,
      });
      res.status(200).json({
        order,
        orderId: insertOrder.orderId,
        amount: order.amount,
        key_id,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "something went wrong", error });
  }
};

/*----------------------updateTransaction controller--------------------- */

export const updateTransaction = async (req: any, res: any) => {
  const { paymentId, orderId, status } = req.body;
  try {
    const data = await updateOrder(orderId, paymentId, status);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: "Bad Request." });
  }
};
