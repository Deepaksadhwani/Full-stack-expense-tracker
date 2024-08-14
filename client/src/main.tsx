import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./store/appStore.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Authentication from "./pages/Authentication.tsx";
import Report from "./pages/Report.tsx";
import LeaderBoard from "./pages/LeaderBoard.tsx";
import ForgotPassword from "./pages/ForgetPassword.tsx";
import { Toaster } from "react-hot-toast";
import NewPassword from "./pages/NewPassword.tsx";
import DownloadHistory from "./pages/DownloadHistory.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/download-history" element={<DownloadHistory />} />
        </Route>
        <Route path="/Authentication" element={<Authentication />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/newpassword/:tokenid" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
