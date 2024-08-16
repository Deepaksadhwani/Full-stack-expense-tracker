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
import { MdLeaderboard } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineWorkspacePremium } from "react-icons/md";


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

  // Custom hook for premium verification
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
    try {
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
          toast.success("You have premium membership now.");
          setTogglePremiumButtom(true);
        },
        prefill: {
          name: "Deepak Sadhwani",
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
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleDownloadExpenseFile = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/user/premium-features/download`,
        config,
      );
      const a = document.createElement("a");
      a.href = data.fileURL;
      a.download = "myexpenses.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading expense file:", error);
    }
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
          onClick={() => navigate("/")}
          src={NavLogo}
          alt=""
          className="hidden w-20 cursor-pointer rounded-full shadow-md shadow-cyan-200 transition-all duration-100 lg:block"
        />
        {!togglePremiumButtom ? (
          <h1 className="block text-4xl font-semibold italic tracking-tight text-yellow-500 transition-all duration-1000 sm:block">
            Expense Tracker
          </h1>
        ) : (
          <h1 className="flex items-center  space-x-2 text-4xl font-semibold italic tracking-tight text-yellow-500 transition-all duration-1000">
            <h1 className="flex gap-x-2">
              <span>Expense</span>
              <span className="block sm:hidden">Tracker</span>
            </h1>
            <button
              className="hidden rounded-lg bg-blue-500 p-2 px-3 text-3xl font-bold italic tracking-tight text-white transition-all duration-300 hover:bg-blue-700 sm:block"
              onClick={handleDownloadExpenseFile}
            >
              Download
            </button>
            <button
              onClick={() => navigate("/download-history")}
              className="hidden rounded-lg bg-lime-600 p-2 px-3 text-3xl font-bold italic tracking-tight text-white transition-all duration-300 hover:bg-blue-700 sm:block"
            >
              <FaHistory />
            </button>
          </h1>
        )}
      </div>

      <div className="flex items-center space-x-3 text-xl font-semibold text-white">
        {togglePremiumButtom && (
          <div className="hidden items-center space-x-3 md:flex">
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
            className="rounded bg-cyan-600 sm:block hidden p-2 font-semibold transition-all duration-300 hover:bg-lime-600"
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
            alt="hamburger icon"
          />
        </div>
        {toggleHamburger && !togglePremiumButtom && (
          <div className="absolute right-4 top-20 z-50 flex flex-col items-end rounded-lg border-2 border-black bg-gray-100 py-2 text-gray-600 shadow-md sm:hidden">
            <div className="absolute -top-4 right-8 rotate-180 text-gray-100">
              ⏷
            </div>
            <button
              onClick={logoutHandler}
              className="flex w-full items-center bg-blue-500 duration-300 transition-all  text-white justify-between gap-x-4  border-gray-500 px-4 py-2 text-left hover:bg-lime-600"
            >
              <span>Buy Premium</span>
              <MdOutlineWorkspacePremium  />
            </button>
            <button
              onClick={logoutHandler}
              className="mobileButton "
            >
              <span>Logout</span>
              <BiLogOut/>
            </button>
          </div>
        )}
        {toggleHamburger && togglePremiumButtom && (
          <div className="absolute right-4 top-20 z-50 flex flex-col items-end rounded-lg border-2 border-black bg-gray-100 py-2 text-gray-600 shadow-md sm:hidden">
            <div className="absolute -top-4 right-8 rotate-180 text-gray-100">
              ⏷
            </div>
            <button
              onClick={() => navigate("/download-history")}
              className="mobileButton border-b"
            >
              <span>History</span>
              <FaHistory />
            </button>
            <button
              onClick={handleDownloadExpenseFile}
              className="mobileButton border-b"
            >
              <span>Download</span>
              <FaCloudDownloadAlt />
            </button>
            <NavLink
              to="/leaderboard"
              className="mobileButton border-b"
            >
              <span>Leaderboard</span>
              <MdLeaderboard />
            </NavLink>
            <NavLink
            className="mobileButton border-b"
              to="/report"
            >
              <span> Report</span>
              <FaListAlt />
            </NavLink>
            <button
              onClick={logoutHandler}
              className="mobileButton "
            >
              <span>Logout</span>
              <BiLogOut/>
            </button>
          </div>
        )}
        {isOpen && <DropDownMenu onLogOutHandler={logoutHandler} />}
      </div>
    </div>
  );
};

export default Navbar;
