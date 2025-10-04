// app/api/generate/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// --- helper to safely parse ---
type AnyRecord = Record<string, unknown>;
function asRecord(x: unknown): AnyRecord {
  return typeof x === "object" && x !== null ? (x as AnyRecord) : {};
}

function extractTextFromResponse(response: unknown): string | null {
  const r = asRecord(response);

  // v0.2+ returns response.text directly
  if (typeof (r as AnyRecord)["text"] === "string") {
    return r["text"] as string;
  }

  // fallback: check candidates → content → parts
  const candidates = r["candidates"];
  if (Array.isArray(candidates) && candidates.length > 0) {
    const first = asRecord(candidates[0]);
    const content = asRecord(first["content"]);
    const parts = content["parts"];
    if (
      Array.isArray(parts) &&
      parts.length > 0 &&
      typeof (parts[0] as any)?.text === "string"
    ) {
      return (parts[0] as any).text as string;
    }
  }

  return null;
}

// --- POST handler ---
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const bRec = asRecord(body);

    const prompt =
      typeof bRec["prompt"] === "string" ? (bRec["prompt"] as string) : null;
    const model =
      typeof bRec["model"] === "string"
        ? (bRec["model"] as string)
        : "gemini-2.0-flash-exp";

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing or invalid prompt" },
        { status: 400 }
      );
    }

    // ✅ Correct API for @google/genai
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = extractTextFromResponse(response);

    return NextResponse.json({
      text,
      raw: response, // optional, for debugging
    });
  } catch (err: unknown) {
    console.error("Error in /api/generate:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
