import {
  handleGenerateCbeExamSet,
  handleGenerateStory,
  handleSuggestCbeQuestions,
} from '../server/geminiBackend';

export interface Env {
  ASSETS: Fetcher;
  GEMINI_API_KEY: string;
  GEMINI_MODEL?: string;
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...CORS_HEADERS,
    },
  });
}

async function parseJsonBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const raw = await request.json();
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      return raw as Record<string, unknown>;
    }
    return {};
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // Handle CORS preflight on API routes
    if (pathname.startsWith('/api/') && request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Health check endpoint (never exposes secrets)
    if (pathname === '/api/health' && request.method === 'GET') {
      return jsonResponse({
        status: 'ok',
        runtime: 'cloudflare-workers',
        hasGeminiKey: Boolean(env.GEMINI_API_KEY),
        timestamp: new Date().toISOString(),
      });
    }

    // Server-side Gemini endpoints
    if (pathname === '/api/gemini/suggest-cbe-questions' && request.method === 'POST') {
      const body = await parseJsonBody(request);
      if (!body) {
        return jsonResponse({ error: 'Invalid JSON request body.' }, 400);
      }
      const result = await handleSuggestCbeQuestions(
        body,
        env.GEMINI_API_KEY || '',
        env.GEMINI_MODEL
      );
      return jsonResponse(result.body, result.status);
    }

    if (pathname === '/api/gemini/generate-cbe-exam-set' && request.method === 'POST') {
      const body = await parseJsonBody(request);
      if (!body) {
        return jsonResponse({ error: 'Invalid JSON request body.' }, 400);
      }
      const result = await handleGenerateCbeExamSet(
        body,
        env.GEMINI_API_KEY || '',
        env.GEMINI_MODEL
      );
      return jsonResponse(result.body, result.status);
    }

    if (pathname === '/api/story/generate' && request.method === 'POST') {
      const body = await parseJsonBody(request);
      if (!body) {
        return jsonResponse({ error: 'Invalid JSON request body.' }, 400);
      }
      const result = await handleGenerateStory(
        body,
        env.GEMINI_API_KEY || '',
        env.GEMINI_MODEL
      );
      return jsonResponse(result.body, result.status);
    }

    // Return 404 JSON for unknown /api/* routes instead of SPA HTML fallback
    if (pathname.startsWith('/api/')) {
      return jsonResponse({ error: 'API endpoint not found' }, 404);
    }

    // Serve Vite SPA static assets via Cloudflare Workers Assets binding
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Static assets binding (ASSETS) not configured.', { status: 500 });
  },
};
