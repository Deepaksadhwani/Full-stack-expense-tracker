import { getUser, insertUser } from "../services/userService";
import {
  compareHashPassword,
  generateToken,
  hashPassword,
} from "../utils/securityHelpers";
import { authValidationSchema } from "../utils/types";

export const userSignup = async (req: any, res: any) => {
  let { fullName, password, email } = req.body;
  password = await hashPassword(password, 10);
  try {
    const response = await insertUser(email, password, fullName);
    const { fullName: name, id } = response;
    const token = generateToken(id);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).json({
      message: "you account is successfully created.",
      data: { name, email },
    });
  } catch (error) {
    res.status(500).json("Internal server error.");
  }
};

export const userSignin = async (req: any, res: any) => {
  const parsed = authValidationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(404).json({
      message: "User does not exist.",
    });
  }
  const email = parsed.data.email;
  const plainPassword = parsed.data.password;
  const response = await getUser(email);
  if (response) {
    const hashedPassword = response?.password;
    const isValid = await compareHashPassword(plainPassword, hashedPassword);
    if (isValid) {
      const { id, fullName: name } = response;
      const token = generateToken(id);
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({
        message: "logged in successfully.",
        data: { name, email },
      });
    } else {
      res.status(401).json({ message: "Invalid Password." });
    }
  } else {
    res.status(404).json({
      message: "User does not exist.",
    });
  }
};
