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

  const expenseData = useSelector((state: RootState) => state.expense.data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div>
        <ExpenseForm />
      </div>
      {expenseData && (
        <div className="flex h-[50%] flex-col justify-evenly md:flex-row">
          <ExpensePieChart expenseData={expenseData} />
          <ExpenseBarChart expenseData={expenseData} />
        </div>
      )}
      <div className="flex w-full flex-wrap justify-center space-x-10 sm:flex-row">
        {expenseData &&
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
