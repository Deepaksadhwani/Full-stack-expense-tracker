import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./store/appStore";
const App = () => {
  const token = useSelector((store: RootState) => store.user.token);
  console.log("current token", token)
  return !token ? (
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
