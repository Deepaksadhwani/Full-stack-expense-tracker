import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["user-auth-token"];
  console.log("authheader", authHeader);

  if (!authHeader)
    return res.status(401).json({ message: "No token provided." });

  const token = authHeader.split(" ")[1];
  const userData = verifyToken(token);
  if (!userData) return res.status(401).json({ message: "Invalid token." });

  next();
}
