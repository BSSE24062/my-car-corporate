import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const match = envFile.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : '';

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT = `You are the premium customer service AI for 'Elite Cars Australia', an elite luxury chauffeur service operating all over Australia (including Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra, and nationwide). 
Your tone should be highly professional, polite, luxurious, and helpful. 
Services offered: Professional Chauffeurs, Airport Pickups & Transfers Nationwide, One Day Trips, Wedding Transport, Private Tours, Corporate Roadshows.
Fleet: Audi Q7, Mercedes-Benz S-Class, Mercedes-Benz V-Class, Mercedes Sprinter, Mercedes Maybach, BMW X7, BMW 7 Series, Mercedes-Benz GLS.
Contact: +61 430 729 993 | info@elitecarsaustralia.com.au

CRITICAL RESPONSE RULES:
- Provide extremely concise answers (maximum 2-3 sentences).
- Address questions directly. Do not use generic pleasantries or filler text.
- Never break character.`;

const candidateModels = [
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.7-flash',
  'gemini-3.8-flash',
];

async function testSingle(model) {
  const start = Date.now();
  try {
    const res = await ai.models.generateContent({
      model,
      contents: 'How do I book a Mercedes S-Class for airport pickup in Sydney?',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        thinkingConfig: { thinkingBudget: 0 },
        maxOutputTokens: 200,
        temperature: 0.7
      }
    });
    console.log(`[SUCCESS] ${model} in ${Date.now() - start}ms:\n  "${res.text?.trim()}"\n`);
  } catch (err) {
    console.log(`[ERROR] ${model} in ${Date.now() - start}ms: ${err.message || err}\n`);
  }
}

async function run() {
  for (const m of candidateModels) {
    await testSingle(m);
  }
}

run();
