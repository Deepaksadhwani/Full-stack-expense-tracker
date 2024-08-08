import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const key_id: any = process.env.RAZROPAY_API_KEY;
const key_secret = process.env.RAZORPAY_SECRET_KEY;

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
    const order = await rpz.orders.create(options, (err, order) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ data: order });
      }
    });
    
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "something went wrong", error });
  }
};
