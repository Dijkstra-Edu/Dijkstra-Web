// app/api/[...path]/route.ts - Generic API proxy for all backend routes
// Client calls /api/<service>/<path> (e.g. /api/dataforge/Dijkstra/v1/wp/username).
// First segment = service key; route resolves backend base URL and proxies to baseUrl + path.
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'
import {
  getArchivistBaseUrl,
  getDataForgeBaseUrl,
  getGitripperBaseUrl,
  getHeliosBaseUrl,
} from '@/lib/base-urls-keys'

const SERVICE_BASE_URLS: Record<string, () => string> = {
  dataforge: getDataForgeBaseUrl,
  gitripper: getGitripperBaseUrl,
  helios: getHeliosBaseUrl,
  archivist: getArchivistBaseUrl,
}

function getBaseUrlForService(service: string): string | null {
  const getter = SERVICE_BASE_URLS[service]
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

  const baseUrl = getBaseUrlForService(service)
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

  // Return 401 — let the client side handle signOut
  if (res.status === 401) {
    return NextResponse.json({ error: 'Session expired' }, { status: 401 })
  }

  // Guard against non-JSON responses from FastAPI
  const contentType = res.headers.get('content-type')
  const data = contentType?.includes('application/json')
    ? await res.json()
    : await res.text()

  return NextResponse.json(
    typeof data === 'string' ? { message: data } : data,
    { status: res.status }
  )
}

// Next.js 15: params is a Promise
export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyToBackend(req, path)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyToBackend(req, path)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyToBackend(req, path)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyToBackend(req, path)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyToBackend(req, path)
}