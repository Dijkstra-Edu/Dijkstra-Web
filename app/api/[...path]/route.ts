// app/api/[...path]/route.ts - Generic API proxy for backend and external services
// Internal: /api/<service>/<path> → proxyToBackend (dataforge, gitripper, helios, archivist).
// External: /api/<service>/<path> → handleExternalService (configured in lib/api/external-services.ts).
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { getExternalServiceConfig, isExternalServiceKey } from '@/lib/api/external-services-config'

function getBaseUrlForInternalService(): string | null {
  return process.env['NEXT_PUBLIC_HODOR_URL']?.replace(/\/+$/, '') || null
}

async function proxyToBackend(req: NextRequest, path: string){
  const res = await proxyToBackendAndGetResp(req, path);
  if (res.status === 401) {
    return NextResponse.json({ error: 'Session expired' }, { status: 401 })
  }

  const contentType = res.headers.get('content-type')
  const data = contentType?.includes('application/json')
    ? await res.json()
    : await res.text()

  return NextResponse.json(
    typeof data === 'string' ? { message: data } : data,
    { status: res.status }
  )
}

async function proxyToBackendAndGetResp( req: NextRequest, path: string) {
  const session = await auth.api.getSession({
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const baseUrl = getBaseUrlForInternalService();
  const backendPath = path.replace(/^\/+|\/+$/g, "");
  const url = new URL(backendPath, `${baseUrl}/`);
  url.search = new URL(req.url).search;
  return await fetch(url.toString(), {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      sessionId: session.session.id,
      "X-Internal-Secret": process.env.INTERNAL_API_SECRET!,
    },
    body:
      req.method !== "GET" && req.method !== "DELETE"
        ? await req.text()
        : undefined,
    cache: "no-store",
  });
}

export async function proxyToBackendStream(
  req: NextRequest,
  path: string
): Promise<Response> {
  const backendRes = await proxyToBackendAndGetResp(req, path);

  if (backendRes.status === 401) {
    return NextResponse.json(
      { error: "Session expired" },
      { status: 401 }
    );
  }

  const headers = new Headers();

  // Forward important headers
  for (const [key, value] of backendRes.headers.entries()) {
    headers.set(key, value);
  }

  // Helpful for SSE / LLM streaming
  headers.set("Cache-Control", "no-cache");

  return new Response(backendRes.body, {
    status: backendRes.status,
    statusText: backendRes.statusText,
    headers,
  });
}

/** Handle external services via config (lib/api/external-services.ts). Does not use proxyToBackend or session. */
async function handleExternalService(req: NextRequest, path: string): Promise<NextResponse> {
  const [service, ...segments] = path.split('/')
  if (!service || segments.length === 0) {
    return NextResponse.json(
      { error: 'Path must be <service>/<path> (e.g. logo-dev/search)' },
      { status: 400 }
    )
  }

  const config = getExternalServiceConfig(service)
  if (!config) {
    return NextResponse.json(
      { error: `Unknown external service: ${service}` },
      { status: 400 }
    )
  }

  if (config.validate) {
    try {
      config.validate()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Configuration error'
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  const baseUrl = config.getBaseUrl()
  const backendPath = segments.join('/')
  const url = new URL(backendPath, baseUrl + '/')
  url.search = new URL(req.url).search

  const headers: Record<string, string> = {
    ...(config.getHeaders?.(req) ?? {}),
  }

  const res = await fetch(url.toString(), {
    method: req.method,
    headers: Object.keys(headers).length ? headers : undefined,
    body: req.method !== 'GET' && req.method !== 'DELETE' ? await req.text() : undefined,
    cache: 'no-store',
    ...(config.revalidate != null && { next: { revalidate: config.revalidate } }),
  })

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: 'Upstream error', details: text }, { status: res.status })
  }

  const contentType = res.headers.get('content-type')
  const isJson = contentType?.includes('application/json')
  const data = isJson ? await res.json() : await res.text()

  return NextResponse.json(data, { status: res.status })
}

function isExternalService(path: string[]): boolean {
  return path.length > 0 && isExternalServiceKey(path[0])
}

async function buildPathAndForwardRequest(req: NextRequest,  { params }: { params: Promise<{ path: string[] }> }){
   const { path } = await params;

  // Extract query params
  const searchParams = req.nextUrl.searchParams;

  // Rebuild query string
  const queryString = searchParams.toString();

  // Append query string to path if present
  const fullPath =
    queryString.length > 0
      ? `${path.join("/")}?${queryString}`
      : path.join("/");

  if (isExternalService(path)) {
    return handleExternalService(req, fullPath);
  }
  console.log("PATH:"+path)
  if(path.some(p => p.includes("stream"))){
    console.log("HERE")
    return proxyToBackendStream(req, fullPath);
  }

  return proxyToBackend(req, fullPath);
}
// Next.js 15: params is a Promise
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return buildPathAndForwardRequest(req, { params })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
   return buildPathAndForwardRequest(req, { params })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
   return buildPathAndForwardRequest(req, { params })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
   return buildPathAndForwardRequest(req, { params })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
   return buildPathAndForwardRequest(req, { params })
}