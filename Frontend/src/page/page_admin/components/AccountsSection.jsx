import React from "react";
import AccountsList from "./AccountsList";

const AccountsSection = ({
  accountForm,
  handleAccountFormChange,
  handleAccountSubmit,
  accounts,
  handleAccountDelete,
}) => {
  return (
    <div className="admin-grid">
      <div className="card">
        <h3>Thêm tài khoản</h3>
        <form className="admin-form" onSubmit={handleAccountSubmit}>
          <div className="form-group">
            <label>Tên tài khoản</label>
            <input
              name="username"
              value={accountForm.username}
              onChange={handleAccountFormChange}
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div className="form-group">
            <label>Vai trò</label>
            <select
              name="role"
              value={accountForm.role}
              onChange={handleAccountFormChange}
            >
              <option value="Nhân viên">Người Dùng</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-add">
              Thêm tài khoản
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="card-header-inline">
          <h3>Danh sách tài khoản</h3>
          <span className="subtle-text">Xem và xóa</span>
        </div>
        <div className="table-responsive">
          <table className="vip-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên đăng nhập</th>
                <th>Vai trò</th>
                <th style={{ textAlign: "center" }}>Thao tác</th>
              </tr>
            </thead>
            <AccountsList accounts={accounts} onDelete={handleAccountDelete} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountsSection;
