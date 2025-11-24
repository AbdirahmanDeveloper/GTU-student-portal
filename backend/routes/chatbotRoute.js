import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
  
  router.post("/", async (req, res) => {
    try {
      const userMessage = req.body.message;
  
      if (!userMessage || userMessage.trim() === "") {
        return res.status(400).json({ reply: "Please enter a message." });
      }
  
      const completion = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are an Global Tech University (GTU) Student Portal Assistant Located at Kenya Thika Town . Answer clearly and helpfully offficial email is GTU.ac.ke."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_completion_tokens: 300,
        temperature: 0.7
      });
  
      const botReply = completion.choices[0].message.content;
  
      return res.json({ reply: botReply });
  
    } catch (error) {
      console.error("Chatbot Error:", error);
  
      return res.status(500).json({
        reply: "Server is down. Please try again later."
      });
    }
  });
  
  export default router;
