import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const match = envFile.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : '';

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT = `You are the premium customer service concierge for 'Elite Cars Australia', an elite luxury chauffeur service operating nationwide across Australia (Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra).
Tone: Luxurious, professional, direct, polite.
Services: Airport Transfers, Corporate Chauffeurs, Wedding Cars, Private Tours, One Day Trips.
Fleet: Mercedes S-Class, Mercedes Maybach, Mercedes V-Class, Mercedes Sprinter, BMW 7 Series, BMW X7, Audi Q7, Mercedes GLS.
Contact: +61 430 729 993 | info@elitecarsaustralia.com.au

RULES:
- Answer in 1 to 2 concise sentences maximum.
- Never use generic filler introductions like "Certainly!" or "As an AI...".
- If asking about bookings or quotes, direct them to our online booking form or contact (+61 430 729 993 / info@elitecarsaustralia.com.au).`;

const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.7-flash',
  'gemini-3.1-flash-lite-preview',
  'gemini-flash-latest'
];

async function generateWithFallback(userPrompt) {
  const start = Date.now();
  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          thinkingConfig: { thinkingBudget: 0 },
          maxOutputTokens: 150,
          temperature: 0.7,
        }
      });
      const text = response.text?.trim();
      if (text) {
        console.log(`[SUCCESS] [${model}] completed in ${Date.now() - start}ms:\n"${text}"`);
        return text;
      }
    } catch (err) {
      console.warn(`[FAILOVER] Model ${model} failed (${err.message}). Trying next...`);
    }
  }
  throw new Error('All models failed');
}

async function run() {
  await generateWithFallback('Can I book a Maybach for my wedding in Sydney?');
}

run();
