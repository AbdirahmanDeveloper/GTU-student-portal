import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;


const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'studentportaldb'
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('connected succesfully');
        connection.release();
    }
    catch (error) {
        console.log('connection failed:', error);
    }
})();

app.get('/' , (req,res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

