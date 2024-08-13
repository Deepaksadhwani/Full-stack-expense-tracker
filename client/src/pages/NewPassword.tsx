import { SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { tokenid } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/password/resetpassword`, {
        uuid: tokenid,
        password,
      });
      toast.success("Password has been successfully changed.", {
        duration: 4000,
      });
      setPassword("")
    } catch (error) {
      setPassword("");
      setError("Verification link is expired, try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Enter Your New Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block font-semibold text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your new password"
              required
            />
            {error && (
              <p className="pt-4 font-semibold text-red-500">{error}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full transform rounded-lg bg-gray-600 py-2 font-semibold text-white transition-transform hover:scale-105 hover:bg-gray-700"
            >
              Back to Login
            </button>
            {!error && (
              <button
                type="submit"
                className="ml-2 w-full transform rounded-lg bg-purple-600 py-2 font-semibold text-white transition-transform hover:scale-105 hover:bg-purple-700"
              >
                Submit New Password
              </button>
            )}
            {error && (
              <button
                onClick={() => navigate("/forgetpassword")}
                className="ml-2 w-full transform rounded-lg bg-purple-600 py-2 font-semibold text-white transition-transform hover:scale-105 hover:bg-purple-700"
              >
                Generate Link
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
