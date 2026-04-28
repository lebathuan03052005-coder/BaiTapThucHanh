import React, { useState, useEffect } from "react";
import "./admin.css";
import { fetchHotels, fetchUsers } from "../../api/adminApi";
import Sidebar from "./components/Sidebar";
import AdminHeader from "./components/AdminHeader";
import DashboardCards from "./components/DashboardCards";
import HotelsSection from "./components/HotelsSection";
import AccountsSection from "./components/AccountsSection";

const Admin = () => {
  const [view, setView] = useState("dashboard");
  const [hotels, setHotels] = useState([]);

  const [accounts, setAccounts] = useState([]);

  const [hotelForm, setHotelForm] = useState({
    name: "",
    address: "",
    price: "",
    status: "Còn phòng",
  });
  const [editingHotelId, setEditingHotelId] = useState(null);

  const [accountForm, setAccountForm] = useState({
    username: "",
    role: "Người dùng",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // homepage section state
  const [selectedIds, setSelectedIds] = useState([]);
  const [homepageSections, setHomepageSections] = useState({
    hotRooms: [],
    favoritePlaces: [],
    offers: [],
  });
  const [targetSection, setTargetSection] = useState("hotRooms");

  useEffect(() => {
    const saved = localStorage.getItem("homepageSections");
    if (saved) setHomepageSections(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("homepageSections", JSON.stringify(homepageSections));
  }, [homepageSections]);

  // fetch data on mount
  useEffect(() => {
    (async () => {
      try {
        const h = await fetchHotels();
        setHotels(h);
      } catch (err) {
        console.error("Fetch hotels failed:", err);
      }
      try {
        const u = await fetchUsers();
        setAccounts(u);
      } catch (err) {
        console.error("Fetch users failed:", err);
      }
    })();
  }, []);

  const resetHotelForm = () => {
    setHotelForm({ name: "", address: "", price: "", status: "Còn phòng" });
    setEditingHotelId(null);
  };

  const handleHotelSubmit = (event) => {
    event.preventDefault();
    const price = Number(hotelForm.price);
    if (!hotelForm.name || !hotelForm.address || !price) {
      return alert("Vui lòng điền đủ thông tin khách sạn.");
    }

    if (editingHotelId) {
      setHotels((prev) =>
        prev.map((hotel) =>
          hotel.id === editingHotelId
            ? { ...hotel, ...hotelForm, price }
            : hotel,
        ),
      );
      resetHotelForm();
      return;
    }

    const nextId =
      hotels.length > 0 ? Math.max(...hotels.map((h) => h.id)) + 1 : 1;
    setHotels((prev) => [...prev, { id: nextId, ...hotelForm, price }]);
    resetHotelForm();
  };

  const handleHotelEdit = (hotel) => {
    setView("hotels");
    setEditingHotelId(hotel.id);
    setHotelForm({
      name: hotel.name,
      address: hotel.address,
      price: hotel.price,
      status: hotel.status,
    });
  };

  const handleHotelDelete = (id) => {
    if (window.confirm("Bạn muốn xóa khách sạn này chứ?")) {
      setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
    }
  };

  const handleHotelFormChange = (event) => {
    const { name, value } = event.target;
    setHotelForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountFormChange = (event) => {
    const { name, value } = event.target;
    setAccountForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountSubmit = (event) => {
    event.preventDefault();
    if (!accountForm.username) {
      return alert("Vui lòng điền tên tài khoản.");
    }
    const nextId =
      accounts.length > 0 ? Math.max(...accounts.map((a) => a.id)) + 1 : 1;
    setAccounts((prev) => [
      ...prev,
      { id: nextId, username: accountForm.username, role: accountForm.role },
    ]);
    setAccountForm({ username: "", role: "Nhân viên" });
  };

  const handleAccountDelete = (id) => {
    if (window.confirm("Xóa tài khoản này?")) {
      setAccounts((prev) => prev.filter((account) => account.id !== id));
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (!passwordForm.oldPassword || !passwordForm.newPassword) {
      return alert("Vui lòng điền đủ thông tin đổi mật khẩu.");
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return alert("Mật khẩu mới và xác nhận không khớp.");
    }
    alert("Đổi mật khẩu thành công (giả lập). ");
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="admin-container">
      <Sidebar view={view} setView={setView} />

      <main className="admin-content">
        <AdminHeader title="Quản lý hệ thống" userName="Admin Thuần" />

        <section className="admin-main">
          {view === "dashboard" && (
            <DashboardCards hotels={hotels} accounts={accounts} />
          )}
          {view === "Homepage" && (
            <div className="card homepage-manager">
              <h3>Quản lý giao diện - Chọn khách sạn cho trang chủ</h3>
              <div className="homepage-manager-grid">
                <div className="left">
                  <div className="table-actions">
                    <label>
                      <select
                        value={targetSection}
                        onChange={(e) => setTargetSection(e.target.value)}
                      >
                        <option value="hotRooms">Phòng hot</option>
                        <option value="favoritePlaces">
                          Địa điểm ưa thích
                        </option>
                        <option value="offers">Ưu đãi</option>
                      </select>
                    </label>
                    <button
                      onClick={() => {
                        if (selectedIds.length === 0)
                          return alert("Chọn ít nhất một khách sạn.");
                        setHomepageSections((prev) => ({
                          ...prev,
                          [targetSection]: Array.from(
                            new Set([
                              ...(prev[targetSection] || []),
                              ...selectedIds,
                            ]),
                          ),
                        }));
                        setSelectedIds([]);
                      }}
                    >
                      Thêm vào mục
                    </button>
                  </div>

                  <table className="hotels-table">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            checked={selectedIds.length === hotels.length}
                            onChange={(e) =>
                              setSelectedIds(
                                e.target.checked ? hotels.map((h) => h.id) : [],
                              )
                            }
                          />
                        </th>
                        <th>Tên khách sạn</th>
                        <th>Địa chỉ</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotels.map((hotel) => (
                        <tr key={hotel.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(hotel.id)}
                              onChange={(e) =>
                                setSelectedIds((prev) =>
                                  e.target.checked
                                    ? [...prev, hotel.id]
                                    : prev.filter((id) => id !== hotel.id),
                                )
                              }
                            />
                          </td>
                          <td>{hotel.name}</td>
                          <td>{hotel.address}</td>
                          <td>{hotel.price}</td>
                          <td>{hotel.status}</td>
                          <td>
                            <button onClick={() => handleHotelEdit(hotel)}>
                              Sửa
                            </button>
                            <button onClick={() => handleHotelDelete(hotel.id)}>
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="right">
                  <h4>Các mục trang chủ</h4>
                  <div className="section-box">
                    <strong>Phòng hot</strong>
                    <ul>
                      {(homepageSections.hotRooms || []).map((id) => {
                        const h = hotels.find((x) => x.id === id);
                        return (
                          <li key={id}>
                            {h ? h.name : `#${id}`}{" "}
                            <button
                              onClick={() =>
                                setHomepageSections((prev) => ({
                                  ...prev,
                                  hotRooms: prev.hotRooms.filter(
                                    (x) => x !== id,
                                  ),
                                }))
                              }
                            >
                              Xóa
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="section-box">
                    <strong>Địa điểm ưa thích</strong>
                    <ul>
                      {(homepageSections.favoritePlaces || []).map((id) => {
                        const h = hotels.find((x) => x.id === id);
                        return (
                          <li key={id}>
                            {h ? h.name : `#${id}`}{" "}
                            <button
                              onClick={() =>
                                setHomepageSections((prev) => ({
                                  ...prev,
                                  favoritePlaces: prev.favoritePlaces.filter(
                                    (x) => x !== id,
                                  ),
                                }))
                              }
                            >
                              Xóa
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="section-box">
                    <strong>Ưu đãi</strong>
                    <ul>
                      {(homepageSections.offers || []).map((id) => {
                        const h = hotels.find((x) => x.id === id);
                        return (
                          <li key={id}>
                            {h ? h.name : `#${id}`}{" "}
                            <button
                              onClick={() =>
                                setHomepageSections((prev) => ({
                                  ...prev,
                                  offers: prev.offers.filter((x) => x !== id),
                                }))
                              }
                            >
                              Xóa
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {view === "hotels" && (
            <HotelsSection
              editingHotelId={editingHotelId}
              hotelForm={hotelForm}
              handleHotelFormChange={handleHotelFormChange}
              handleHotelSubmit={handleHotelSubmit}
              resetHotelForm={resetHotelForm}
              hotels={hotels}
              handleHotelEdit={handleHotelEdit}
              handleHotelDelete={handleHotelDelete}
            />
          )}

          {view === "accounts" && (
            <AccountsSection
              accountForm={accountForm}
              handleAccountFormChange={handleAccountFormChange}
              handleAccountSubmit={handleAccountSubmit}
              accounts={accounts}
              handleAccountDelete={handleAccountDelete}
            />
          )}

          {view === "password" && (
            <div className="card password-card">
              <h3>Đổi mật khẩu</h3>
              <form className="admin-form" onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label>Mật khẩu cũ</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu cũ"
                  />
                </div>
                <div className="form-group">
                  <label>Mật khẩu mới</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div className="form-group">
                  <label>Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-add">
                    Cập nhật mật khẩu
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
