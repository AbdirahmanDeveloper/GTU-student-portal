import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async(req, res) => {

    let connection;

    try{
        const{reg_number, unit_code, unit_name, academic_hours, marks, grade} = req.body;
        
        connection = await db.getConnection();
        await connection.beginTransaction();
    
        await connection.query(`INSERT INTO results 
        (reg_number, unit_code, unit_name, academic_hours, marks, grade)
        VALUES(?, ?, ? ,?, ?, ?)`,
        [
            reg_number, unit_code, unit_name, academic_hours, marks, grade
        ]);

        await connection.commit();

        return res.status(200).json({message: "results inserted suucesfully"});
    }catch(error){
        if(connection) await connection.rollback();
        console.error(error);
        return res.status(500).json({message:"server error"});
    }finally{
        if(connection) connection.release();
    }
});

export default router;