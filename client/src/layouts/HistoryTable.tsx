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
import { Link } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import Shimmer from "@/components/Shimmer";

const HistoryTable = () => {
  interface ExpenseRecordListTypes {
    url: string;
    updateAt: string;
  }

  const [expenseRecordList, setExpenseRecordList] = useState<ExpenseRecordListTypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false)

  const fetchExpenseRecords = async (page: number) => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const {
      data: { data, meta },
    } = await axios.get(
      `${SERVER_URL}/user/premium-features/expense-history?page=${page}&limit=10`,
      {
        headers: {
          "user-auth-token": `Bearer ${token}`,
        },
      }
    );
  
    setExpenseRecordList(data);
    setTotalPages(meta.totalPages);
    setLoading(false)
  };

  useEffect(() => {
    fetchExpenseRecords(currentPage);
  }, [currentPage]);

  return loading ? <Shimmer/> : ( 
    <>
      <Table className="w-full mb-4 table-auto">
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
                <TableCell className="font-medium">
                  {(currentPage - 1) * 10 + index + 1}
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
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
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

export default HistoryTable;
