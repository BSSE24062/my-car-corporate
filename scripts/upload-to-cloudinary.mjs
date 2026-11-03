#!/usr/bin/env node
/**
 * Automated Cloudinary Migration Script for Elite Cars Australia
 *
 * Scans `/public` for all `.jpg`, `.jpeg`, `.png`, `.avif`, and `.webp` images
 * and uploads them to Cloudinary with deterministic `public_id`s matching `src/lib/cloudinary.ts`.
 *
 * Usage:
 *   npm run upload:cloudinary
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Load .env.local / .env automatically without requiring extra dependencies
function loadEnvFile(filename) {
  const envPath = path.resolve(process.cwd(), filename);
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const cloudName = (
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  ''
).trim();
const apiKey = (process.env.CLOUDINARY_API_KEY || '').trim();
const apiSecret = (process.env.CLOUDINARY_API_SECRET || '').trim();
const folder = (process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'elite-cars')
  .trim()
  .replace(/^\/+|\/+$/g, '');

if (!cloudName || !apiKey || !apiSecret) {
  console.error('\n❌ Missing Cloudinary credentials in .env.local!');
  console.error('Please set the following in .env.local before running this script:');
  console.error('  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.error('  CLOUDINARY_API_KEY=your_api_key');
  console.error('  CLOUDINARY_API_SECRET=your_api_secret\n');
  process.exit(1);
}

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const IMAGE_EXT_REGEX = /\.(jpe?g|png|avif|webp|gif)$/i;

function toCloudinaryPublicId(relFromPublic) {
  const withoutExt = relFromPublic
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(IMAGE_EXT_REGEX, '');

  const normalized = withoutExt
    .split('/')
    .map((segment) => segment.trim().replace(/\s+/g, '_'))
    .filter(Boolean)
    .join('/');

  return folder ? `${folder}/${normalized}` : normalized;
}

function collectImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath));
    } else if (entry.isFile() && IMAGE_EXT_REGEX.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

function signCloudinaryParams(params, secret) {
  const serialized = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(serialized + secret).digest('hex');
}

async function uploadSingleImage(filePath) {
  const relPath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
  const publicId = toCloudinaryPublicId(relPath);
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = {
    invalidate: 'true',
    overwrite: 'true',
    public_id: publicId,
    timestamp: String(timestamp),
  };

  const signature = signCloudinaryParams(paramsToSign, apiSecret);
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);

  const form = new FormData();
  form.append('file', blob, path.basename(filePath));
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('public_id', publicId);
  form.append('overwrite', 'true');
  form.append('invalidate', 'true');
  form.append('signature', signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: form,
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status} for ${relPath}: ${errText}`);
  }

  const data = await res.json();
  return {
    relPath,
    publicId: data.public_id,
    bytes: fileBuffer.length,
    secureUrl: data.secure_url,
  };
}

async function main() {
  const files = collectImages(PUBLIC_DIR);
  console.log(`\n🚀 Found ${files.length} images in /public to upload to Cloudinary (${cloudName})...\n`);

  const CONCURRENCY = 5;
  let completed = 0;
  let failed = 0;
  let totalBytes = 0;
  let index = 0;

  async function worker() {
    while (index < files.length) {
      const currentIdx = index++;
      const file = files[currentIdx];
      try {
        const res = await uploadSingleImage(file);
        completed++;
        totalBytes += res.bytes;
        console.log(
          `[${completed + failed}/${files.length}] ✓ ${res.relPath} -> ${res.publicId}`
        );
      } catch (err) {
        failed++;
        console.error(
          `[${completed + failed}/${files.length}] ✗ FAILED: ${err.message}`
        );
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const mb = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`\n============================================================`);
  console.log(`✅ Upload Complete: ${completed}/${files.length} succeeded (${mb} MB processed)`);
  if (failed > 0) {
    console.log(`⚠️  Failed uploads: ${failed}`);
    process.exitCode = 1;
  } else {
    console.log(`🌐 Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${cloudName} to your Vercel Environment Variables and redeploy!`);
  }
  console.log(`============================================================\n`);
}

main();

