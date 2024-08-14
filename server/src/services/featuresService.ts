import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchDescendingExpense = async (
  id: number,
  skip?: number,
  limit?: number
) => {
  const UserExpense = await prisma.expense.findMany({
    skip: skip ?? undefined,
    take: limit ?? undefined,
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

  const totalExpenses = await prisma.expense.count({
    where: {
      userId: id,
    },
  });

  return { UserExpense, totalExpenses };
};

/*--------------- get leaderboard----------------- */
export const fetchLeaderboardExpense = async (
  skip?: number,
  limit?: number
) => {
  const leaderboardExpense = await prisma.user.findMany({
    skip: skip ?? undefined,
    take: limit ?? undefined,
    select: {
      fullName: true,
      totalExpense: true,
    },
  });
  const totalLeaderboardExpense = await prisma.user.count();
  return { leaderboardExpense, totalLeaderboardExpense };
};
