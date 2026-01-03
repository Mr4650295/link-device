
import { GoogleGenAI } from "@google/genai";

export const solveMathProblem = async (problem: string) => {
  try {
    // Correct initialization: always use new GoogleGenAI({ apiKey: process.env.API_KEY })
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      // Upgrade to gemini-3-pro-preview for Complex Text Tasks like math and reasoning
      model: 'gemini-3-pro-preview',
      contents: `Solve the following mathematical or scientific problem step-by-step. Provide the answer in Bengali if the question is in Bengali, otherwise use English. Format clearly with markdown. Problem: ${problem}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    // Access the .text property directly instead of calling a method
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "দুঃখিত, আমি সমস্যাটি সমাধান করতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন। (Sorry, I couldn't solve that. Please try again.)";
  }
};
