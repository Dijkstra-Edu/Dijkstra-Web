import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim()

  if (!q) {
    // No query, return empty list to keep UX simple
    return NextResponse.json([])
  }

  const apiKey = process.env.LOGODEV_API_KEY || process.env.NEXT_PUBLIC_LOGODEV_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Missing LOGODEV_API_KEY" }, { status: 500 })
  }

  try {
    const res = await fetch(`https://api.logo.dev/search?q=${encodeURIComponent(q)}` , {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      // Cache a bit on the server to reduce upstream calls (safe for search)
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: "Upstream error", details: text }, { status: res.status })
    }

    const data = await res.json()
    const companies = Array.isArray(data)
      ? data.map((c: any) => ({ name: c.name, domain: c.domain, logo_url: c.logo_url }))
      : []

    return NextResponse.json(companies)
  } catch (err: any) {
    return NextResponse.json({ error: "Request failed", message: err?.message ?? String(err) }, { status: 502 })
  }
}
