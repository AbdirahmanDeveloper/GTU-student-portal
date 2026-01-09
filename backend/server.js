import express from "express";
import cors from "cors";
import db from "./config/db.js";
import dotenv from "dotenv";
import authRoute from "./student-routes/authRoute.js";
import timetablesRoute from "./student-routes/timetablesRoute.js";
import feesRoute from "./student-routes/feesRoute.js";
import resultRoute from "./student-routes/resultsRoute.js";
import courseRegistartionRoute from "./student-routes/courseRegisterationRoute.js";
import chatbotRoute from "./student-routes/chatbotRoute.js";
import requestRoute from "./student-routes/requestRoute.js";
import insertFees from "./admin-routes/feesRoute.js";
import studentRoute from "./admin-routes/studentsRoute.js";
import insertResultsRoute from "./admin-routes/insertResultsRoute.js";
import updateRequest from "./admin-routes/requestRoute.js";
import coursesRoute from "./admin-routes/coursesRoute.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/timetables", timetablesRoute);
app.use("/api/fees", feesRoute);
app.use("/api/results", resultRoute);
app.use("/api/register-course", courseRegistartionRoute);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/request", requestRoute);
app.use("/api/insert-fees", insertFees);
app.use("/api/students", studentRoute);
app.use("/api/insert-results", insertResultsRoute);
app.use("/api/update-requests", updateRequest);
app.use("/api/courses", coursesRoute);




app.get("/", (req,res) => {
    res.send("server is running")
});

(async ()=> {
    try{
        const connection = await db.getConnection();
        console.log("✅ Database connected successfuly ");
        connection.release();
    }catch(error){
        console.error("Database not Connected", error);
    };
})();

app.listen(PORT, ()=>{
    console.log(`🚀 Server is running on port ${PORT}` );
});