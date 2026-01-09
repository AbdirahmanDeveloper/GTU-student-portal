import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async(req,res) => {
    const{reg_number} = req.query;

    try{
        const [rows] = await db.query(
            "SELECT * FROM results WHERE reg_number = ?",
            [reg_number]
        );

        return res.status(200).json({
            message:"results fetched successfully",
            results:rows
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"server error"});
    }
});

export default router;