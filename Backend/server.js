import express from "express";
import cors from "cors";
import sql, { connectDB } from "./dbconnec.js";

const app = express();
const port = 3000;

// Middleware xử lý JSON và CORS để React có thể gọi API
app.use(cors());
app.use(express.json());

// Khởi tạo kết nối Database từ cấu hình của bạn
connectDB();

// ================= API ĐĂNG NHẬP KHÁCH =================
app.post("/customer-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const request = new sql.Request();
    request.input("email", sql.VarChar, email);
    request.input("password", sql.VarChar, password); // Thực tế, bạn nên dùng bcrypt để băm mật khẩu

    const result = await request.query(
      "SELECT id, fullname, email FROM Customers WHERE email = @email AND password = @password",
    );

    if (result.recordset.length > 0) {
      res.json({ success: true, customer: result.recordset[0] });
    } else {
      res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không chính xác!",
      });
    }
  } catch (error) {
    console.error("Lỗi đăng nhập Customer:", error);
    res.status(500).json({ success: false, message: "Lỗi kết nối Server!" });
  }
});

// ================= API ĐĂNG NHẬP ADMIN =================
app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const request = new sql.Request();
    request.input("email", sql.VarChar, email);
    request.input("password", sql.VarChar, password);

    const result = await request.query(
      "SELECT id, fullname, email FROM Admins WHERE email = @email AND password = @password",
    );

    if (result.recordset.length > 0) {
      res.json({ success: true, admin: result.recordset[0] });
    } else {
      res.status(401).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu Admin không đúng!",
      });
    }
  } catch (error) {
    console.error("Lỗi đăng nhập Admin:", error);
    res.status(500).json({ success: false, message: "Lỗi kết nối Server!" });
  }
});

// ================= API QUẢN LÝ TÀI KHOẢN (Mẫu) =================
app.get("/api/accounts", async (req, res) => {
  try {
    // Giả sử bảng Users chứa toàn bộ thông tin
    const result = await sql.query(
      "SELECT id, fullname, email, phone, role FROM Users",
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Lỗi lấy danh sách tài khoản:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách tài khoản" });
  }
});

// ================= API QUẢN LÝ KHÁCH SẠN =================
app.get("/api/hotels", async (req, res) => {
  try {
    const result = await sql.query(
      "SELECT id, name, location, price FROM Hotels",
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Lỗi lấy danh sách khách sạn:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
});

app.post("/api/hotels", async (req, res) => {
  const { name, location, price } = req.body;
  try {
    const request = new sql.Request();
    request.input("name", sql.NVarChar, name);
    request.input("location", sql.NVarChar, location);
    request.input("price", sql.Decimal, price);
    await request.query(
      "INSERT INTO Hotels (name, location, price) VALUES (@name, @location, @price)",
    );
    res.json({ success: true, message: "Thêm khách sạn thành công!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
});

app.delete("/api/hotels/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    await request.query("DELETE FROM Hotels WHERE id = @id");
    res.json({ success: true, message: "Xóa thành công!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
});

// ================= API ĐỔI MẬT KHẨU ADMIN =================
app.post("/api/change-admin-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const request = new sql.Request();
    request.input("email", sql.VarChar, email);
    request.input("oldPassword", sql.VarChar, oldPassword);
    request.input("newPassword", sql.VarChar, newPassword);

    const check = await request.query(
      "SELECT id FROM Admins WHERE email = @email AND password = @oldPassword",
    );
    if (check.recordset.length > 0) {
      await request.query(
        "UPDATE Admins SET password = @newPassword WHERE email = @email",
      );
      res.json({ success: true, message: "Đổi mật khẩu thành công!" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Mật khẩu cũ không chính xác!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi kết nối Server!" });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server Backend API đang chạy tại http://localhost:${port}`);
});
