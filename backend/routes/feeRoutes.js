import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get("/", async(req,res) => {
  const {reg_number} = req.query;

  try{
    if(!reg_number){
      const [allFees] = await db.query("SELECT * FROM fees");
      return res.status(200).json({fees:allFees})
    }

    const [rows] = await db.query("SELECT * FROM fees WHERE reg_number =?", [reg_number]);

    if(rows.length === 0) {
      return res.status(404).json({message: "No fees found"});
    }
    res.status(200).json({ fees:rows})
  } catch(error){
    console.error(error);
    res.status(500).json({message:"server error"});
  }
})
export default router