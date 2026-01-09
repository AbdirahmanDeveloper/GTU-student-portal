import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async(req,res) =>{
    const {
        reg_number,
        request_type,
        request,
    } = req.body;

    try{
        const [rows] = await db.query("INSERT INTO requests(reg_number, request_type, request) VALUES(?, ?, ?)",
            [reg_number, request_type, request]
        );
        
        return res.status(200).json({
            message: "request sent successfully",
            fees: rows
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message:"server error"
        });
        
    }
});

router.get("/fetch-request", async(req,res) => {

    const {reg_number} = req.query;
    const [rows] = await db.query("SELECT * FROM requests WHERE reg_number = ?", [reg_number]);

    return res.status(200).json({
        message:"request fetched succesfully",
        requests: rows
    })
})

export default router