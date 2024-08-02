import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavLogo from "/src/assets/navlogo.jpeg";
import Shimmer from "../components/Shimmer";

const Navbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeClass = "text-yellow-400";

  const [toggleHamburger, setToggleHamburger] = useState(false);

  const image = NavLogo;

  const logoutHandler = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      navigate("/");
      setLoading(false);
    }, 700);
  };

  const handleDownloadExpenseFile = () => {
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

  return loading ? (
    <Shimmer />
  ) : (
    <div className="relative flex items-center justify-between bg-[#00215E] px-4 py-2 sm:px-10">
      <div className="flex items-center space-x-4">
        <img
          src={NavLogo}
          alt=""
          className="w-20 rounded-full shadow-md shadow-cyan-200 transition-all duration-100"
        />
        <h1 className="hidden text-4xl font-semibold italic tracking-tight text-yellow-500 transition-all duration-1000 md:block">
          Expense Tracker
        </h1>
      </div>
      {/* {!loading && expenseData && (
        <button
          className="hidden rounded-lg bg-blue-500 p-2 font-bold text-white transition-all duration-300 hover:bg-blue-700 sm:block"
          onClick={handleDownloadExpenseFile}
        >
          Download Expense File
        </button>
      )} */}
      <div className="flex items-center space-x-3 text-xl font-semibold text-white">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : undefined)}
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
        <img
          src={image}
          className="m-1 h-14 w-16 rounded-lg border border-gray-700 object-cover"
        />
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="group/testing hidden cursor-pointer select-none items-center space-x-3 rounded-md border-2 border-black bg-yellow-300 px-3 py-3 font-semibold text-[#00215E] transition-all duration-200 hover:scale-[1.04] sm:flex"
        >
          {/* <p className="">{displayName}</p> */}
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
              <li className="border-b-2 border-gray-700 px-2">
                <Link to="/ProfilePage">Profile</Link>
              </li>

              <li className="border-b-2 border-gray-700 px-2">
                <Link to="/EmailVerification">Verify Email</Link>
              </li>

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
        {isOpen && (
          <DropDownMenu
            onLogOutHandler={logoutHandler}
            ontoggleDropMenu={setIsOpen}
            navigate={navigate}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
