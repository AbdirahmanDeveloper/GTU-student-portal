import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const{
            unit_code,
            unit_name,
            lecturer,
            start_time,
            end_time,
            venue,
            exam_date
        } = req.body

        const sql = `
            INSERT INTO timetable(unit_code, unit_name, lecturer, start_time, end_time, venue, exam_date)
            VALUES(?,?,?,?,?,?,?)
        `;

        await db.query(sql, [
            unit_code,
            unit_name,
            lecturer,
            start_time,
            end_time,
            venue,
            exam_date
        ])

        res.status(201).json({message: "timetables updated succesfully"})
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
    
})

export default router;
