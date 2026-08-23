import { createHash } from 'crypto';

// ============================================================
// ANTI-FRAUD: Persistent Receipt Storage
// Uses Upstash Redis in production (Vercel) for persistence
// across serverless invocations and deployments.
// Falls back to file-based storage in development.
// ============================================================

interface UsedReceipts {
  hashes: string[];
  fingerprints: string[];
}

// ── Redis-based storage (Production) ───────────────────────
async function getRedisClient() {
  // Only import and initialize if env vars are present
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  const { Redis } = await import('@upstash/redis');
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

async function loadReceiptsRedis(): Promise<UsedReceipts> {
  const redis = await getRedisClient();
  if (!redis) return loadReceiptsFile();

  try {
    const hashes = await redis.smembers('cvpintar:used_hashes') as string[];
    const fingerprints = await redis.smembers('cvpintar:used_fingerprints') as string[];
    return { hashes: hashes || [], fingerprints: fingerprints || [] };
  } catch (e) {
    console.error('Redis load failed, falling back to file:', e);
    return loadReceiptsFile();
  }
}

async function checkHashExists(hash: string): Promise<boolean> {
  const redis = await getRedisClient();
  if (!redis) {
    const receipts = loadReceiptsFile();
    return receipts.hashes.includes(hash);
  }
  try {
    return await redis.sismember('cvpintar:used_hashes', hash) === 1;
  } catch {
    const receipts = loadReceiptsFile();
    return receipts.hashes.includes(hash);
  }
}

async function checkFingerprintExists(fp: string): Promise<boolean> {
  const redis = await getRedisClient();
  if (!redis) {
    const receipts = loadReceiptsFile();
    return receipts.fingerprints.includes(fp);
  }
  try {
    return await redis.sismember('cvpintar:used_fingerprints', fp) === 1;
  } catch {
    const receipts = loadReceiptsFile();
    return receipts.fingerprints.includes(fp);
  }
}

async function saveReceipt(hash: string, fingerprint?: string): Promise<void> {
  const redis = await getRedisClient();
  if (!redis) {
    // Fallback: file-based
    const receipts = loadReceiptsFile();
    receipts.hashes.push(hash);
    if (fingerprint) receipts.fingerprints.push(fingerprint);
    saveReceiptsFile(receipts);
    return;
  }

  try {
    await redis.sadd('cvpintar:used_hashes', hash);
    if (fingerprint) {
      await redis.sadd('cvpintar:used_fingerprints', fingerprint);
    }
  } catch (e) {
    console.error('Redis save failed, falling back to file:', e);
    const receipts = loadReceiptsFile();
    receipts.hashes.push(hash);
    if (fingerprint) receipts.fingerprints.push(fingerprint);
    saveReceiptsFile(receipts);
  }
}

// ── File-based storage (Development fallback) ──────────────
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');
const RECEIPTS_FILE = join(DATA_DIR, 'used-receipts.json');

function loadReceiptsFile(): UsedReceipts {
  try {
    if (existsSync(RECEIPTS_FILE)) {
      const raw = readFileSync(RECEIPTS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load receipts file, creating new one.');
  }
  return { hashes: [], fingerprints: [] };
}

function saveReceiptsFile(data: UsedReceipts) {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }
    writeFileSync(RECEIPTS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save receipts file:', e);
  }
}

export { checkHashExists, checkFingerprintExists, saveReceipt };
