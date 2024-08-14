import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertExpenseDownloadRecord = async (
  userId: number,
  url: string
) => {
  const res = await prisma.downloadHistory.create({
    data: {
      userId,
      url,
    },
  });
  console.log(res);
  return res;
};

export const getExpenseDownloadRecord = async (userId: number) => {
  const res = await prisma.downloadHistory.findMany({
    where: {
      userId,
    },
    select: {
      url: true,
      updateAt: true,
    },
  });
  return res;
};
