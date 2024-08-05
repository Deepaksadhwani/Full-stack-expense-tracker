import { useNavigate } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import { useEffect, useState } from "react";
import ExpenseForm from "@/layouts/ExpenseForm";
import { ExpenseChart } from "@/components/ExpenseChart";
import { ExpenseBarChart } from "@/components/ExpenseBarChart";
import ExpenseCard from "@/layouts/ExpenseCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/appStore";
import { fetchExpenseData } from "@/store/slices/expenseSlice";

interface DataType {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}
const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const expenseData = useSelector((state: RootState) => state.expense.data);
  const moveToUserPageHandler = () => {
    navigate("/ProfilePage");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <Shimmer />
  ) : (
    <div className="bg-gray- h-screen">
      <div>
        <ExpenseForm />
      </div>
      {Array.isArray(expenseData) && (
        <div className="flex h-[50%] flex-col justify-evenly md:flex-row">
          <ExpenseChart expenseData={expenseData} />
          <ExpenseBarChart expenseData={expenseData} />
        </div>
      )}
      <div className="flex w-full flex-wrap justify-center space-x-10 bg-gray-100 sm:flex-row">
        {Array.isArray(expenseData) &&
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
