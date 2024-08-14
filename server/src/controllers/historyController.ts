import { getExpenseDownloadRecord } from "../services/historyService";

export const getExpenseRecordController = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const response = await getExpenseDownloadRecord(userId);
    res
      .status(200)
      .json({
        message: " fetched expense record successfully",
        data: response,
      });
  } catch (error) {
    res.status(500).json({ Message: "internal server error." });
  }
};
