import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ExpenseData {
  amount: number;
  description: string;
  category: string;
  date: string;
  userId: number;
}

export const insertExpense = async (expense: ExpenseData) => {
  const date = new Date(expense.date);
  const res = await prisma.expense.create({
    data: {
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date: date,
      userId: expense.userId,
    },
  });
  console.log(res);
  return res;
};
