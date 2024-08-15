import { useEffect, useRef, useState } from "react";
import Shimmer from "../components/Shimmer";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/utils/constants";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const email = useRef<HTMLInputElement>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       await axios.post(`${SERVER_URL}/password/forgotpassword `, {
        email: email.current?.value,
      });
      toast.success("Please check your email for verification🦋", {
        duration: 3000,
      });
      setStatus(true);
      setStatusText(
        "If you don't receive a confirmation within 10 minutes, please try again.",
      );
    } catch (error) {
      setStatus(false);
      setStatusText("Invalid email address found.");
      if (email.current) {
        email.current.value = "";
      }
    }
  };

  useEffect(() => {
    const loadingTimmer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(loadingTimmer);
  }, []);
  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="flex h-screen items-center justify-center bg-gradient-to-bl from-indigo-400 via-gray-300 to-blue-400">
      <div className="mx-auto max-w-md transform rounded-lg bg-white p-8 shadow-xl transition-all duration-500 hover:scale-105">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block font-bold text-gray-700"
            >
              Email
            </label>
            <input
              ref={email}
              className="w-full appearance-none rounded border border-gray-300 px-4 py-3 leading-tight text-gray-700 shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <p
            className={`pb-2 text-center font-semibold ${status ? "text-green-700" : "text-red-600"} `}
          >
            {statusText}
          </p>
          <div className="flex justify-between gap-x-2">
            <button
              type="submit"
              className="focus:shadow-outline transform rounded-lg bg-blue-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none"
            >
              Reset Password
            </button>
            <button
              onClick={() => navigate("/Authentication")}
              className="focus:shadow-outline transform rounded-lg bg-blue-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none"
            >
              Login Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
