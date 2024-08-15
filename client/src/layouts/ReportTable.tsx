import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import Shimmer from "@/components/Shimmer";

interface ExpenseListTypes {
  amount: number;
  category: string;
  date: string;
  description: string;
}

const ReportTable = () => {
  const [expenseList, setExpenseList] = useState<ExpenseListTypes[]>([]);
  const [isSort, setIsSort] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetches expenses data with pagination
  const fetchDescExpenseData = async (page: number) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const {
      data: { data, meta },
    } = await axios.get(
      `${SERVER_URL}/user/premium-features/get-report?page=${page}&limit=10`,
      {
        headers: {
          "user-auth-token": `Bearer ${token}`,
        },
      },
    );
    setTotalPages(meta.totalPages);

    if (isSort) {
      setExpenseList(
        data.sort(
          (a: ExpenseListTypes, b: ExpenseListTypes) => b.amount - a.amount,
        ),
      ); // this "-" minus is compare operator in sort function if b.amount - a.amount If b.amount is greater than a.amount, the result will be positive, which means b should come before a.
    } else {
      setExpenseList(data);
    }
    setLoading(false);
  };

  // Toggle amount sorting logic
  const toggleList = () => {
    setIsSort((prev) => !prev);
  };

  useEffect(() => {
    fetchDescExpenseData(currentPage);
  }, [currentPage, isSort]);

  return loading ? (
    <Shimmer />
  ) : (
    <>
      <Table className="mb-4">
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="flex items-center justify-end gap-x-1">
              Amount
              <button onClick={toggleList} className="text-lg text-gray-900">
                <IoFilter />
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseList.length > 0 &&
            expenseList.map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(i + 1)}
                className={
                  i + 1 === currentPage ? "bg-black text-xl text-white" : ""
                }
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ReportTable;
