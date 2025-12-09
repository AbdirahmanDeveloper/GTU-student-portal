import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { remarks } = req.body;

    const sql = `
      INSERT INTO requests (remarks)
    `;

    await db.query(sql, [remarks, id]);

    res.json({ success: true, message: "Remarks updated" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
