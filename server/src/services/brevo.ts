import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey: any = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
const sender = {
  email: "dsadhwani1@gmail.com",
};

interface Receiver {
  email: string;
}

export const sendMail = async (receivers: Receiver[], uuid: string) => {
  const response = await tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: "Password Reset Request",
    textContent: `
   Hi working,

We received a request to reset the password for your account.

To reset your password, please click the link below:

[Reset Your Password](http://localhost:5173/newpassword/${uuid})

If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.

Thank you,
The Expense Tracker

If you need further assistance, please contact us at support@DeepakExpenseTracker.com.
    `,
  });

  console.log(response);
};
