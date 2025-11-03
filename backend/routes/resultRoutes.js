import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET student results by reg_number
router.get("/", async (req, res) => {
    const { reg_number } = req.query;
  
    try {
      if (!reg_number) {
        const [allResults] = await db.query("SELECT * FROM results");
        return res.status(200).json({ results: allResults });
      }
  
      const [rows] = await db.query("SELECT * FROM results WHERE reg_number = ?", [reg_number]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "No results found for this student." });
      }
  
      res.status(200).json({ results: rows });
    } catch (error) {
      console.error("Error fetching results:", error);
      res.status(500).json({ message: "Server error while fetching results." });
    }
  });
  
export default router;
