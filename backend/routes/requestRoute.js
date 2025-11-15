import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/send", async (req, res) => {
  const { requestType, message, studentName, regNumber } = req.body;

  if (!requestType || !message || !studentName || !regNumber) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "addeh2003@gmail.com",
      subject: `Request from ${studentName} (${regNumber}) - ${requestType}`,
      text: `
Student Name: ${studentName}
Reg Number: ${regNumber}
Request Type: ${requestType}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: " Request email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: " Failed to send email." });
  }
});

router.get("/test", (req, res) => {
  res.json({ success: true, message: "Request route working " });
});

export default router;
