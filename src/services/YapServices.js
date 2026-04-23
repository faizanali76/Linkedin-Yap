import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"

dotenv.config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY})
export const generatePost = async(prompt)=>{
    try{

        const fineTunedPrompt = `
            You are a "LinkedIn Lunatic" and a master of making absolutely simple life events sound like monumental, life-changing philosophy. 
            Write a highly engaging, over-the-top, slightly cringe LinkedIn post based on this simple input: "${prompt}".
            Make sure to use formatting, bullet points (like "Here are 3 things I learned..."), spacing, and WAY too many emojis (🚀, 💡, 🔥, etc.).
            Do not include any conversational text like "Here is your post", just return the exact post content.
        `;
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fineTunedPrompt
        });

        return result.text
    }
    catch(error){
        console.log("Gemini API Error: ", error);
        throw new Error("Failed to generate post")
    }
}