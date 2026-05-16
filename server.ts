import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// AI Chat Assistant
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are the friendly AI assistant for Madhura Abacus Star, a premium abacus training institute. You help parents and students with course details, fees, timings, and learning benefits. Be encouraging, educational, and professional. Support voice-like responses if requested.",
      },
      history: history || []
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

// AI Mental Math Question Generator
app.post("/api/ai/generate-question", async (req, res) => {
  try {
    const { level, difficulty } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a mental math question suitable for an abacus student at level ${level} with ${difficulty} difficulty. Return ONLY a JSON object with keys: "question" (string, e.g. "23 + 45 - 12"), "answer" (number), and "explanation" (string).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            answer: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "answer", "explanation"]
        }
      }
    });
    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error("AI Question Error:", error);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

// AI Performance Analyzer
app.post("/api/ai/analyze-performance", async (req, res) => {
  try {
    const { sessionHistory } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following mental math session history for a student: ${JSON.stringify(sessionHistory)}. Provide personalized improvement suggestions and an estimated concentration level (0-100). Return ONLY JSON: { "suggestions": ["string"], "concentrationLevel": number, "summary": "string" }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            concentrationLevel: { type: Type.NUMBER },
            summary: { type: Type.STRING }
          },
          required: ["suggestions", "concentrationLevel", "summary"]
        }
      }
    });
    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error("AI Analyzer Error:", error);
    res.status(500).json({ error: "Failed to analyze performance" });
  }
});

// Vite middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
