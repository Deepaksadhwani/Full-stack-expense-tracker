import express from "express";
import {
  accessExpenseController,
  deleteExpenseController,
  insertExpenseController,
  updateExpenseController,
} from "../controllers/expenseController";
import { authenticateToken } from "../utils/securityHelpers";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const expenseRouter = express.Router();

expenseRouter.post(
  "/insertExpense",
  authenticateToken,
  insertExpenseController
);

expenseRouter.get(
  "/accessExpenses",
  authenticateToken,
  accessExpenseController
);

expenseRouter.delete(
  "/deleteExpense/:id",
  authenticateToken,
  deleteExpenseController
);

expenseRouter.put(
  "/updateExpense/:id",
  authenticateToken,
  updateExpenseController
);
