import bcrypt from "bcrypt";

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
