import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchDescendingExpense = async (id: number) => {
  const UserExpense = await prisma.expense.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      id: "desc",
    },
    select: {
      amount: true,
      description: true,
      category: true,
      date: true,
    },
  });
  return UserExpense;
};
