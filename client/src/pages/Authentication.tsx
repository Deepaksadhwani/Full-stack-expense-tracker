import Shimmer from "@/components/Shimmer";
import TypingAnimation from "@/components/TypingAnimation";
import { useEffect, useRef, useState } from "react";
import bg1 from "/src/assets/bg1.png";
import { authValidationSchema } from "@/utils/types";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { addToken, setUserData } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

interface Data {
  fullName?: string;
  email?: string;
  password?: string;
}

const Authentication = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [isSign, setIsSign] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSign((prev) => !prev);
  };

  const authHandler = async (endpoint: string) => {
    setIsLoading(true)
    const data: Data = {
      fullName: name.current?.value,
      email: email.current?.value,
      password: password.current?.value.toString(),
    };
    const parsed = authValidationSchema.safeParse(data);
    if (!parsed.success) {
      setError("Invalid input found.");
      return;
    }
    try {
      const response: any = await axios.post(
        `${SERVER_URL}${endpoint}`,
        parsed.data,
      );
      dispatch(setUserData(response.data.data));
      const token = response.headers["authorization"]?.split(" ")[1];
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      navigate("/");
    } catch (error: any) {
      setError(error.response.data.message);
    }finally {
      setIsLoading(false)
    }
  };

  const validateHandler = async () => {
    if (!isSign) {
      authHandler("/user/sign-up");
    } else {
      authHandler("/user/sign-in");
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      dispatch(addToken(userToken));
      navigate("/");
    }
  }, []);

  const bgColor = isSign
    ? "flex w-[90%]  flex-col  items-center space-y-3 rounded-md border-2 border-gray-200 bg-white py-20 shadow-md shadow-black lg:w-[20%] md:py-[42px]  "
    : "flex w-[90%]  flex-col  items-center space-y-3 rounded-md border-2 border-gray-200 bg-gray-900 py-20 shadow-md shadow-black lg:w-[20%] md:py-4 ";

  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="z-10 flex h-screen items-center justify-center bg-gradient-to-br from-black via-gray-700 to-black md:items-end">
      <TypingAnimation />
      <div className="flex w-full justify-center md:my-auto md:items-center">
        <img
          src={bg1}
          alt=""
          className="z-[10] hidden w-40 shadow-md shadow-black md:left-[360px] md:top-[268px] md:block md:w-[520px]"
        />
        <div className={bgColor}>
          <h1 className="mb-10 font-Mont text-3xl font-semibold text-blue-500 md:mb-0">
            {isSign ? "Sign In" : "Sign Up"}
          </h1>
          {!isSign && (
            <input
              ref={name}
              type="text"
              className="border border-gray-700 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Name"
            />
          )}
          <input
            className="border border-gray-700 p-2 focus:border-blue-500 focus:outline-none"
            ref={email}
            type="email"
            placeholder="Email"
          />
          <input
            className="mb-2 border border-gray-700 p-2 focus:border-blue-500 focus:outline-none"
            ref={password}
            type="password"
            placeholder="Password"
          />
          <button
            onClick={() => navigate("/forgetpassword")}
            className="font-semibold text-red-600"
          >
            Forget password?
          </button>
          <p className="font-medium text-red-800">{error}</p>
          <button
            onClick={validateHandler}
            className="w-[40%] rounded-lg bg-blue-500 p-2 font-Mont font-semibold text-white transition-all duration-300 hover:bg-blue-700 lg:w-[75%]"
          >
            {isSign ? "Sign In" : "Sign Up"}
          </button>
          <button
            className="font-semibold text-lime-600"
            onClick={toggleSignInForm}
          >
            {!isSign
              ? "Have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
