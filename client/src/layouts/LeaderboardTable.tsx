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

interface ExpenseListTypes {
  fullName: string;
  totalExpense: number;
}

const LeaderboardTable = () => {
  const [expenseList, setExpenseList] = useState<ExpenseListTypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeaderBoardExpense = async (page: number) => {
    const token = localStorage.getItem("token");
    const {
      data: { data, meta },
    } = await axios.get(
      `${SERVER_URL}/user/premium-features/get-leaderboard?page=${page}&limit=10`,
      {
        headers: {
          "user-auth-token": `Bearer ${token}`,
        }
      }
    );
    setExpenseList(data);
    setTotalPages(meta.totalPages);  // Backend returns total pages
  };

  useEffect(() => {
    fetchLeaderBoardExpense(currentPage);
  }, [currentPage]);

  return (
    <>
      <Table className="mb-4">
        <TableCaption>Leaderboard: Top Spenders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead className="w-2/6 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseList.length > 0 &&
            expenseList.map((expense, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1 + (currentPage - 1) * 10}</TableCell>
                <TableCell>{expense.fullName}</TableCell>
                <TableCell className="w-2/6 text-right">
                  ₹{expense.totalExpense}
                </TableCell>
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
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(i + 1)}
                className={i + 1 === currentPage ? "bg-black text-xl text-white" : ""}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default LeaderboardTable;
