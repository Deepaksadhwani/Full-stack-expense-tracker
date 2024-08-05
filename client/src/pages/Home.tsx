import { useNavigate } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import { useEffect, useState } from "react";
import ExpenseForm from "@/layouts/ExpenseForm";
import { ExpenseChart } from "@/components/ExpenseChart";
import { ExpenseBarChart } from "@/components/ExpenseBarChart";
import ExpenseCard from "@/layouts/ExpenseCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

interface DataType {
  id:number,
  amount: number;
  description: string;
  category: string;
  date: string;
}
const Home = () => {
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
    <div className="h-screen bg-gray-">
      <div>
        <ExpenseForm />
      </div>
      <div className="justify-evenly flex h-[50%] flex-col md:flex-row">
        <ExpenseChart expenseData={expenseData} />
        <ExpenseBarChart  expenseData={expenseData} />
      </div>
      <div className="flex w-full flex-wrap space-x-20 py-2 bg-gray-100 px-10 pb-7">
        {expenseData.map((item:DataType) => <div key={item.id}><ExpenseCard amount={item.amount} description={item.description} date={item.date} category={item.category} /></div> )}
      </div>
    </div>
  );
};

export default Home;
