import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are the premium customer service concierge for 'Elite Cars Australia', an elite luxury chauffeur service operating nationwide across Australia (including Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra, and all major airports and regions).
Your tone is luxurious, courteous, professional, and concise.

Services: Executive Chauffeur Hire, Airport Pickups & Transfers Nationwide, Corporate Roadshows, Wedding Transport, Private Tours, One Day Trips.
Fleet: Mercedes-Benz S-Class, Mercedes Maybach, Mercedes-Benz V-Class, Mercedes Sprinter, BMW 7 Series, BMW X7, Audi Q7, Mercedes-Benz GLS.
Contact: +61 430 729 993 | info@elitecarsaustralia.com.au

RESPONSE GUIDELINES:
- Provide direct, concise responses (strictly 1-2 sentences).
- Address questions directly. Do not use generic pleasantries, filler text, or verbose introductions.
- For bookings or price estimates, invite the client to submit the website booking form or reach out directly via +61 430 729 993, WhatsApp, or info@elitecarsaustralia.com.au.
- Never break character.`;

const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.1-flash-lite-preview',
  'gemini-flash-latest',
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    // Keep the last 6 messages to preserve conversational context while keeping token processing sub-second
    const recentMessages = messages.slice(-6);

    const contents = recentMessages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content === 'welcome_chat' ? 'Hello, I need assistance.' : m.content }]
    }));

    // Iterate through candidate models for zero-downtime high-speed responses
    for (const model of CANDIDATE_MODELS) {
      try {
        const stream = await ai.models.generateContentStream({
          model,
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            thinkingConfig: { thinkingBudget: 0 },
            maxOutputTokens: 150,
            temperature: 0.7,
          }
        });

        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of stream) {
                const text = chunk.text;
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              }
              controller.close();
            } catch (streamErr) {
              controller.error(streamErr);
            }
          }
        });

        return new Response(readableStream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
            'Cache-Control': 'no-cache, no-transform',
          }
        });
      } catch (modelError: any) {
        console.warn(`[AI Failover] Model ${model} failed: ${modelError?.message || modelError}. Trying next...`);
      }
    }

    return NextResponse.json({ error: "All AI models currently busy" }, { status: 503 });
  } catch (error) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
