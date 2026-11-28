import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  handleGenerateCbeExamSet,
  handleGenerateStory,
  handleSuggestCbeQuestions,
} from './server/geminiBackend';

dotenv.config();
// Disable HMR in AI Studio iframe environment to prevent WebSocket disconnection errors
process.env.DISABLE_HMR = 'true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Health check endpoint (never exposes secrets)
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    runtime: 'node-express',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// API Endpoint: Suggest CBE Competency Evaluation Questions
app.post('/api/gemini/suggest-cbe-questions', async (req: Request, res: Response) => {
  const result = await handleSuggestCbeQuestions(
    (req.body || {}) as Record<string, unknown>,
    process.env.GEMINI_API_KEY || '',
    process.env.GEMINI_MODEL
  );
  return res.status(result.status).json(result.body);
});

// API Endpoint: Generate Comprehensive CBE Exam Set (6 Core Competencies)
app.post('/api/gemini/generate-cbe-exam-set', async (req: Request, res: Response) => {
  const result = await handleGenerateCbeExamSet(
    (req.body || {}) as Record<string, unknown>,
    process.env.GEMINI_API_KEY || '',
    process.env.GEMINI_MODEL
  );
  return res.status(result.status).json(result.body);
});

// API Endpoint: Generate Curriculum-Aware Pre-Game AI Story
app.post('/api/story/generate', async (req: Request, res: Response) => {
  const result = await handleGenerateStory(
    (req.body || {}) as Record<string, unknown>,
    process.env.GEMINI_API_KEY || '',
    process.env.GEMINI_MODEL
  );
  return res.status(result.status).json(result.body);
});

// Setup Vite Dev Server middlewares or static serving for production
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });

    // Quiet Vite client for AI Studio iframe preview environment (prevents WebSocket errors & [vite] console logs)
    app.get('/@vite/client', (_req, res) => {
      res.type('application/javascript');
      res.send(`
        const sheetsMap = new Map();
        export function updateStyle(id, content) {
          let style = sheetsMap.get(id);
          if (!style) {
            style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('data-vite-dev-id', id);
            document.head.appendChild(style);
            sheetsMap.set(id, style);
          }
          style.textContent = content;
        }
        export function removeStyle(id) {
          const style = sheetsMap.get(id);
          if (style) {
            document.head.removeChild(style);
            sheetsMap.delete(id);
          }
        }
        export function injectQuery(url, queryToInject) {
          return url + (url.indexOf('?') === -1 ? '?' : '&') + queryToInject;
        }
        export const createHotContext = (_ownerPath) => ({
          data: {},
          accept: () => {},
          acceptExports: () => {},
          prune: () => {},
          dispose: () => {},
          decline: () => {},
          invalidate: () => {},
          on: () => {},
          send: () => {},
        });
        export class ErrorOverlay extends HTMLElement {}
        export default {
          updateStyle,
          removeStyle,
          injectQuery,
          createHotContext,
          ErrorOverlay,
        };
      `);
    });

    app.use(vite.middlewares);
  } else {
    // Serve static files from dist or build directory in production
    const staticDir = fs.existsSync(path.join(__dirname, 'dist'))
      ? path.join(__dirname, 'dist')
      : path.join(__dirname, 'build');
    app.use(express.static(staticDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(staticDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduGame Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
