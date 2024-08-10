import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";

interface expenseListTypes {
  amount: number;
  category: string;
  date: string;
  description: string;
}

const ReportTable = () => {
  const [expenseList, setExpenseList] = useState<expenseListTypes[]>([]);
  const [isSort, setIsSort] = useState<boolean>(false)

  const fetchDescExpenseData = async () => {
    const token = localStorage.getItem("token");
    const {
      data: { data },
    } = await axios.get(`${SERVER_URL}/user/purchase//get-leaderboard`, {
      headers: {
        "user-auth-token": `Bearer ${token}`,
      },
    });
    console.log(data);
    setExpenseList(data);
  };

  const toggleList = () => {
    setIsSort(prev => !prev)
  }
  const filterExpenseHandler = () => {
    if (isSort) {
        return [...expenseList].sort((a, b) => b.amount - a.amount); // this "-" minus is compare operator in sort function if b.amount - a.amount If b.amount is greater than a.amount, the result will be positive, which means b should come before a.
    }else{
        return expenseList
    }
  };

  useEffect(() => {
    
    fetchDescExpenseData();
  }, []);

  const sortedList = filterExpenseHandler();
  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="flex items-center justify-end gap-x-1">
            Amount
            <button
              onClick={toggleList}
              className="text-lg text-gray-900"
            >
              <IoFilter />
            </button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          sortedList.map((expense, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium md:w-1/6">
                {expense.date.slice(0, 10).split("-").reverse().join("-")}
              </TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="text-right">₹{expense.amount}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ReportTable;
