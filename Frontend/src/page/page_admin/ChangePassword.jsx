import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới không khớp, vui lòng nhập lại!");
      return;
    }

    const adminEmail = prompt(
      "Vì lý do bảo mật, vui lòng nhập lại Email Admin của bạn:",
    );
    if (!adminEmail) return;

    try {
      const response = await fetch(
        "http://localhost:3000/api/change-admin-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: adminEmail, oldPassword, newPassword }),
        },
      );

      const data = await response.json();
      alert(data.message);

      if (data.success) {
        localStorage.removeItem("isAdminLoggedIn");
        navigate("/login_admin"); // Yêu cầu đăng nhập lại
      }
    } catch (error) {
      alert("Lỗi kết nối với máy chủ!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          marginBottom: "25px",
          color: "#1f2937",
          borderBottom: "2px solid #f3f4f6",
          paddingBottom: "10px",
        }}
      >
        Đổi Mật Khẩu Quản Trị Viên
      </h3>
      <form
        onSubmit={handleChangePassword}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontWeight: "600", fontSize: "14px" }}>
            Mật khẩu hiện tại:
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontWeight: "600", fontSize: "14px" }}>
            Mật khẩu mới:
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontWeight: "600", fontSize: "14px" }}>
            Xác nhận mật khẩu mới:
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "14px",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
            transition: "0.3s",
          }}
        >
          XÁC NHẬN ĐỔI MẬT KHẨU
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
