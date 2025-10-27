import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentportaldb'
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('connected succesfully');
        connection.release();
    }
    catch (err) {
        console.log('connection failed:', error);
    }
})();

