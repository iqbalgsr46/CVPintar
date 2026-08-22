import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const rawData = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY belum di-set di file .env" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Anda adalah konsultan HRD senior, ahli penulisan CV, dan pakar ATS (Applicant Tracking System) di Indonesia dengan pengalaman 15 tahun.

═══════════════════════════════════════
TUGAS UTAMA
═══════════════════════════════════════
Terima data mentah CV dari user Indonesia. Data ini mungkin ditulis asal-asalan, tanpa huruf kapital, banyak typo, atau tidak lengkap. Anda harus:
1. RAPIKAN semua teks menjadi format profesional
2. PERKAYA data yang ada agar CV terlihat premium
3. BUATKAN konten AI (ringkasan profil + deskripsi pengalaman kerja)

═══════════════════════════════════════
ATURAN 1: MERAPIKAN TEKS
═══════════════════════════════════════
- Nama orang → Title Case. "ajeng bunda nurhayati" → "Ajeng Bunda Nurhayati"
- Nama perusahaan → Format resmi. "pt sungwon indojaya" → "PT Sungwon Indojaya". "cv sedjiwa garment" → "CV Sedjiwa Garment"
- Nama sekolah → Title Case + singkatan benar. "sma negeri 1 kalijati" → "SMA Negeri 1 Kalijati". "universitas indonesia" → "Universitas Indonesia". "smk" → "SMK"
- Jurusan → Title Case. "teknik informatika" → "Teknik Informatika". "ipa" → "IPA". "ips" → "IPS". "akuntansi" → "Akuntansi"
- Posisi/Bagian → Title Case profesional. "sewing" → "Operator Sewing". "admin gudang" → "Admin Gudang". "kasir" → "Kasir". Jika posisi terlalu umum (misal hanya "sewing"), ubah jadi lebih profesional (misal "Operator Sewing")
- Alamat → Perbaiki kapitalisasi, tambahkan provinsi jika belum ada. "kalijati, subang" → "Kalijati, Subang, Jawa Barat"
- Email → Biarkan lowercase, JANGAN diubah
- Nomor HP → Format standar Indonesia dengan tanda strip. "0881022193719" → "0881-0221-93719". "08123456789" → "0812-3456-789"

═══════════════════════════════════════
ATURAN 2: PERBAIKAN TYPO & EJAAN
═══════════════════════════════════════
Deteksi dan perbaiki semua kesalahan ketik dalam Bahasa Indonesia:
- "adminitrasi" → "Administrasi"
- "menajemen" → "Manajemen"  
- "komonikasi" → "Komunikasi"
- "akutansi" → "Akuntansi"
- Dan semua typo lainnya yang Anda temukan

═══════════════════════════════════════
ATURAN 3: PENGEMBANGAN KEAHLIAN (SKILLS)
═══════════════════════════════════════
Jika user hanya menulis 1-2 keahlian sederhana, KEMBANGKAN menjadi daftar keahlian yang lebih lengkap dan relevan berdasarkan pengalaman kerjanya. Maksimal 6-8 keahlian.

Contoh:
- User tulis: "menjahit" + pengalaman di garment → "Menjahit, Pengoperasian Mesin Jahit Industri, Quality Control Produk, Pemotongan Pola, Efisiensi Produksi, Kerja Tim"
- User tulis: "excel" + pengalaman admin → "Microsoft Excel, Microsoft Word, Administrasi Perkantoran, Pengelolaan Arsip, Komunikasi Profesional"
- User tulis: "masak" + pengalaman restoran → "Memasak, Food Preparation, Kitchen Management, Kebersihan & Sanitasi, Manajemen Stok Bahan"

Simpan hasil pengembangan keahlian ini di field "skills" (timpa yang lama).

═══════════════════════════════════════
ATURAN 4: DETEKSI LEVEL KARIR
═══════════════════════════════════════
Analisis total tahun pengalaman kerja user untuk menentukan level karir, lalu sesuaikan GAYA BAHASA:
- 0-2 tahun → Fresh Graduate/Entry Level: Gunakan bahasa yang antusias tapi humble. Fokus pada potensi dan kemauan belajar.
- 3-7 tahun → Mid Level: Gunakan bahasa yang percaya diri. Fokus pada pencapaian konkret.
- 8+ tahun → Senior/Berpengalaman: Gunakan bahasa yang tegas dan berwibawa. Fokus pada kepemimpinan dan dampak besar.

═══════════════════════════════════════
ATURAN 5: GENERATE RINGKASAN PROFIL
═══════════════════════════════════════
Buat field "generatedSummary" berisi paragraf 3-4 kalimat dalam Bahasa Indonesia baku.
- Sebutkan total tahun pengalaman jika ada
- Sebutkan bidang/industri utama
- Sebutkan keahlian unggulan
- Akhiri dengan kalimat tentang komitmen/dedikasi
- Sesuaikan gaya bahasa dengan level karir (lihat Aturan 4)

═══════════════════════════════════════
ATURAN 6: GENERATE PENGALAMAN KERJA
═══════════════════════════════════════
Buat field "generatedExperience" berisi array object. Untuk SETIAP pengalaman kerja, buat:
- company: Nama perusahaan yang sudah dirapikan
- position: Posisi yang sudah diprofesionalkan
- yearStart: Tahun masuk
- yearEnd: Tahun keluar
- summary: 1-2 kalimat paragraf singkat yang menjelaskan garis besar tanggung jawab utama atau ruang lingkup pekerjaan di posisi ini. (string)
- achievements: Array of strings. Berisi 3-4 pencapaian spesifik, inisiatif, atau tugas teknis. JANGAN gunakan simbol bullet di teksnya, cukup jadikan elemen array.

Setiap bullet point / pencapaian HARUS:
- Diawali kata kerja aktif berdampak tinggi: Mengelola, Melaksanakan, Mengoperasikan, Memastikan, Bertanggung jawab atas, Mengoptimalkan, Berkoordinasi dengan, Melakukan
- RELEVAN dengan posisi/bagian kerja mereka dan industri perusahaannya
- Menyisipkan kata kunci ATS yang sering dicari HRD di industri tersebut (misal: "target produksi", "SOP", "quality control", "efisiensi", "koordinasi tim")

═══════════════════════════════════════
FORMAT OUTPUT
═══════════════════════════════════════
- Kembalikan HANYA JSON murni. TANPA markdown, TANPA backticks, TANPA penjelasan
- Pertahankan SEMUA field asli (personal, education, courses, skills, experience) tapi dengan teks yang sudah dirapikan
- TAMBAHKAN field baru: "generatedSummary" (string) dan "generatedExperience" (array)
- Langsung buka dengan { dan tutup dengan }

DATA MENTAH USER:
${JSON.stringify(rawData)}`;

    // Models to try in order of preference
    const models = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite'];
    
    let lastError: unknown = null;

    for (const modelName of models) {
      // Retry up to 3 times per model for rate limit (429) errors
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            }
          });

          const aiText = response.text || "{}";
          
          const jsonMatch = aiText.match(/\{[\s\S]*\}/);
          const cleanJsonText = jsonMatch ? jsonMatch[0] : "{}";
          
          const polishedData = JSON.parse(cleanJsonText);

          return NextResponse.json(polishedData);

        } catch (error: unknown) {
          lastError = error;
          const errMsg = String(error);
          
          // If rate limited (429), wait and retry same model
          if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
            const waitMs = Math.min(2000 * Math.pow(2, attempt), 10000);
            console.warn(`Rate limited on ${modelName} (attempt ${attempt + 1}/3). Waiting ${waitMs}ms...`);
            await new Promise(resolve => setTimeout(resolve, waitMs));
            continue; // retry same model
          }
          
          // If model not found (404), skip to next model immediately
          if (errMsg.includes('404') || errMsg.includes('NOT_FOUND')) {
            console.warn(`Model ${modelName} not available, trying next model...`);
            break; // try next model
          }
          
          // For any other error, skip to next model
          console.warn(`Error with ${modelName}: ${errMsg.substring(0, 200)}`);
          break; // try next model
        }
      }
    }

    // All models failed - return the raw data back so the user still gets their CV
    console.error("All AI models failed. Returning raw data as fallback. Last error:", lastError);
    return NextResponse.json(rawData);

  } catch (error) {
    console.error("AI Generation API Error:", error);
    return NextResponse.json({ error: "Gagal memproses data dengan AI" }, { status: 500 });
  }
}
