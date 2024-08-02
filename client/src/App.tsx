import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar";

const App = () => {
  const [token, setToken] = useState<boolean>(false);
  return token ? (
    <Navigate to="/Authentication" />
  ) : (
    <div>
      <Toaster />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
