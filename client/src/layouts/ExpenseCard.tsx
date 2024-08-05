import { AppDispatch } from "@/store/appStore";
import { deleteExpense, updateExpense } from "@/store/slices/expenseSlice";
import { SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { FC, useRef } from "react";
import { useDispatch } from "react-redux";

interface DataType {
  amount: number;
  description: string;
  category: string;
  date: string;
  id: number;
}

const ExpenseCard: FC<DataType> = ({
  id,
  amount,
  date,
  category,
  description,
}) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const editFormRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const deleteExpenseEntry = async () => {
    dispatch(deleteExpense(id));
  };

  const editExpenseDataHandler = async () => {
    if (
      !amountRef.current ||
      !descriptionRef.current ||
      !categoryRef.current ||
      !dateRef.current
    ) {
      console.error("Form references are missing");
      return;
    }

    const amountValue: number = parseFloat(amountRef.current.value);
    const dateValue: string = new Date(dateRef.current.value).toISOString();
    const expenseData = {
      amount: amountValue,
      description: descriptionRef.current.value,
      date: dateValue,
      category: categoryRef.current.value,
    };

    try {
      dispatch(updateExpense({ expenseData, id }));
      if (editFormRef.current) {
        editFormRef.current.style.display = "none";
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editExpenseDataHandler();
  };

  return (
    <div className="mx-auto my-2 flex w-[300px] flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105">
      <form
        ref={editFormRef}
        onSubmit={handleSubmit}
        style={{ display: "none" }}
        className="px-6 py-4"
      >
        <input
          ref={categoryRef}
          type="text"
          className="mb-2 w-full rounded-lg border px-3 py-2"
          defaultValue={category}
          placeholder="Category"
        />
        <input
          ref={descriptionRef}
          type="text"
          className="mb-2 w-full rounded-lg border px-3 py-2"
          defaultValue={description}
          placeholder="Description"
        />
        <input
          ref={dateRef}
          type="date"
          className="mb-2 w-full rounded-lg border px-3 py-2"
          defaultValue={new Date(date).toISOString().slice(0, 10)} // Format date correctly for input
          placeholder="Date"
        />
        <input
          ref={amountRef}
          type="number"
          className="mb-2 w-full rounded-lg border px-3 py-2"
          defaultValue={amount}
          placeholder="Amount"
        />
        <button
          type="submit"
          className="mr-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            if (editFormRef.current) {
              editFormRef.current.style.display = "none";
            }
          }}
          className="rounded-lg bg-gray-500 px-4 py-2 font-semibold text-white hover:bg-gray-600"
        >
          Cancel
        </button>
      </form>
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-indigo-500">{category}</div>
        <p className="text-lg text-gray-700">{description}</p>
      </div>
      <div className="flex items-center justify-between bg-gray-100 px-6 py-4">
        <div>
          <p className="text-gray-600">Date</p>
          <p className="font-semibold text-gray-800">{date.slice(0, 10)}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Amount</p>
          <p className="text-2xl font-bold text-indigo-600">${amount}</p>
        </div>
      </div>
      <div className="flex justify-start bg-gray-50 px-6 py-4">
        <button
          onClick={() => {
            if (editFormRef.current) {
              editFormRef.current.style.display = "block";
            }
          }}
          className="mr-2 rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-600"
        >
          Edit
        </button>
        <button
          onClick={deleteExpenseEntry}
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
