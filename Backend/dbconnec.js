import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log(" Kết nối SQL Server thành công");
  } catch (err) {
    console.error("Lỗi kết nối:", err);
  }
};

export default sql;
