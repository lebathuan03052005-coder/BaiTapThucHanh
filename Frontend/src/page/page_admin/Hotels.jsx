import React, { useState, useEffect } from "react";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    price: "",
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/hotels");
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách sạn:", error);
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchHotels();
        setNewHotel({ name: "", location: "", price: "" }); // Reset form
      }
    } catch (error) {
      alert("Lỗi khi kết nối để thêm khách sạn");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khách sạn này?")) return;
    try {
      const response = await fetch(`http://localhost:3000/api/hotels/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchHotels(); // Render lại danh sách
      }
    } catch (error) {
      alert("Lỗi khi kết nối để xóa");
    }
  };

  return (
    <div className="admin-hotels-container">
      <h3>Quản lý Khách sạn / Homestay</h3>

      {/* Form thêm khách sạn mới */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        }}
      >
        <h4 style={{ marginBottom: "15px" }}>Thêm khách sạn mới</h4>
        <form
          onSubmit={handleAddHotel}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <input
            type="text"
            placeholder="Tên khách sạn"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            required
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
          <input
            type="text"
            placeholder="Vị trí (Thành phố...)"
            value={newHotel.location}
            onChange={(e) =>
              setNewHotel({ ...newHotel, location: e.target.value })
            }
            required
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
          <input
            type="number"
            placeholder="Giá (VND)"
            value={newHotel.price}
            onChange={(e) =>
              setNewHotel({ ...newHotel, price: e.target.value })
            }
            required
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#1890ff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Thêm Mới
          </button>
        </form>
      </div>

      {/* Bảng danh sách */}
      <div className="table-responsive">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "25px",
            background: "white",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#111827",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "15px" }}>ID</th>
              <th style={{ padding: "15px" }}>Tên Khách Sạn</th>
              <th style={{ padding: "15px" }}>Vị trí</th>
              <th style={{ padding: "15px" }}>Giá/Đêm</th>
              <th style={{ padding: "15px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "15px" }}>{hotel.id}</td>
                <td style={{ padding: "15px", fontWeight: "600" }}>
                  {hotel.name}
                </td>
                <td style={{ padding: "15px" }}>{hotel.location}</td>
                <td style={{ padding: "15px" }}>{hotel.price} VND</td>
                <td style={{ padding: "15px" }}>
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "6px 12px",
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.id)}
                    style={{
                      padding: "6px 12px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotels;
