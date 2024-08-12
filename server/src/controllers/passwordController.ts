import { sendMail } from "../services/brevo";
import {
  insertForgetPasswordRecord,
  resetPassword,
} from "../services/passwordService";
import { getUser } from "../services/userService";
import { hashPassword } from "../utils/securityHelpers";
import { mailSchema, resetPasswordSchema } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

export const forgetPasswordController = async (req: any, res: any) => {
  const response = mailSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(500).json({ message: "Invalid input found." });
  }

  const userData = await getUser(req.body.email);
  if (userData) {
    const emailData = [req.body];
    const id: string = uuidv4();
    const { id: userId } = userData;
    const isactive: boolean = true;
    await insertForgetPasswordRecord(id, isactive, userId);
    sendMail(emailData, id);
    res
      .status(200)
      .json({ message: "Verification mail is sent, check you mail id." });
  } else {
    res.status(404).json({ message: "Invalid email address found." });
  }
};

export const resetPasswordController = async (req: any, res: any) => {
  const response = resetPasswordSchema.safeParse(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Password is weak or missing, try again." });
  }
  try {
    const { uuid, password } = req.body;
    const encryptedPassword = await hashPassword(password, 10);
    await resetPassword(uuid, encryptedPassword);
    res
      .status(200)
      .json({ message: "Password has been successfully changed." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
