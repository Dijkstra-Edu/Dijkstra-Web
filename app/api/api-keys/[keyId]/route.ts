import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getDataForgeBaseUrl } from "@/server/dataforge/client";
import { getEncodedJWT } from "@/lib/api/jwt-utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || getDataForgeBaseUrl();

/**
 * GET /api/api-keys/[keyId] - Get a specific API key
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { keyId: string } }
) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { keyId } = params;
    const encodedToken = await getEncodedJWT(req);
    if (!encodedToken) {
      return NextResponse.json({ error: "Failed to generate authentication token" }, { status: 401 });
    }

    const response = await fetch(
      `${API_BASE_URL}/Dijkstra/v1/api-keys/${encodeURIComponent(keyId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${encodedToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to fetch API key", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching API key:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/api-keys/[keyId] - Update an API key
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { keyId: string } }
) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { keyId } = params;
    const body = await req.json();
    const encodedToken = await getEncodedJWT(req);
    if (!encodedToken) {
      return NextResponse.json({ error: "Failed to generate authentication token" }, { status: 401 });
    }

    const response = await fetch(
      `${API_BASE_URL}/Dijkstra/v1/api-keys/${encodeURIComponent(keyId)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${encodedToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to update API key", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating API key:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/api-keys/[keyId] - Revoke an API key
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { keyId: string } }
) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { keyId } = params;
    const encodedToken = await getEncodedJWT(req);
    if (!encodedToken) {
      return NextResponse.json({ error: "Failed to generate authentication token" }, { status: 401 });
    }

    const response = await fetch(
      `${API_BASE_URL}/Dijkstra/v1/api-keys/${encodeURIComponent(keyId)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${encodedToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to revoke API key", details: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error revoking API key:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

