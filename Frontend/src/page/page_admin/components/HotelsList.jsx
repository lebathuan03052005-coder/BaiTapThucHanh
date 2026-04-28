import React from "react";

const HotelsList = ({ hotels, onEdit, onDelete }) => {
  return (
    <tbody>
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <tr key={hotel.id}>
            <td>{hotel.id}</td>
            <td>
              <strong>{hotel.name}</strong>
            </td>
            <td>{hotel.address}</td>
            <td>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(hotel.price)}
            </td>
            <td>
              <span
                className={`badge ${hotel.status === "Còn phòng" ? "active" : "full"}`}
              >
                {hotel.status}
              </span>
            </td>
            <td style={{ textAlign: "center" }}>
              <button className="btn-edit-text" onClick={() => onEdit(hotel)}>
                Sửa
              </button>
              <button
                className="btn-delete-text"
                onClick={() => onDelete(hotel.id)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="empty-row">
            Chưa có dữ liệu khách sạn.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default HotelsList;
