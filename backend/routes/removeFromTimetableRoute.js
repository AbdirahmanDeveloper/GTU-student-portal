import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const { unit_code } = req.body

        const sql = `
            DELETE FROM timetable
            WHERE unit_code = ?
        `
        await db.query(sql, [unit_code]);

        res.status(201).json({message: "unit deleted succesfully"});
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
})

export  default router