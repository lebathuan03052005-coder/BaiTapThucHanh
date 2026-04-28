import React from "react";

const AdminHeader = ({ title = "Quản lý hệ thống", userName = "Admin" }) => {
  return (
    <header className="admin-header">
      <h2>{title}</h2>
      <div className="user-info">Chào, {userName}!</div>
    </header>
  );
};

export default AdminHeader;
