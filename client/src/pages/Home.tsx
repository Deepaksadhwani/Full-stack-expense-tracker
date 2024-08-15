import Shimmer from "../components/Shimmer";
import { useEffect, useState } from "react";
import ExpenseForm from "@/layouts/ExpenseForm";
import { ExpensePieChart } from "@/components/ExpensePieChart";
import { ExpenseBarChart } from "@/components/ExpenseBarChart";
import ExpenseCard from "@/layouts/ExpenseCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

interface DataType {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [toggleFrom, setToggleForm] = useState<boolean>(false);
  const expenseData = useSelector((state: RootState) => state.expense.data);
  const formButton: string =
    "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  text-md rounded-lg  px-5 py-2.5 text-center me-2 mb-2  font-semibold";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-6 flex justify-center">
        {toggleFrom ? (
          <div>
            <div className="flex flex-col items-center rounded-lg bg-white p-4">
              <button
                onClick={() => setToggleForm(false)}
                className={formButton}
              >
                <span className="">Close Form</span>
              </button>
              <ExpenseForm />
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <button onClick={() => setToggleForm(true)} className={formButton}>
              <span className="mr-2">Enter Expense</span>
            </button>
          </div>
        )}
      </div>
      {expenseData && expenseData.length > 0 && (
        <div className="flex h-[50%] flex-col justify-evenly md:flex-row">
          <ExpensePieChart expenseData={expenseData} />
          <ExpenseBarChart expenseData={expenseData} />
        </div>
      )}
      <div className="flex w-full flex-wrap justify-center space-x-10 sm:flex-row">
        {expenseData &&
          expenseData.length > 0 &&
          expenseData.map((item: DataType) => (
            <div className="" key={item.id}>
              <ExpenseCard
                id={item.id}
                amount={item.amount}
                description={item.description}
                date={item.date}
                category={item.category}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
