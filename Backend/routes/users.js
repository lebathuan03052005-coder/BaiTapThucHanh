import express from "express";
import sql from "../dbconnec.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
