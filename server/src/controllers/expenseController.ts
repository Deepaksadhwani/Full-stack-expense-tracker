import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ExpenseData {
  amount: number;
  description: string;
  category: string;
  date: string;
  userId: any;
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
  return res;
};

export const fetchUserExpenses = async (id: number) => {
  const res = await prisma.expense.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      amount: true,
      description: true,
      category: true,
      date: true,
    }
    
  });
  return res;
};
