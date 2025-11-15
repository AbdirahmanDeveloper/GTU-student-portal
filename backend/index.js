import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import timetableRoutes from "./routes/timetableRoutes.js";
import feeRoute from "./routes/feeRoutes.js";
import resultsRoute from "./routes/resultRoutes.js";
import courseRoute from "./routes/courseRoutes.js"
import session from 'express-session';
import requestRoute from "./routes/requestRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// SESSION MILDWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET || "superSecretKey123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,   // true only if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Test DB connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Database connected successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
})();


// Default route
app.get('/', (req, res) => {
  res.send('🎓 Student Portal Backend is running');
});



app.use('/api/auth', authRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/fees', feeRoute);
app.use("/api/results", resultsRoute);
app.use("/api/register-course", courseRoute);
app.use("/api/request", requestRoute);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
