import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const connection = await db.getConnection();

  try {
    const {
      first_name,
      second_name,
      last_name,
      email,
      phone_number,
      alt_phone_number,
      national_id,
      course,
    } = req.body;

    await connection.beginTransaction(); 

    const courseCode = "BSCCS";
    const year = new Date().getFullYear();

    const [rows] = await connection.query(
      `SELECT COUNT(*) AS total FROM students WHERE reg_number LIKE ?`,
      [`${courseCode}/${year}/%`]
    );

    const nextNumber = String(rows[0].total + 1).padStart(5, "0");
    const reg_number = `${courseCode}/${year}/${nextNumber}`;

    await connection.query(
      `INSERT INTO students 
      (first_name, second_name, last_name, reg_number, email, phone_number, alt_phone_number, national_id, course)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        second_name,
        last_name,
        reg_number,
        email,
        phone_number,
        alt_phone_number,
        national_id,
        course
      ]
    );

    // 2️⃣ Insert initial fees
    const totalFees = 60000;

    await connection.query(
      `INSERT INTO fees
      (reg_number, description, debits, credits, balance)
      VALUES (?, ?, ?, ?, ?)`,
      [
        reg_number,
        "Tuition Fees",
        totalFees,
        null,
        totalFees
      ]
    );

    await connection.commit();

    res.status(201).json({
      message: "Student registered and initial fees created",
      reg_number
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
});

router.get("/list-students", async(req,res) => {
  try{
    const [rows] = await db.query("SELECT * FROM students");
    return res.status(200).json({message:"students fetched successfully", students:rows});
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
    
  }
});

// Get total number of students
router.get("/total-students", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total_students FROM students");
    const totalStudents = rows[0].total_students;

    return res.status(200).json({
      message: "Total students fetched successfully",
      totalStudents
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


export default router;
