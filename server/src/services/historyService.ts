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

export const getExpenseDownloadRecord = async (
  userId: number,
  skip?: number,
  limit?: number
) => {
  const downloadRecord = await prisma.downloadHistory.findMany({
    skip: skip ?? undefined,
    take: limit ?? undefined,
    where: {
      userId,
    },
    select: {
      url: true,
      updateAt: true,
    },
  });
  const totalDownloadRecord = await prisma.downloadHistory.count({
    where: {
      userId
    }
  })
  return {downloadRecord,totalDownloadRecord};
};
