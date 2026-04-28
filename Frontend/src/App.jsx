import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import "./App.css";
import Login from "./page/login";
import Admin from "./page/page_admin/admin";
import LoginAdmin from "./page/login_admin";
function App() {
  return (
    <Router>
      {/* Navbar để ở ngoài Routes để trang nào cũng hiện thanh menu này */}
      <Navbar />

      <Routes>
        {/* Đường dẫn trang chủ */}
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login_admin" element={<LoginAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
