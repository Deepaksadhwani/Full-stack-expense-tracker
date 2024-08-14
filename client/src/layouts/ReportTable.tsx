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
import { IoFilter } from "react-icons/io5";

interface expenseListTypes {
  amount: number;
  category: string;
  date: string;
  description: string;
}

const ReportTable = () => {
  const [expenseList, setExpenseList] = useState<expenseListTypes[]>([]);
  const [isSort, setIsSort] = useState<boolean>(false);
  const rowsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(expenseList.length / rowsPerPage);
  const fetchDescExpenseData = async () => {
    const token = localStorage.getItem("token");
    const {
      data: { data },
    } = await axios.get(`${SERVER_URL}/user/premium-features/get-report`, {
      headers: {
        "user-auth-token": `Bearer ${token}`,
      },
    });
    console.log(data);
    setExpenseList(data);
  };

  const toggleList = () => {
    setIsSort((prev) => !prev);
  };
  const filterExpenseHandler = () => {
    if (isSort) {
      return [...expenseList].sort((a, b) => b.amount - a.amount); // this "-" minus is compare operator in sort function if b.amount - a.amount If b.amount is greater than a.amount, the result will be positive, which means b should come before a.
    } else {
      return expenseList;
    }
  };

  /*---------------pagination logic-----------------*/
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
            className={i === currentPage ? "bg-black text-xl text-white" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pages;
  };

  useEffect(() => {
    fetchDescExpenseData();
  }, []);

  const sortedList = filterExpenseHandler();
  return (
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
          {sortedList.length > 0 &&
            sortedList
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium md:w-1/6">
                    {expense.date.slice(0, 10).split("-").reverse().join("-")}
                  </TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="text-right">
                    ₹{expense.amount}
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

export default ReportTable;
