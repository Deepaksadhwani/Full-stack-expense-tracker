import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/// insert user
async function insertUser(
  username: string,
  password: string,
  fullName: string
) {
  const res = await prisma.user.create({
    data: {
      email: username,
      password,
      fullName,
    },
  
  });
  console.log(res);
}

