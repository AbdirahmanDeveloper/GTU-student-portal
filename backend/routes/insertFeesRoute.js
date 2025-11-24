import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post('/', async (req,res) => {
    try{
        const {
            date,
            description,
            debits,
            credits,
            balance,
            reg_number
        } = req.body;

        const sql = `
            INSERT INTO fees ( date, description, debits, credits, balance, reg_number)
            VALUES(?,?,?,?,?,?)
        `;
        await db.query(sql, [
            date,
            description,
            debits,
            credits,
            balance,
            reg_number
        ])

        res.status(201).json({message: "Fees Updated Succesfully"})
    } catch(error){
        console.error(error);
        res.status(500).json({message: "server error"});
    }
});

export default router;