import { getExpenseDownloadRecord } from "../services/historyService";

export const getExpenseRecordController = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userId = req.userId;
    const { downloadRecord, totalDownloadRecord } =
      await getExpenseDownloadRecord(userId, skip, limit);
    const totalPages = Math.ceil(totalDownloadRecord / limit);
    res.status(200).json({
      message: " fetched expense record successfully",
      data: downloadRecord,
      meta: {
        totalPages,
        totalDownloadRecord,
      },
    });
  } catch (error) {
    res.status(500).json({ Message: "internal server error." });
  }
};
