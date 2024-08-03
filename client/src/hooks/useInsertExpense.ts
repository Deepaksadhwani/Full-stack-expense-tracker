import { SERVER_URL } from "@/utils/constants";
import axios from "axios";

interface DataType {
  amount: number;
  description: string;
  category: string;
  date: string;
  userId: number;
}
const useInsertExpense = (
  expenseData: DataType,
  setLoading: (isLoading: boolean) => void,
) => {
  const insertExpense = async () => {
    setLoading(true);
    const response = await axios.post(
      `${SERVER_URL}/user/expense/insertExpense`,
      expenseData,
    );
    setLoading(false);
  };

  insertExpense();
};

export default useInsertExpense;
