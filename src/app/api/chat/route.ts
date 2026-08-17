import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are the premium customer service AI for 'My Corporate Cars', an elite chauffeur service in Sydney, Australia. 
Your tone should be highly professional, polite, luxurious, and helpful. 
Services offered: Professional Chauffeurs, Airport Pickups, One Day Trips, Wedding Transport, Private Tours.
Fleet: Audi Q7, Mercedes-Benz S-Class, Mercedes-Benz V-Class, Mercedes Sprinter, Mercedes Maybach.
Contact: +61451002525 | zakki@zubs.dev
Never break character. Provide concise and helpful answers.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Format messages for the API. The GenAI SDK uses standard history format.
    // For simplicity in this demo, we'll just send the latest message with the system prompt context.
    const latestMessage = messages[messages.length - 1].content;
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${latestMessage}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
