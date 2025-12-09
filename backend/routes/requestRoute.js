import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { reg_number, request, request_type } = req.body;

    const sql = `
      INSERT INTO requests (reg_number, request, request_type)
      VALUES (?, ?, ?)
    `;

    await db.query(sql, [ reg_number, request, request_type ]);

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.json({ success: false, error });
  }
});

router.get('/', async(req, res) => {

  try{
      const [rows] = await db.query("SELECT * FROM requests");

      if(!rows.length){
          return res.status(404).json({message: "No requests found",
          });
      }
      res.json(rows)
  } catch(error){
      console.error(error);
      return res.status(500).json({
          message: "server error",
          error: error.message
      });
  }
})

export default router;
