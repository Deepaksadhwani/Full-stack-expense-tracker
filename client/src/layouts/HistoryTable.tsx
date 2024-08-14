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
  const rowsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(expenseRecordList.length / rowsPerPage);



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
    <>
      <Table className="w-full  mb-4 table-auto">
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
            expenseRecordList
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    <span className="block truncate" title={record.url}>
                      {record.url}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="w-1/4 break-words text-2xl transition-all duration-300 hover:text-lime-700"
                      to={record.url}
                    >
                      <FaFileDownload />
                    </Link>
                  </TableCell>
                  <TableCell className="w-1/4 text-right">
                    {record.updateAt
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
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
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
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
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default HistoryTable;
