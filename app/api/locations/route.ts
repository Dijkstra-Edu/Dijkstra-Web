import { NextResponse } from "next/server"
import { API_URLS } from "@/constants/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim()

  if (!query) {
    // No query, return empty list to keep UX simple
    return NextResponse.json([])
  }

  try {
    const response = await fetch(API_URLS.nominatimSearch(query), {
      headers: {
        "User-Agent": "Dijkstra-Web/1.0",
      },
      // Cache a bit on the server to reduce upstream calls (safe for search)
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      const text = await response.text()
      return NextResponse.json({ error: "Upstream error", details: text }, { status: response.status })
    }

    const data = await response.json()
    const locations = Array.isArray(data)
      ? data.map((location: any) => {
          const address = location.address || {}
          
          // Extract city from various possible fields
          const city = address.city || address.town || address.village || address.hamlet || ""
          
          // Extract state (optional)
          const state = address.state || address.province || address.county || undefined
          
          // Extract country
          const country = address.country || ""
          
          // Convert coordinates to numbers
          const latitude = location.lat ? parseFloat(location.lat) : undefined
          const longitude = location.lon ? parseFloat(location.lon) : undefined

          return {
            city,
            state,
            country,
            latitude,
            longitude,
          }
        })
      : []

    return NextResponse.json(locations)
  } catch (error: any) {
    return NextResponse.json({ error: "Request failed", message: error?.message ?? String(error) }, { status: 502 })
  }
}
