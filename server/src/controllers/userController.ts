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
  console.log(res);
  return res;
}

export const getUser = async (email: string) => {
  const res = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return res;
};
