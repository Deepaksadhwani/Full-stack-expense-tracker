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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const id = req.userId;

  try {
    const { UserExpense, totalExpenses } = await fetchDescendingExpense(
      id,
      skip,
      limit
    );
    const totalPages = Math.ceil(totalExpenses / limit);

    res.status(200).json({
      message: "Premium expense Data is successfully received.",
      data: UserExpense,
      meta: {
        totalPages,
        totalExpenses,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

/*--------------------get leaderboard------------------- */
export const fetchLeaderboardExpenseController = async (req: any, res: any) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const { leaderboardExpense, totalLeaderboardExpense } =
      await fetchLeaderboardExpense(skip, limit);
    const totalPages = Math.ceil(totalLeaderboardExpense / limit);
    res.status(200).json({
      message: "Leaderboard expenses fetched successfully",
      data: leaderboardExpense,
      meta: {
        totalPages,
        totalLeaderboardExpense,
      },
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
