import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log('Login request body:', req.body);
  const { reg_number, phone_number } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM students WHERE reg_number = ? AND phone_number = ?",
      [reg_number, phone_number]
    );

    const student = rows[0];

    if (!student) {
      return res.status(401).json({ message: "Invalid registration/password" });
    }

    res.json({
      message: "Login successful",
      student: {
        reg_number: student.reg_number,
        name: `${student.first_name} ${student.second_name} ${student.last_name}`,
        phone_number: student.phone_number,
        alt_phone_number: student.alt_phone_number,
        email: student.email,
        course: student.course,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
