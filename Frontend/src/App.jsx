import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./page/page_admin/components/adminLayOut";
import Dashboard from "./page/page_admin/Dashboard";
import Hotels from "./page/page_admin/Hotels";
import Accounts from "./page/page_admin/Accounts";
import ChangePassword from "./page/page_admin/ChangePassword";
import Login from "./page/login";
import LoginAdmin from "./page/login_admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Các trang Đăng nhập */}
        <Route path="/login" element={<Login />} />
        <Route path="/login_admin" element={<LoginAdmin />} />

        {/* Khu vực quản trị Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Mặc định chuyển hướng vào dashboard */}
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Mặc định chuyển hướng tới đăng nhập nếu nhập URL không tồn tại */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
