import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./store/appStore.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Authentication from "./pages/Authentication.tsx";
import Report from "./pages/Report.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/report" element={<Report />} />

        </Route>
        <Route path="/Authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
