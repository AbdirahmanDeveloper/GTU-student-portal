import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      reg_number,
      first_name,
      second_name,
      last_name,
      email,
      mobile,
      alt_mobile,
      national_id,
      course
    } = req.body;

    if (!reg_number || !first_name || !last_name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `
      INSERT INTO students
        (first_name, second_name, last_name,reg_number, email, phone_number, alt_phone_number, national_id, course)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      first_name,
      second_name,
      last_name,
      reg_number,
      email,
      mobile,
      alt_mobile,
      national_id,
      course
    ]);

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const { reg_number } = req.query;

  try {
    if (!reg_number) {
      const [students] = await db.query("SELECT * FROM students");
      return res.status(200).json({ students });
    }

    const [rows] = await db.query(
      "SELECT * FROM students WHERE reg_number = ?",
      [reg_number]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ student: rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
