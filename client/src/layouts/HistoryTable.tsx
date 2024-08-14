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
import { Link } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";

const HistoryTable = () => {
  interface ExpenseRecordListTypes {
    url: string;
    updateAt: string;
  }
  const [expenseRecordList, setExpenseRecordList] = useState<
    ExpenseRecordListTypes[]
  >([]);
  useEffect(() => {
    const getExpenseRecordList = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${SERVER_URL}/user/premium-features/expense-history`,
        {
          headers: {
            "user-auth-token": `Bearer ${token}`,
          },
        }
      );
      setExpenseRecordList(response.data.data);
    };
    getExpenseRecordList();
  }, []);

  return (
    <Table className="table-auto w-full">
      <TableCaption>Downloaded Expense File Archive</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Url</TableHead>
          <TableHead>Download</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenseRecordList.length > 0 &&
          expenseRecordList.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="truncate max-w-xs">
                <span
                  className="block truncate"
                  title={record.url}
                >
                  {record.url}
                </span>
              </TableCell>
              <TableCell>
                <Link
                  className="text-2xl w-1/4 break-words transition-all duration-300 hover:text-lime-700"
                  to={record.url}
                >
                  <FaFileDownload />
                </Link>
              </TableCell>
              <TableCell className="w-1/4 text-right">
                {record.updateAt.slice(0, 10).split("-").reverse().join("-")}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
