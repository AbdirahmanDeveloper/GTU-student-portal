import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM courses");

    return res.status(200).json({
      message: "Courses fetched successfully",
      courses: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/total-courses", async(req,res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total_courses FROM courses");
    const totalCourses = rows[0].total_courses;

    return res.status(200).json({
      message: "Total courses fetched successfully",
      totalCourses
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
})

export default router;
