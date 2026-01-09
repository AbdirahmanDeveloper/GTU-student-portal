import express from "express";
import db from "../config/db.js"

const router = express.Router();

router.get("/", async(req,res) => {
    try{

        const [rows] = await db.query("SELECT * FROM timetable");

        return res.status(200).json({
            message:"timetables fetched successfuly",
            timetable: rows
        })

    }catch(error){
        console.error(error);
        
        return res.status(500).json({message:"server error", error})
    }
});


router.delete("/delete", async (req, res) => {
    let connection;
  
    try {
      const { unit_code } = req.body;
  
      if (!unit_code) {
        return res.status(400).json({ message: "unit_code is required" });
      }
  
      connection = await db.getConnection();
      await connection.beginTransaction();
  
      const [result] = await connection.query(
        "DELETE FROM timetable WHERE unit_code = ?",
        [unit_code]
      );
  
      if (result.affectedRows === 0) {
        await connection.rollback();
        return res.status(404).json({ message: "Unit not found" });
      }
  
      await connection.commit();
      res.status(200).json({ message: "Unit deleted successfully" });
  
    } catch (error) {
      if (connection) await connection.rollback();
      console.error(error);
      res.status(500).json({ message: "Server error" });
  
    } finally {
      if (connection) connection.release();
    }
  });


router.post("/insert", async (req, res) => {
    let connection;
  
    try {
      const { unit_code, lecturer, start_time, end_time, venue, exam_date } = req.body;
  
      connection = await db.getConnection();
      await connection.beginTransaction();

      const[rows] = await connection.query("SELECT * FROM courses WHERE course_code =?", [unit_code]);

      if(rows.length===0){
        await connection.rollback();
        return res.status(404).json({ message: "Unit not found in courses table" });
      }

      const unit_name = rows[0].course_title;
  
      await connection.query(
        `INSERT INTO timetable (unit_code, unit_name, lecturer, start_time, end_time, venue, exam_date) VALUES(?, ?, ?, ?, ?, ?, ?) `,
        [unit_code, unit_name, lecturer, start_time, end_time, venue, exam_date]
      );
  
      await connection.commit();
      res.status(200).json({ message: "Unit inserted successfully" });
  
    } catch (error) {
      if (connection) await connection.rollback();
      console.error(error);
      res.status(500).json({ message: "Server error" });
  
    } finally {
      if (connection) connection.release();
    }
  });
  

export default router;