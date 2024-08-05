import { useNavigate } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import { useEffect, useState } from "react";
import ExpenseForm from "@/layouts/ExpenseForm";
import { ExpenseChart } from "@/components/ExpenseChart";
import { ExpenseBarChart } from "@/components/ExpenseBarChart";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="h-screen">
      <div>
        <ExpenseForm />
      
      </div>
      <div className="flex h-[50%]   flex-col justify-evenly  md:flex-row">
          <ExpenseChart />
          <ExpenseBarChart />
        </div>
    </div>
  );
};

export default Home;
