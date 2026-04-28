import React from "react";

const Sidebar = ({ view, setView }) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">ADMIN BOOKING</div>
      <ul className="admin-menu">
        <li
          className={view === "dashboard" ? "active" : ""}
          onClick={() => setView("dashboard")}
        >
          Dashboard
        </li>
        <li
          className={view === "hotels" ? "active" : ""}
          onClick={() => setView("hotels")}
        >
          Quản lý khách sạn
        </li>
        <li
          className={view === "accounts" ? "active" : ""}
          onClick={() => setView("accounts")}
        >
          Quản lý tài khoản
        </li>
        <li
          className={view === "Homepage" ? "active" : ""}
          onClick={() => setView("Homepage")}
        >
          Quản lý giao diện
        </li>
        <li
          className={view === "password" ? "active" : ""}
          onClick={() => setView("password")}
        >
          Đổi mật khẩu
        </li>
        <li className="logout">Đăng xuất</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
