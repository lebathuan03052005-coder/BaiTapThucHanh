import express from "express";
import cors from "cors";
import { connectDB } from "./dbconnec.js";

import usersRouter from "./routes/users.js";
import hotelsRouter from "./routes/hotels.js";

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);

app.get("/", (req, res) => res.send("Booking API running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy port ${PORT}`);
});
