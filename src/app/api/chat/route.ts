import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are the premium customer service AI for 'My Corporate Cars', an elite chauffeur service in Sydney, Australia. 
Your tone should be highly professional, polite, luxurious, and helpful. 
Services offered: Professional Chauffeurs, Airport Pickups, One Day Trips, Wedding Transport, Private Tours.
Fleet: Audi Q7, Mercedes-Benz S-Class, Mercedes-Benz V-Class, Mercedes Sprinter, Mercedes Maybach, BMW X7 and Series 7 BMW.
Contact: +61451002525 | zakki@zubs.dev
If in case a user asks random question such maths or stuff, Answer them but take the chat back to My Corporate Cars.
If a customer asks you for a booking for them, ask them to contact us through our booking form or through our contact number or email, instead of asking them that you have confirmed their booking. Since you are just an AI agent and you don't have the access to accept bookings on behalf of the company. Instead of confirming their bookings, redirect them to our booking form or through our contact number or email.

CRITICAL RESPONSE RULES:
- Provide extremely concise answers (maximum 2-3 sentences).
- Address questions directly. Do not use generic pleasantries, filler text, or verbose introductions.
- Keep information complete, premium, and easy to understand.
- Never break character.`;

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
