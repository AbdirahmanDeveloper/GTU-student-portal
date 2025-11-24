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
import chatbotRoute from "./routes/chatbotRoute.js";
import studentRoute from "./routes/studentRoutes.js";
import insertFeesRoute from "./routes/insertFeesRoute.js";
import insertTimetableRoute from "./routes/insertTimetableRoute.js";
import removeFromTimetableRoute from "./routes/removeFromTimetableRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Database connected successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
})();


app.get('/', (req, res) => {
  res.send('🎓 Student Portal Backend is running');
});



app.use('/api/auth', authRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/fees', feeRoute);
app.use("/api/results", resultsRoute);
app.use("/api/register-course", courseRoute);
app.use("/api/request", requestRoute);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/students", studentRoute);
app.use("/api/insert-fees", insertFeesRoute);
app.use("/api/insert-unit", insertTimetableRoute);
app.use('/api/remove-unit', removeFromTimetableRoute);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
