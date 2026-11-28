# คู่มือการติดตั้งและ Deploy บน Cloudflare Workers (ไม่ต้องใช้ Google Cloud Billing)

แอปพลิเคชันนี้พร้อมสำหรับ Deploy แบบ Full-Stack บน **Cloudflare Workers + Static Assets** โดยใช้ทรัพยากรใน **Free Plan** ของ Cloudflare และใช้ `GEMINI_API_KEY` จาก Google AI Studio (Free Tier) ฝั่ง Server เท่านั้น ไม่เปิดเผยคีย์ในฝั่ง Frontend

---

## โครงสร้างที่เตรียมไว้สำหรับ Cloudflare Workers

- `worker/index.ts` — Cloudflare Worker Entry Point จัดการ API Endpoint ทั้งหมดฝั่ง Server (`/api/health`, `/api/gemini/suggest-cbe-questions`, `/api/gemini/generate-cbe-exam-set`, `/api/story/generate`) และส่งคำขอหน้าเว็บ/ไฟล์ Static ไปยัง `env.ASSETS` (SPA Fallback)
- `server/geminiBackend.ts` — โค้ดประมวลผล `@google/genai` ฝั่ง Server ที่ใช้ร่วมกันระหว่าง Node/Express (`server.ts`) และ Cloudflare Workers (`worker/index.ts`)
- `wrangler.toml` — ไฟล์ตั้งค่า Wrangler, `nodejs_compat`, และ `[assets]` (`run_worker_first = ["/api/*"]`, `not_found_handling = "single-page-application"`)
- `public/_headers` — กำหนด Security Headers, `Permissions-Policy: camera=(self), microphone=(self)` สำหรับการใช้งานกล้อง/ไมโครโฟนบนมือถือ และ Cache Headers สำหรับ PWA
- `.dev.vars.example` — ตัวอย่างไฟล์ Secret สำหรับรันทดสอบบนเครื่องด้วย `wrangler dev`

---

## ขั้นตอนที่ 1: เตรียมเครื่องมือและ Secret Key (ฟรี 100% ไม่ต้องผูกบัตร GCP Billing)

1. สมัครบัญชี Cloudflare ฟรีที่ [dash.cloudflare.com](https://dash.cloudflare.com)
2. รับ `GEMINI_API_KEY` ฟรีจาก [Google AI Studio](https://aistudio.google.com/apikey) (Free Tier ไม่ต้องเปิด Google Cloud Billing)
3. ติดตั้ง Dependencies บนเครื่อง (หากยังไม่ได้ติดตั้ง):
   ```bash
   npm install
   ```
4. เข้าสู่ระบบ Wrangler CLI ด้วยบัญชี Cloudflare:
   ```bash
   npx wrangler login
   ```

---

## ขั้นตอนที่ 2: ทดสอบรันบนเครื่องแบบ Cloudflare Workers (Local Preview)

1. คัดลอกไฟล์ตัวอย่าง Secret:
   ```bash
   cp .dev.vars.example .dev.vars
   ```
2. เปิดไฟล์ `.dev.vars` แล้วใส่ `GEMINI_API_KEY` ของคุณ:
   ```env
   GEMINI_API_KEY="AIza..."
   ```
   *(ไฟล์ `.dev.vars` ถูกตั้งค่าไว้ใน `.gitignore` แล้ว จะไม่ถูกอัปโหลดขึ้น Git)*
3. Build Frontend และรัน Worker จำลอง:
   ```bash
   npm run build && npm run cf:dev
   ```
4. ตรวจสอบ Health Check ที่ `http://localhost:8787/api/health` จะต้องแสดง `"runtime": "cloudflare-workers"` และ `"hasGeminiKey": true`

---

## ขั้นตอนที่ 3: ตั้งค่า Secret และ Deploy ขึ้น Cloudflare Workers จริง

1. บันทึก `GEMINI_API_KEY` เป็น Server-Side Secret บน Cloudflare (เข้ารหัสฝั่ง Server เท่านั้น):
   ```bash
   npx wrangler secret put GEMINI_API_KEY
   ```
   *(วาง API Key เมื่อระบบถาม แล้วกด Enter)*

2. Build และ Deploy:
   ```bash
   npm run cf:deploy
   ```
   *(หรือรันคำสั่งเต็ม: `npm run build && npx wrangler deploy`)*

3. หลัง Deploy เสร็จสิ้น Wrangler จะแสดง URL ของคุณ เช่น `https://anubalkids.<your-subdomain>.workers.dev`
   - Cloudflare Workers ให้ **HTTPS อัตโนมัติ** ทำให้ฟีเจอร์บนมือถือ เช่น **กล้องตรวจจับมือ (MediaPipe)**, **ไมโครโฟนฝึกออกเสียง (Voice Phonics)** และ **ติดตั้งเป็นแอป PWA** ทำงานได้ทันทีบน iOS Safari และ Android Chrome

---

## กรณี Deploy ผ่าน GitHub (Cloudflare Workers Builds)

หากเชื่อมต่อ Cloudflare Workers กับ GitHub Repository ให้ตั้งค่าใน **Settings -> Builds -> Build configuration** ดังนี้:

- **Build command**: `npm run build` *(หรือ `bun run build`)*
- **Deploy command**: `npx wrangler deploy` *(หรือ `npm run cf:deploy`)*
- **Root directory**: `/`
- **Variables and secrets**: เพิ่ม `GEMINI_API_KEY` แบบ **Secret** *(ตรวจสอบให้แน่ใจว่าได้ commit ไฟล์ `bun.lock` และ `package-lock.json` ล่าสุดขึ้น GitHub ด้วย เพื่อไม่ให้ `bun install --frozen-lockfile` แจ้ง error)*
- **ชื่อ Worker ใน `wrangler.toml`**: ตั้งเป็น `name = "anubalkids"` ให้ตรงกับโปรเจกต์บน Cloudflare

---

## หมายเหตุเพิ่มเติม (Firebase / Custom Model)

- **Firebase Auth (กรณีใช้ปุ่มผู้ดูแลระบบ Google Login)**: หลังได้ URL `*.workers.dev` หรือโดเมนจริงแล้ว ให้เพิ่มโดเมนนั้นใน Firebase Console -> Authentication -> Settings -> **Authorized domains** (ส่วน Firestore และข้อมูลโปรไฟล์ผู้เรียนทำงานได้ทันที และมีโหมดออฟไลน์ในเครื่องรองรับ)
- **เปลี่ยนรุ่นโมเดล Gemini (ทางเลือก)**: ค่าเริ่มต้นคือ `gemini-4-hydrogen` หากต้องการเปลี่ยนรุ่นโมเดลใน Cloudflare สามารถเพิ่ม `[vars]` ใน `wrangler.toml` เช่น `GEMINI_MODEL = "gemini-3.1-flash-lite"` ได้ทันทีโดยไม่ต้องแก้ไขโค้ด
