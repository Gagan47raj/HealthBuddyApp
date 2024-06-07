import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import AdminRouters from "./Routers/AdminRouters";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = "image.png";
    }
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
        <Route path="/admin/*" element={<AdminRouters />}></Route>
      </Routes>
    </div>
  );
}

export default App;
