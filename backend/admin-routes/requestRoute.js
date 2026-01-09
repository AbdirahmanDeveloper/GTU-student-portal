import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async(req,res) => {
    try{
        const [rows] = await db.query("SELECT * FROM requests");

    return res.status(200).json({message:"request fetched successfully", request:rows});
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"server error"});
        
    }
});

router.put("/", async (req, res) => {
    let connection;
  
    try {
      const { remarks } = req.body;
  
      connection = await db.getConnection();
      await connection.beginTransaction();
  
      for (const item of remarks) {
        await connection.query(
          "UPDATE requests SET remark = ? WHERE id = ?",
          [item.remark, item.id]
        );
      }
  
      await connection.commit();
  
      return res.status(200).json({ message: "Remarks updated successfully" });
  
    } catch (error) {
      if (connection) await connection.rollback();
      console.error(error);
      return res.status(500).json({ message: "Server error" });
  
    } finally {
      if (connection) connection.release();
    }
  });
  

export default router