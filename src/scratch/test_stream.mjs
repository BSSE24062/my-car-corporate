import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const match = envFile.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : '';

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT = `You are the premium customer service AI for 'Elite Cars Australia'. Keep answers very concise (1-2 sentences).`;

async function testStream() {
  const start = Date.now();
  let firstChunkTime = null;
  let fullText = '';

  try {
    const stream = await ai.models.generateContentStream({
      model: 'gemini-3.1-flash-lite',
      contents: 'Do you offer airport transfers in Melbourne?',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        thinkingConfig: { thinkingBudget: 0 },
        maxOutputTokens: 120,
        temperature: 0.7
      }
    });

    for await (const chunk of stream) {
      if (!firstChunkTime) {
        firstChunkTime = Date.now() - start;
        console.log(`[FIRST TOKEN] arrived in ${firstChunkTime}ms!`);
      }
      process.stdout.write(chunk.text || '');
      fullText += chunk.text || '';
    }

    console.log(`\n[STREAM COMPLETED] Total time: ${Date.now() - start}ms`);
  } catch (err) {
    console.error('Streaming error:', err.message || err);
  }
}

testStream();
