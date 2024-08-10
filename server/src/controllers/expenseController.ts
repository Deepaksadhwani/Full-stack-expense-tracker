import { deleteExpense, fetchUserExpenses, insertExpense, updateExpense } from "../services/expenseService";
import { expenseEntrySchema } from "../utils/types";


//insertExpense
export const insertExpenseController = async (req: any, res: any) => {
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
};
//access expense
export const accessExpenseController = async (req: any, res: any) => {
  const id: any = req.userId;
  const response = await fetchUserExpenses(id);
  res
    .status(200)
    .json({ message: "Expense successfully fetched.", data: response });
};

//delete expense
export const deleteExpenseController = async (req: any, res: any) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId);
  const response = await deleteExpense(id);
  res
    .status(200)
    .json({ message: "Expense is  successfully deleted.", data: response });
};

// update expense
export const updateExpenseController = async (req: any, res: any) => {
  const { id: StringId } = req.params;
  const id = parseInt(StringId);
  const response = await updateExpense(id, req.body);
  res
    .status(200)
    .json({ message: "Expense is successfully updated.", data: response });
};
