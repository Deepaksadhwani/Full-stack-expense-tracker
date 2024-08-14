import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavLogo from "/src/assets/navlogo.jpeg";
import Shimmer from "../components/Shimmer";
import { useDispatch } from "react-redux";
import { removeToken, removeUserData } from "@/store/slices/userSlice";
import DropDownMenu from "@/components/DropDownMenu";
import { AppDispatch } from "@/store/appStore";
import { removeExpense } from "@/store/slices/expenseSlice";
import { fetchExpenseData } from "@/store/slices/expenseSlice";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";
import toast from "react-hot-toast";
import usePremiumVerification from "@/hook/usePremiumVerification";
import { FaHistory } from "react-icons/fa";

const Navbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("Profile");
  const [togglePremiumButtom, setTogglePremiumButtom] =
    useState<boolean>(false);
  const token = localStorage.getItem("token");
  const activeClass = "text-yellow-400";
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const config = {
    headers: {
      "user-auth-token": `Bearer ${token}`,
    },
  };

  //custom hook
  usePremiumVerification({ SERVER_URL, config, setTogglePremiumButtom });

  const logoutHandler = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      localStorage.clear();
      dispatch(removeUserData());
      dispatch(removeToken());
      dispatch(removeExpense());
      navigate("/");
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  const checkoutHandler = async () => {
    const {
      data: { orderId, amount, key_id },
    } = await axios.get(
      `${SERVER_URL}/user/purchase/premiummembership`,
      config,
    );
    const options = {
      key: key_id,
      amount: amount,
      currency: "INR",
      name: "Delight Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      handler: async (response: any) => {
        await axios.post(
          `${SERVER_URL}/user/purchase/update-transaction`,
          {
            status: "SUCCESSFUL",
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          },
          config,
        );
        toast.success("you have premium membership now.");
        setTogglePremiumButtom(true);
      },
      prefill: {
        name: "Deepak sadhwani",
        email: "DeepakSadhwani@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };

    const Razorpay = (window as any).Razorpay;
    const razor = new Razorpay(options);
    razor.open();

    // const razor = new window.Razorpay(options);
    // razor.open();
  };

  const handleDownloadExpenseFile = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/user/premium-features/download`,
        config,
      );
      console.log(data.fileURL);
      const a = document.createElement("a");
      a.href = data.fileURL;
      a.download = "myexpenses.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log("Something went wrong", error);
    }

    // const expenseDataArray = Object.values(expenseData);
    // const csvContent = [
    //   ["Description", "Amount", "Category", "Date"].join(","),
    //   ...expenseDataArray.map((item) =>
    //     [item.description, item.amount, item.category, item.date].join(","),
    //   ),
    // ].join("\n");
    // const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.setAttribute("href", url);
    // link.setAttribute("download", "expense_data.csv");
    // link.style.visibility = "hidden";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  useEffect(() => {
    dispatch(fetchExpenseData());
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      setDisplayName(userData.name);
    }
  }, []);
  return loading ? (
    <Shimmer />
  ) : (
    <div className="relative flex items-center justify-between bg-[#00215E] px-4 py-2 sm:px-10">
      <div className="flex items-center space-x-4">
        <img
          onClick={()=> navigate("/")}
          src={NavLogo}
          alt=""
          className="w-20 cursor-pointer rounded-full shadow-md shadow-cyan-200 transition-all duration-100"
        />
        {!togglePremiumButtom ? (
          <h1 className="hidden text-4xl font-semibold italic tracking-tight text-yellow-500 transition-all duration-1000 md:block">
            Expense Tracker
          </h1>
        ) : (
          <h1 className="flex items-center space-x-2 text-4xl font-semibold italic tracking-tight text-yellow-500 transition-all duration-1000">
            <h1>Expense</h1>
            <button
              className="hidden rounded-lg bg-blue-500 p-2 px-3 text-3xl font-bold italic tracking-tight text-white transition-all duration-300 hover:bg-blue-700 sm:block"
              onClick={handleDownloadExpenseFile}
            >
              Download
            </button>
            <button
              onClick={()=> navigate("/download-history")}
              className="hidden rounded-lg bg-lime-600 p-2 px-3 text-3xl font-bold italic tracking-tight text-white transition-all duration-300 hover:bg-blue-700 sm:block"
            >
              <FaHistory/>
            </button>
          </h1>
        )}
      </div>

      <div className="flex items-center space-x-3 text-xl font-semibold text-white">
        {togglePremiumButtom && (
          <div className="space-x-3">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : undefined)}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) => (isActive ? activeClass : undefined)}
              onClick={() => setIsOpen(false)}
            >
              Leaderboard
            </NavLink>
            <NavLink
              to="/report"
              className={({ isActive }) => (isActive ? activeClass : undefined)}
              onClick={() => setIsOpen(false)}
            >
              Report
            </NavLink>
          </div>
        )}

        {!togglePremiumButtom && (
          <button
            onClick={checkoutHandler}
            className="rounded bg-cyan-600 p-2 font-semibold transition-all duration-300 hover:bg-lime-600"
          >
            Buy Premium
          </button>
        )}
       
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="group/testing hidden cursor-pointer select-none items-center space-x-3 rounded-md border-2 border-black bg-yellow-300 px-3 py-3 font-semibold text-[#00215E] transition-all duration-200 hover:scale-[1.04] sm:flex"
        >
          <p className="">{displayName}</p>
          <span className="duration-700 group-hover/testing:rotate-180">⮟</span>
        </div>
        <div>
          <img
            onClick={() => setToggleHamburger((prev) => !prev)}
            className="block w-16 rounded-lg bg-yellow-300 p-1 transition-all duration-300 hover:scale-110 sm:hidden"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
            alt="humburger icon"
          />
        </div>
        {toggleHamburger && (
          <div className="z-100 absolute top-20 flex cursor-pointer items-center justify-center rounded-lg border-2 border-black bg-gradient-to-bl from-gray-200 via-gray-300 to-gray-200 py-2 text-gray-700 shadow-md sm:hidden">
            <ul>
              <li
                onClick={handleDownloadExpenseFile}
                className="min-w-60 border-b-2 border-gray-700"
              >
                Download Expense file
              </li>
              <li onClick={logoutHandler} className="">
                Logout
              </li>
            </ul>
          </div>
        )}
        {isOpen && <DropDownMenu onLogOutHandler={logoutHandler} />}
      </div>
    </div>
  );
};

export default Navbar;
