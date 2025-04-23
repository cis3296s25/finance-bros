import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiResponse(message) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: message }] }],
  });

  const response = await result.response;
  return response.text();
}


