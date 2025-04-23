import express from 'express';
import dotenv from 'dotenv';
import Transaction from '../models/Transaction.js';
import { getGeminiResponse } from '../helpers/gemini.js'; 

dotenv.config();
const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Get the 5 most recent transactions for this user
    const transactions = await Transaction.find({ userId }).sort({ date: -1 }).limit(5);

    // Build the prompt to send to Gemini
    const prompt = `
    Based on the user's recent spending:
    ${transactions.map(t => `• ${t.category || 'Uncategorized'}: $${t.amount}`).join('\n')}

    The user asked: "${message}"

    Give 5 helpful (SHORT BULLET POINTS), friendly financial advice based on context that you can ask the user to clarify if needed. When i say to create bullet points, just separate them by 2 new lines, do not use any other characters or symbols. Do not use any emojis or special characters, just plain text.

    `;

    const reply = await getGeminiResponse(prompt);
    res.json({ reply });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

// export default router;
export { router as aiRoutes };



