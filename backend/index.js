import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

let pool;

async function start() {
  try {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "studentportaldb",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    console.log(" MySQL pool created and database reachable");

    app.post("/login", async (req, res) => {
      try {
        console.log("POST /login body:", req.body);
        const { reg_number, phone_number } = req.body;

        if (!reg_number || !phone_number) {
          return res.status(400).json({ success: false, message: "reg_number and phone_number required" });
        }

        const [rows] = await pool.execute(
          "SELECT * FROM students WHERE reg_number = ? AND phone_number = ?",
          [reg_number, phone_number]
        );

        if (rows.length > 0) {
          const user = { ...rows[0] };
          delete user.phone_number;
          return res.json({ success: true, message: "Login successful", user });
        } else {
          return res.status(401).json({ success: false, message: "Invalid Reg No or Phone Number" });
        }
      } catch (err) {
        console.error("Error in /login route:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
    });

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server or connect to DB:", err);
    process.exit(1);
  }
}

start();
