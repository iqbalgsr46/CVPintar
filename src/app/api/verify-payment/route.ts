import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createHash } from 'crypto';
import { createPaymentToken } from '@/lib/payment-token';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export const maxDuration = 30;

// ============================================================
// ANTI-FRAUD: File-based persistent storage
// Data survives server restarts & hot reloads
// ============================================================

const DATA_DIR = join(process.cwd(), 'data');
const RECEIPTS_FILE = join(DATA_DIR, 'used-receipts.json');

interface UsedReceipts {
  hashes: string[];       // SHA-256 of uploaded images
  fingerprints: string[]; // AI-extracted receipt fingerprints
}

function loadReceipts(): UsedReceipts {
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

function saveReceipts(data: UsedReceipts) {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }
    writeFileSync(RECEIPTS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save receipts file:', e);
  }
}

const models = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ isValid: false, reason: 'Tidak ada gambar yang diunggah.' }, { status: 400 });
    }

    const buffer = await image.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);
    const base64Image = nodeBuffer.toString('base64');
    const mimeType = image.type;

    // Load persistent data
    const receipts = loadReceipts();

    // ── LAYER 1: Exact image hash ───────────────────────────
    const imageHash = createHash('sha256').update(nodeBuffer).digest('hex');

    if (receipts.hashes.includes(imageHash)) {
      return NextResponse.json({
        isValid: false,
        reason: 'Gambar ini sudah pernah digunakan. Silakan lakukan pembayaran baru dan upload bukti transfer yang baru.'
      });
    }

    // ── AI Verification ─────────────────────────────────────
    // ── TIMEZONE FIX: Force WIB (UTC+7) ──────────────────────
    // Vercel servers run in UTC. Indonesian users are in WIB (UTC+7).
    // At midnight WIB boundary, UTC is still the previous day.
    // We generate today AND yesterday dates (WIB) so transfers
    // made near midnight are never falsely rejected.
    const wibOptions: Intl.DateTimeFormatOptions & { timeZone: string } = { timeZone: 'Asia/Jakarta' };
    
    const todayWIB = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const yesterdayWIB = new Date(todayWIB);
    yesterdayWIB.setDate(yesterdayWIB.getDate() - 1);

    const formatDate = (d: Date) => ({
      long: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', ...wibOptions }),
      short: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric', ...wibOptions }),
      short2: d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', ...wibOptions }),
    });

    const todayFmt = formatDate(todayWIB);
    const yesterdayFmt = formatDate(yesterdayWIB);

    const allowedDates = [
      todayFmt.long, todayFmt.short, todayFmt.short2,
      yesterdayFmt.long, yesterdayFmt.short, yesterdayFmt.short2,
      'Hari ini',
    ].join(', ');

    const prompt = `
      Anda adalah sistem keamanan (Security & Fraud Detection) untuk verifikasi pembayaran otomatis.
      Tugas Anda adalah memeriksa screenshot bukti transfer e-wallet/M-Banking ini (khususnya DANA, GoPay, OVO, BCA, dll).
      Anda harus SANGAT KETAT dan TIDAK BISA DIBOHONGI.

      ATURAN VALIDASI MUTLAK (Semua harus terpenuhi):
      1. STATUS BERHASIL: Harus ada indikasi "Berhasil", "Success", atau "Sukses".
      2. NOMINAL TEPAT: HARUS tepat Rp 10.000.
      3. TOKO TUJUAN: Penerima berhubungan dengan "DevTech AI Store" atau "DevTech" (opsional).
      4. TANGGAL: Tanggal transaksi harus salah satu dari: ${allowedDates}. TOLAK struk yang lebih dari 1 hari yang lalu.
      5. KEASLIAN: BUKAN gambar editan, generator struk palsu, atau cropping mencurigakan.

      WAJIB EKSTRAK SIDIK JARI STRUK:
      Cari SEMUA teks unik: nomor referensi, jam:menit, nama pengirim, nama penerima, kode unik apapun.
      Gabungkan menjadi satu string pendek.

      OUTPUT (JSON MURNI TANPA MARKDOWN):
      {
        "isValid": boolean,
        "fingerprint": "gabungan semua info unik, contoh: '14:32|DANA|Budi|DevTech|REF123'. Tulis 'NONE' jika tidak ada.",
        "reason": "alasan jika invalid, kosong jika valid"
      }
    `;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    let responseText = '';
    let success = false;

    for (const modelName of models) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            prompt,
            { inlineData: { data: base64Image, mimeType } }
          ]
        });
        responseText = response.text || '';
        success = true;
        break;
      } catch (err) {
        console.warn(`Model ${modelName} failed, trying next...`);
      }
    }

    if (!success) {
      throw new Error('Semua model AI gagal memproses gambar');
    }

    let cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedJson);

    // ── LAYER 3: AI fingerprint duplicate check ─────────────
    if (parsed.isValid) {
      const fp = (parsed.fingerprint || '').trim().toUpperCase();

      if (fp && fp !== 'NONE' && fp.length > 5) {
        const normalizedFP = fp.replace(/[\s\-\/\.]/g, '');

        if (receipts.fingerprints.includes(normalizedFP)) {
          return NextResponse.json({
            isValid: false,
            reason: 'Struk ini sudah pernah digunakan. Setiap bukti transfer hanya bisa dipakai satu kali.'
          });
        }
        receipts.fingerprints.push(normalizedFP);
      }

      // All layers passed — persist to disk
      receipts.hashes.push(imageHash);
      saveReceipts(receipts);

      // Create signed payment token and set HTTP-only cookie
      const token = createPaymentToken(imageHash);
      const res = NextResponse.json(parsed);
      res.cookies.set('cvpintar_token', token, {
        httpOnly: true,      // Cannot be read by JavaScript (DevTools useless)
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      });
      return res;
    }

    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error('Payment Verification Error:', error);
    return NextResponse.json(
      { isValid: false, reason: 'Terjadi kesalahan sistem saat memverifikasi. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
