import React from "react";

const DashboardCards = ({ hotels = [], accounts = [] }) => {
  return (
    <div className="card dashboard-grid">
      <div className="summary-card">
        <h3>Khách sạn</h3>
        <p>{hotels.length} mục</p>
      </div>
      <div className="summary-card">
        <h3>Tài khoản</h3>
        <p>{accounts.length} mục</p>
      </div>
      <div className="summary-card">
        <h3>Trạng thái</h3>
        <p>
          {hotels.filter((hotel) => hotel.status === "Còn phòng").length} còn
          phòng
        </p>
      </div>
    </div>
  );
};

export default DashboardCards;
