import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async(req,res) => {
    const {reg_number} = req.query;

    try{
        const [rows] = await db.query(
            "SELECT * FROM fees WHERE reg_number = ?",
            [reg_number]
        );

        return res.status(200).json({
            message: "Fees fetched successfully",
            fees: rows
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Server error"});   
    }
});

export default router;
