import express from "express";
import { expenseEntrySchema } from "../utils/types";
import {
  deleteExpense,
  fetchUserExpenses,
  insertExpense,
  updateExpense,
} from "../controllers/expenseController";
import { verifyToken } from "../utils/securityHelpers";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const expenseRouter = express.Router();

expenseRouter.post("/insertExpense", async (req, res) => {
  const parsed = expenseEntrySchema.safeParse(req.body);
  if (parsed.success) {
    const token: any = verifyToken(parsed.data.userId);
    parsed.data.userId = token.id;
    const response = await insertExpense(parsed.data);
    res.status(201).json({
      message: "Expense entry is successfully added.",
      data: response,
    });
  } else {
    res.status(400).json({ message: "Failed to add expense entry." });
  }
});

expenseRouter.get("/accessExpenses", async (req, res) => {
  const authtoken: any = req.headers["user-auth-token"]; // always access header information in lowercase even client send uppercase
  const token: string = authtoken.split(" ")[1];
  if (token) {
    const userData = verifyToken(token);

    const { id }: any = userData;

    const response = await fetchUserExpenses(id);
    res
      .status(200)
      .json({ message: "Expense successfully fetched.", data: response });
  } else {
    res.status(404).json({ message: "Invalid authorization." });
    res.send("failed");
  }
});

expenseRouter.delete("/deleteExpense/:id", async (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId);
  const response = await deleteExpense(id);
  console.log(response);
  res
    .status(200)
    .json({ message: "Expense is  successfully deleted.", data: response });
});

expenseRouter.put("/updateExpense/:id", async (req, res) => {
  const { id: StringId } = req.params;
  const id = parseInt(StringId);
  const response = await updateExpense(id, req.body);
  console.log(response);
  res
    .status(200)
    .json({ message: "Expense is successfully updated.", data: response });
});
