import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { reg_number } = req.query;

  try {
    // Return all results if no reg number
    if (!reg_number) {
      const [allResults] = await db.query("SELECT * FROM results");
      return res.status(200).json({ results: allResults });
    }

    // Fetch results for one student
    const [rows] = await db.query(
      "SELECT * FROM results WHERE reg_number = ?",
      [reg_number]
    );

    if (rows.length === 0) {
      // Important: return empty array instead of 404
      return res.status(200).json({ results: [] });
    }

    res.status(200).json({ results: rows });

  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Server error while fetching results." });
  }
});

export default router;
