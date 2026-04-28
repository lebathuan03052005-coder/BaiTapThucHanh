import React from "react";
import HotelsList from "./HotelsList";

const HotelsSection = ({
  editingHotelId,
  hotelForm,
  handleHotelFormChange,
  handleHotelSubmit,
  resetHotelForm,
  hotels,
  handleHotelEdit,
  handleHotelDelete,
}) => {
  return (
    <div className="admin-grid">
      <div className="card">
        <h3>{editingHotelId ? "Chỉnh sửa khách sạn" : "Thêm khách sạn"}</h3>
        <form className="admin-form" onSubmit={handleHotelSubmit}>
          <div className="form-group">
            <label>Tên khách sạn</label>
            <input
              name="name"
              value={hotelForm.name}
              onChange={handleHotelFormChange}
              placeholder="Nhập tên khách sạn"
            />
          </div>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              name="address"
              value={hotelForm.address}
              onChange={handleHotelFormChange}
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Giá/Đêm</label>
              <input
                type="number"
                name="price"
                value={hotelForm.price}
                onChange={handleHotelFormChange}
                placeholder="1000000"
              />
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <select
                name="status"
                value={hotelForm.status}
                onChange={handleHotelFormChange}
              >
                <option value="Còn phòng">Còn phòng</option>
                <option value="Hết phòng">Hết phòng</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-add">
              {editingHotelId ? "Lưu thay đổi" : "+ Thêm khách sạn"}
            </button>
            {editingHotelId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={resetHotelForm}
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <div className="card-header-inline">
          <h3>Danh sách khách sạn</h3>
          <span className="subtle-text">Quản lý, sửa và xóa</span>
        </div>
        <div className="table-responsive">
          <table className="vip-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên khách sạn</th>
                <th>Địa chỉ</th>
                <th>Giá/Đêm</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: "center" }}>Thao tác</th>
              </tr>
            </thead>
            <HotelsList
              hotels={hotels}
              onEdit={handleHotelEdit}
              onDelete={handleHotelDelete}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default HotelsSection;
