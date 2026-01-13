// app/api/generate/route.ts
/**
 * API Route for Gemini AI Generation
 * Handles POST requests to generate AI responses
 */

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// ============================================
// TYPE DEFINITIONS
// ============================================

type AnyRecord = Record<string, unknown>;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Safely converts unknown value to a record object
 * @param x - Value to convert
 * @returns Record object or empty object
 */
function asRecord(x: unknown): AnyRecord {
  return typeof x === "object" && x !== null ? (x as AnyRecord) : {};
}

/**
 * Extracts text content from Gemini API response
 * Handles multiple response formats for compatibility
 * @param response - Raw response from Gemini API
 * @returns Extracted text or null
 */
function extractTextFromResponse(response: unknown): string | null {
  const r = asRecord(response);

  // v0.2+ returns response.text directly
  if (typeof r["text"] === "string") {
    return r["text"];
  }

  // Fallback: check candidates → content → parts structure
  const candidates = r["candidates"];
  if (Array.isArray(candidates) && candidates.length > 0) {
    const first = asRecord(candidates[0]);
    const content = asRecord(first["content"]);
    const parts = content["parts"];
    
    if (Array.isArray(parts) && parts.length > 0) {
      const firstPart = asRecord(parts[0]);
      if (typeof firstPart["text"] === "string") {
        return firstPart["text"];
      }
    }
  }

  return null;
}

// ============================================
// POST HANDLER
// ============================================

/**
 * Handles POST requests to generate AI responses
 * @param request - Next.js request object
 * @returns JSON response with generated text or error
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse request body safely
    const body = await request.json().catch(() => ({}));
    const bRec = asRecord(body);

    // Extract prompt and model from request
    const prompt = typeof bRec["prompt"] === "string" ? bRec["prompt"] : null;
    const model = typeof bRec["model"] === "string" 
      ? bRec["model"] 
      : "gemini-2.0-flash-lite-preview";

    // Validate prompt
    if (!prompt) {
      return NextResponse.json(
        { error: "Missing or invalid prompt" },
        { status: 400 }
      );
    }

    // Call Gemini API with correct format
    const response = await ai.models.generateContent({
      model,
      contents: [{ 
        role: "user", 
        parts: [{ text: prompt }] 
      }],
    });

    // Extract text from response
    const text = extractTextFromResponse(response);

    // Return successful response
    return NextResponse.json({
      text,
      raw: response, // Include for debugging (optional)
    });
    
  } catch (err: unknown) {
    // Log error for debugging
    console.error("Error in /api/generate:", err);
    
    // Extract error message safely
    const message = err instanceof Error ? err.message : String(err);
    
    // Return error response
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}