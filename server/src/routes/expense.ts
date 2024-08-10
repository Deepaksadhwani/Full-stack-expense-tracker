import express from "express";
import { expenseEntrySchema } from "../utils/types";
import {
  deleteExpense,
  fetchUserExpenses,
  insertExpense,
  updateExpense,
} from "../controllers/expenseController";
import { authenticateToken,  } from "../utils/securityHelpers";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const expenseRouter = express.Router();

expenseRouter.post("/insertExpense", authenticateToken, async (req, res) => {
  const parsed = expenseEntrySchema.safeParse(req.body);
  if (parsed.success) {
    const obj = { ...parsed.data, userId: req.userId };
    await insertExpense(obj);
    res.status(201).json({
      message: "Expense entry is successfully added.",
      data: parsed.data,
    });
  } else {
    res.status(400).json({ message: "Failed to add expense entry." });
  }
});

expenseRouter.get("/accessExpenses", authenticateToken, async (req, res) => {
  const id: any = req.userId;
  const response = await fetchUserExpenses(id);
  res
    .status(200)
    .json({ message: "Expense successfully fetched.", data: response });
});

expenseRouter.delete(
  "/deleteExpense/:id",
  authenticateToken,
  async (req, res) => {
    const { id: stringId } = req.params;
    const id = parseInt(stringId);
    const response = await deleteExpense(id);
    res
      .status(200)
      .json({ message: "Expense is  successfully deleted.", data: response });
  }
);

expenseRouter.put("/updateExpense/:id", authenticateToken, async (req, res) => {
  const { id: StringId } = req.params;
  const id = parseInt(StringId);
  const response = await updateExpense(id, req.body);
  res
    .status(200)
    .json({ message: "Expense is successfully updated.", data: response });
});
