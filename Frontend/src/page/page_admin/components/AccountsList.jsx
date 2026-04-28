import React from "react";

const AccountsList = ({ accounts, onDelete }) => {
  return (
    <tbody>
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <tr key={account.id}>
            <td>{account.id}</td>
            <td>{account.username}</td>
            <td>{account.role}</td>
            <td style={{ textAlign: "center" }}>
              <button
                className="btn-delete-text"
                onClick={() => onDelete(account.id)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="empty-row">
            Chưa có tài khoản nào.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default AccountsList;
