import Razorpay from "razorpay";
import dotenv from "dotenv";
import { createOrder, fetchFirstRecentTransaction, updateOrder } from "../services/purchaseService";

dotenv.config({ path: ".env" });

const key_id: any = process.env.RAZROPAY_API_KEY;
const key_secret = process.env.RAZORPAY_SECRET_KEY;




/*----------------------Get last transaction for verification--------------------- */

export const lastSuccessfulTransaction = async (req: any, res: any) => {
  const id = req.userId;
  try {
    const response = await fetchFirstRecentTransaction(id);
    res.status(200).json({ status: response.status });
  } catch (error) {
    res.status(500).json({ message: "internal error." });
  }
};


/*---------------------createOrder  controller---------------- */
export const purchasePremium = async (req: any, res: any) => {
  const id = req.userId;
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
