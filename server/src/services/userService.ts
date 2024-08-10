import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/// insert user
export async function insertUser(
  email: string,
  password: string,
  fullName: string
) {
  const res = await prisma.user.create({
    data: {
      email,
      fullName,
      password,
    },
  });
  return res;
}
// finding user with validation
export const getUser = async (email: string) => {
  const res = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return res;
};
