import express from "express";
import { expenseEntrySchema } from "../utils/types";
import { insertExpense } from "../controllers/expenseController";

export const expenseRouter = express.Router();

expenseRouter.post("/insertExpense", async (req, res) => {
  const parsed = expenseEntrySchema.safeParse(req.body);
  if (parsed.success) {
    console.log(parsed);
    const response = await insertExpense(parsed.data);
    res
      .status(201)
      .json({
        message: "Expense entry is successfully added.",
        data: response,
      });
  } else {
    res.status(400).json({ message: "Failed to add expense entry." });
  }
});
