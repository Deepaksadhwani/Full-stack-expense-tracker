import { z } from "zod";

export const authValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const expenseEntrySchema = z.object({
  amount: z.number(),
  description: z.string(),
  category: z.string(),
  date: z.string(),
});

export const mailSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  uuid: z.string(),
  password: z.string(),
});
