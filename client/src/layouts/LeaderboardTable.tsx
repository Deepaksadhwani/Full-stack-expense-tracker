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
  fullName: string;
  totalExpense: number;
}

const LeaderboardTable = () => {
  const [expenseList, setExpenseList] = useState<expenseListTypes[]>([]);

  useEffect(() => {
    const fetchLeaderBoardExpense = async () => {
      const token = localStorage.getItem("token");
      const {
        data: { data },
      } = await axios.get(`${SERVER_URL}/user/get-leaderboard`, {
        headers: {
          "user-auth-token": `Bearer ${token}`,
        },
      });
      const filterData = data.sort(
        (a: expenseListTypes, b: expenseListTypes) =>
          b.totalExpense - a.totalExpense,
      );
      setExpenseList(filterData);
    };
    fetchLeaderBoardExpense();
  }, []);

  return (
    <Table >
      <TableCaption>Leaderboard: Top Spenders</TableCaption>
      <TableHeader>
        <TableRow >
          <TableHead className="w-[100px]">No.</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead className="w-2/6 text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenseList &&
          expenseList.map((expense, index) => (
            <TableRow key={index }>
              <TableCell className="font-medium">{index +1}</TableCell>
              <TableCell>{expense.fullName}</TableCell>
              <TableCell className="w-2/6 text-right">
                ₹{expense.totalExpense}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
