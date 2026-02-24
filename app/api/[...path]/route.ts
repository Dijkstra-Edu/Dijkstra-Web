// app/api/[...path]/route.ts - Generic API proxy for backend and external services
// Internal: /api/<service>/<path> → proxyToBackend (dataforge, gitripper, helios, archivist).
// External: /api/<service>/<path> → handleExternalService (configured in lib/api/external-services.ts).
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'
import {
  getArchivistBaseUrl,
  getDataForgeBaseUrl,
  getGitripperBaseUrl,
  getHeliosBaseUrl,
} from '@/lib/base-urls-keys'
import { getExternalServiceConfig, isExternalServiceKey } from '@/lib/api/external-services-config'

const INTERNAL_SERVICE_BASE_URLS: Record<string, () => string> = {
  dataforge: getDataForgeBaseUrl,
  gitripper: getGitripperBaseUrl,
  helios: getHeliosBaseUrl,
  archivist: getArchivistBaseUrl,
}

function getBaseUrlForInternalService(service: string): string | null {
  const getter = INTERNAL_SERVICE_BASE_URLS[service]
  if (!getter) return null
  try {
    return getter().replace(/\/+$/, '')
  } catch {
    return null
  }
}

async function proxyToBackend(req: NextRequest, path: string[]) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.access_token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [service, ...backendPathSegments] = path
  if (!service || backendPathSegments.length === 0) {
    return NextResponse.json(
      { error: 'Path must be <service>/<backend-path> (e.g. dataforge/Dijkstra/v1/wp/username)' },
      { status: 400 }
    )
  }

  const baseUrl = getBaseUrlForInternalService(service)
  if (!baseUrl) {
    return NextResponse.json(
      { error: `Unknown or unconfigured service: ${service}` },
      { status: 400 }
    )
  }

  const backendPath = backendPathSegments.join('/')
  const url = new URL(backendPath, baseUrl + '/')
  url.search = new URL(req.url).search

  const res = await fetch(url.toString(), {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.access_token}`,
      'X-Internal-Secret': process.env.INTERNAL_API_SECRET!,
    },
    body: req.method !== 'GET' && req.method !== 'DELETE'
      ? await req.text()
      : undefined,
    cache: 'no-store',
  })

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

/** Handle external services via config (lib/api/external-services.ts). Does not use proxyToBackend or session. */
async function handleExternalService(req: NextRequest, path: string[]): Promise<NextResponse> {
  const [service, ...segments] = path
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

// Next.js 15: params is a Promise
export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  if (isExternalService(path)) {
    return handleExternalService(req, path)
  }
  return proxyToBackend(req, path)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  if (isExternalService(path)) {
    return handleExternalService(req, path)
  }
  return proxyToBackend(req, path)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  if (isExternalService(path)) {
    return handleExternalService(req, path)
  }
  return proxyToBackend(req, path)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  if (isExternalService(path)) {
    return handleExternalService(req, path)
  }
  return proxyToBackend(req, path)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  if (isExternalService(path)) {
    return handleExternalService(req, path)
  }
  return proxyToBackend(req, path)
}