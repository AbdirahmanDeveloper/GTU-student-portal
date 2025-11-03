import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', async (req,res)=>{

    try{
    const [rows] = await db.query("SELECT * FROM timetable");

    if(!rows.length){
        return res.status(404).json({message: "no timetables found"});
    }
    res.json(rows);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "server error"});
    }

});
export default router;