import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    let { reg_number, unit_code, group, exam_type } = req.body;

    if (!reg_number || !unit_code || !exam_type) {
      return res.status(400).json({ message: "reg_number, unit_code, and exam_type are required" });
    }

    reg_number = reg_number.trim();
    unit_code = unit_code.trim();
    exam_type = exam_type.trim();

    const [unitRows] = await db.query(
      "SELECT * FROM timetable WHERE unit_code = ? LIMIT 1",
      [unit_code]
    );

    if (unitRows.length === 0) {
      return res.status(404).json({ message: "Unit not found in timetable" });
    }

    const unit = unitRows[0];

    const [existing] = await db.query(
      "SELECT * FROM registered_courses WHERE reg_number = ? AND unit_code = ?",
      [reg_number, unit_code]
    );

    const examTypeLower = exam_type.toLowerCase();

    const alreadyRegisteredThisAttempt = existing.some(
      r => r.exam_type && r.exam_type.trim().toLowerCase() === examTypeLower
    );

    if (alreadyRegisteredThisAttempt) {
      return res.status(409).json({ message: `You have already registered this unit for "${exam_type}"` });
    }

    const [result] = await db.query(
      `INSERT INTO registered_courses
        (reg_number, unit_code, unit_name, exam_type, \`group\`, lecturer_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        reg_number,
        unit_code,
        unit.subject_name || unit.unit_name || null,
        exam_type,
        group || null,
        unit.lecturer_name || null
      ]
    );

    const [insertedRows] = await db.query(
      "SELECT * FROM registered_courses WHERE id = ? LIMIT 1",
      [result.insertId]
    );

    return res.status(200).json({ registered: insertedRows[0] });

  } catch (err) {
    console.error("Error in /api/register-course:", err);
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Already registered" });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
