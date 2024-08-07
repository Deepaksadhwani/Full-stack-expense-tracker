import Razorpay from "razorpay";

const key_id: any = process.env.RAZROPAY_API_KEY;
const key_secret = process.env.RAZORPAY_SECRET_KEY;

const rpz = new Razorpay({
  key_id,
  key_secret,
});

export const purchasePremium = async (req: any, res: any) => {
  try {
    const options = {
      amount: 2500, //25rs 2500 pese
      currency: "INR",
    };
    const order = await rpz.orders.create(options, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }

    });
    console.log(order);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "something went wrong", error });
  }
};
