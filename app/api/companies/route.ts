import { NextResponse } from "next/server"
import { API_URLS } from "@/constants/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim()

  if (!query) {
    // No query, return empty list to keep UX simple
    return NextResponse.json([])
  }

  const apiKey = process.env.GODEV_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Missing LOGODEV_API_KEY" }, { status: 500 })
  }

  try {
    const response = await fetch(API_URLS.logoDevSearch(query), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      // Cache a bit on the server to reduce upstream calls (safe for search)
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      const text = await response.text()
      return NextResponse.json({ error: "Upstream error", details: text }, { status: response.status })
    }

    const data = await response.json()
    const companies = Array.isArray(data)
      ? data.map((company: any) => ({ name: company.name, domain: company.domain, logo_url: company.logo_url }))
      : []

    return NextResponse.json(companies)
  } catch (error: any) {
    return NextResponse.json({ error: "Request failed", message: error?.message ?? String(error) }, { status: 502 })
  }
}
