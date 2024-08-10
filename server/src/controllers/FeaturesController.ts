import { fetchDescendingExpense } from "../services/featuresService";

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
