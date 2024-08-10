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

export const getLeaderboard = async (req: any, res: any) => {
  const id = req.userId;
  try {
    const data = await fetchDescendingExpense(id);
    res.status(200).json({
      message: "Premium expense Data is successfully received.",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
