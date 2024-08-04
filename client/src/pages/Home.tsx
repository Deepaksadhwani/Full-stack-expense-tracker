import { useNavigate } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import { useEffect, useState } from "react";
import ExpenseForm from "@/layouts/ExpenseForm";
import { useDispatch } from "react-redux";
import { fetchExpenseData } from "@/store/slices/expenseSlice";
import { AppDispatch } from "@/store/appStore";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const moveToUserPageHandler = () => {
    navigate("/ProfilePage");
  };

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500);
    dispatch(fetchExpenseData());
  }, []);
  return loading ? (
    <Shimmer />
  ) : (
    <div className="h-screen">
      <div>
        <ExpenseForm />
      </div>
      <div className="flex w-full flex-wrap px-10 pb-7">
        {/* {expenseData &&
          Object.keys(expenseData).map((key) => (
            <Card
              onSetExpenseData={setExpenseData}
              key={key}
              id={key}
              amount={expenseData[key].amount}
              date={expenseData[key].date}
              category={expenseData[key].category}
              description={expenseData[key].description}
            />
          ))} */}
      </div>
    </div>
  );
};

export default Home;
