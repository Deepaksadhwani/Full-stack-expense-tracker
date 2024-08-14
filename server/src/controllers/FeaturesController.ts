import { uploadToS3 } from "../services/awsService";
import { fetchUserExpenses } from "../services/expenseService";
import {
  fetchDescendingExpense,
  fetchLeaderboardExpense,
} from "../services/featuresService";
import dotenv from "dotenv";
import { insertExpenseDownloadRecord } from "../services/historyService";
dotenv.config();

export const getReport = async (req: any, res: any) => {
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

/*--------------------get leaderboard------------------- */
export const fetchLeaderboardExpenseController = async (req: any, res: any) => {
  try {
    const data = await fetchLeaderboardExpense();
    res.status(200).json({
      message: "Leaderboard expenses fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const downloadExpenseController = async (req: any, res: any) => {
  try {
    const id: any = req.userId;
    const expenses = await fetchUserExpenses(id);
    const stringifiedExpenses = JSON.stringify(expenses);
    const fileName = `expense${id}/${new Date()}.txt`;
    const fileURL: any = await uploadToS3(stringifiedExpenses, fileName);
    await insertExpenseDownloadRecord(id, fileURL);
    res.status(200).json({ fileURL, success: true });
  } catch (error) {
    res.status(500).json({ fileUrL: "", success: false, error });
  }
};
