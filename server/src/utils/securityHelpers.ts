import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { number } from "zod";
dotenv.config({ path: ".env" });
export async function hashPassword(password: string, saltRound: number) {
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
}

export const compareHashPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

const secretKey: string = process.env.SECRET_KEY || "";

export const generateToken = (id: number) => {
  return jwt.sign({ id }, secretKey);
};

export const verifyToken = (id: number) => {
  try {
    return jwt.sign({ id }, secretKey);
  } catch (error) {
    return null;
  }
};
