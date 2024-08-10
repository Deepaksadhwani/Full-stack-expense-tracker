import { PrismaClient } from "@prisma/client";
import { expenseEntrySchema } from "../utils/types";

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
    select: {
      id: true,
      amount: true,
      description: true,
      category: true,
      date: true,
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
    },
  });
  return res;
};

export const deleteExpense = async (id: number) => {
  const res = await prisma.expense.delete({
    where: {
      id,
    },
    select: {
      id: true,
      amount: true,
      description: true,
      category: true,
      date: true,
    },
  });
  return res;
};

interface DataType {
  amount: number;
  description: string;
  date: string;
  category: string;
}

export const updateExpense = async (id: number, Data: DataType) => {
  const res = await prisma.expense.update({
    where: {
      id,
    },
    data: {
      amount: Data.amount,
      description: Data.description,
      category: Data.category,
      date: Data.date,
    },
    select: {
      id: true,
      amount: true,
      description: true,
      category: true,
      date: true,
    },
  });
  return res;
};
