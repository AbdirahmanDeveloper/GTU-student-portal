import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async(req,res)=>{
    const{reg_number, phone_number} = req.body;
    try{
        const [rows] = await db.query("SELECT * FROM students WHERE reg_number = ? AND phone_number = ?", [reg_number, phone_number]);

        if(rows.length === 0){
            return res.status(401).json({message:"invalid credentials"});
        }

        const student = rows[0];

        console.log(student);

        return res.status(200).json({
            message: "login successfully",
            student:{
                name: `${student.first_name} ${student.second_name} ${student.last_name}`.trim(),
                reg_number:student.reg_number,
                email:student.email,
                alt_email:student.alt_email,
                phone_number:student.phone_number,
                alt_phone_number:student.alt_phone_number,
                course:student.course,
            }
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({message:"server error"});
        
    }
});

export default router;