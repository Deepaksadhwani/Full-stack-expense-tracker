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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

interface expenseListTypes {
  fullName: string;
  totalExpense: number;
}

const LeaderboardTable = () => {
  const [expenseList, setExpenseList] = useState<expenseListTypes[]>([]);
  const rowsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(expenseList.length / rowsPerPage);


  /*pagination logic */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? "text-white  text-xl bg-black" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };


  useEffect(() => {
    const fetchLeaderBoardExpense = async () => {
      const token = localStorage.getItem("token");
      const {
        data: { data },
      } = await axios.get(
        `${SERVER_URL}/user/premium-features/get-leaderboard`,
        {
          headers: {
            "user-auth-token": `Bearer ${token}`,
          },
        },
      );
      const filterData = data.sort(
        (a: expenseListTypes, b: expenseListTypes) =>
          b.totalExpense - a.totalExpense,
      );
      setExpenseList(filterData);
    };
    fetchLeaderBoardExpense();
  }, []);

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
        {expenseList.length > 0  &&
          expenseList.map((expense, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
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
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
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

export default LeaderboardTable;
