import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async(req,res) => {
    try{
        const { reg_number, description, credits } = req.body;

        const [rows] = await db.query(
            "SELECT * FROM fees WHERE reg_number = ? ORDER BY id DESC LIMIT 1",
            [reg_number]
        );

        let latestBalance = 0;

        if(rows.length > 0){
            latestBalance = Number(rows[0].balance);
        }

        const newBalance = latestBalance - Number(credits);

        await db.query(
            "INSERT INTO fees (reg_number, date, description, debits, credits, balance) VALUES (?, NOW(), ?, NULL, ?, ?)",
            [reg_number, description, credits, newBalance]
        );

        res.json({
            message: "Payment recorded successfully",
            newBalance
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
});

router.get("/total-fees", async(req,res) => {
    try{
        const [rows] = await db.query(`
            SELECT SUM(debits) AS total_debits,
             SUM(credits) AS total_credits,
             (SUM(debits)-SUM(credits)) AS total_balance
             FROM fees`);

        const totalDebits = rows[0].total_debits || 0
        const totalCredits = rows[0].total_credits || 0;
        const totalBalance = rows[0].total_balance || 0;

        res.json({
            totalDebits,
            totalCredits,
            totalBalance
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
})

export default router;
