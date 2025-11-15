import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getDataForgeBaseUrl } from "@/server/dataforge/client";
import { getEncodedJWT } from "@/lib/api/jwt-utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || getDataForgeBaseUrl();

/**
 * GET /api/api-keys - List all API keys
 */
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get encoded JWT token to send to backend
    const encodedToken = await getEncodedJWT(req);
    if (!encodedToken) {
      return NextResponse.json({ error: "Failed to generate authentication token" }, { status: 401 });
    }

    const response = await fetch(`${API_BASE_URL}/Dijkstra/v1/api-keys/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${encodedToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to fetch API keys", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/api-keys - Create a new API key
 */
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const encodedToken = await getEncodedJWT(req);
    if (!encodedToken) {
      return NextResponse.json({ error: "Failed to generate authentication token" }, { status: 401 });
    }

    const response = await fetch(`${API_BASE_URL}/Dijkstra/v1/api-keys/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${encodedToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to create API key", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating API key:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

