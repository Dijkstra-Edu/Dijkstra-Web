// ============================================
// lib/geminiClient.ts
// ============================================
/**
 * Client library for calling Gemini AI API
 * Provides functions for standard and simulated streaming requests
 */

import { useSettingsStore } from "@/lib/Zustand/settings-store";

// ============================================
// TYPE DEFINITIONS
// ============================================

type GeminiResponse = {
  text?: string;
  error?: string;
  raw?: unknown;
};

// ============================================
// API CLIENT FUNCTIONS
// ============================================

/**
 * Gets Gemini API key from settings store
 * @returns API key or null if not configured
 */
function getGeminiKey(): string | null {
  if (typeof window === "undefined") {
    return process.env.GEMINI_API_KEY ?? null;
  }
  // Get from settings store instead of localStorage directly
  const { geminiKey } = useSettingsStore.getState();
  return geminiKey || null;
}

/**
 * Calls Gemini API via /api/generate and returns the complete response text.
 *
 * Backwards compatible:
 *  - callGemini("hello")
 *  - callGemini("hello", "gemini-2.0-flash-exp")
 *  - callGemini("hello", filePartsArray)   // used by DijkstraGPT for uploads
 *
 * @param prompt - User's input prompt
 * @param modelOrParts - Optional model name OR array of file parts
 */
export async function callGemini(
  prompt: string,
  modelOrParts?: string | any[]
): Promise<string> {
  // Check if API key is configured
  const apiKey = getGeminiKey();
  if (!apiKey) {
    throw new Error(
      "Gemini API key not configured. Please add it in Settings > Developer Settings."
    );
  }

  let model: string | undefined = undefined;
  let parts: any[] | undefined = undefined;

  // If second arg is an array, treat it as parts (for file/image uploads)
  if (Array.isArray(modelOrParts)) {
    // Important: if it's an *empty* array (like checkApiStatus uses),
    // we ignore it so behaviour is exactly like the old version.
    if (modelOrParts.length > 0) {
      parts = modelOrParts;
    }
  } else if (typeof modelOrParts === "string" && modelOrParts.trim().length > 0) {
    // If it's a string, treat it as an explicit model name (old behaviour)
    model = modelOrParts;
  }

  const body: any = { prompt, model };

  // Only send parts when we actually have some (so old calls are unchanged)
  if (parts && parts.length > 0) {
    body.parts = parts;
  }

  // Make POST request to your existing API route
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Gemini-Key": apiKey, // Pass key in header (same as before)
    },
    body: JSON.stringify(body),
  });

  // Parse response JSON safely
  const data: GeminiResponse = await res.json().catch(() => ({}));

  // Handle error responses
  if (!res.ok) {
    throw new Error(data.error ?? "Request failed");
  }

  // Return text if available
  if (typeof data.text === "string" && data.text.length > 0) {
    return data.text;
  }

  // Fallback error message with debug info
  return `<<no text in response; debug=${JSON.stringify(data.raw ?? data)}>>`;
}

/**
 * Calls Gemini API with simulated streaming support
 * Provides progressive text updates via callback
 * (keeps existing behaviour; still goes through /api/generate)
 *
 * @param prompt - User's input prompt
 * @param onChunk - Callback function called with each text chunk
 * @param model - Optional model name
 */
export async function callGeminiStreaming(
  prompt: string,
  onChunk: (chunk: string) => void,
  model?: string
): Promise<void> {
  // Check if API key is configured
  const apiKey = getGeminiKey();
  if (!apiKey) {
    throw new Error(
      "Gemini API key not configured. Please add it in Settings > Developer Settings."
    );
  }

  // Make POST request to API route (same as your original version)
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Gemini-Key": apiKey,
    },
    body: JSON.stringify({ prompt, model }),
  });

  if (!res.ok) {
    const errorData: GeminiResponse = await res.json().catch(() => ({}));
    throw new Error(errorData.error ?? "Request failed");
  }

  const data: GeminiResponse = await res.json().catch(() => ({}));
  const fullText = data.text || "";

  // Simulate streaming by breaking text into word chunks
  const words = fullText.split(" ");
  let currentText = "";

  for (let i = 0; i < words.length; i++) {
    currentText += (i > 0 ? " " : "") + words[i];
    onChunk(currentText);
    await new Promise((resolve) => setTimeout(resolve, 30));
  }
}

/**
 * Example usage:
 *
 * // Standard call
 * const response = await callGemini("What is recursion?");
 * console.log(response);
 *
 * // Streaming call
 * await callGeminiStreaming(
 *   "Explain binary search",
 *   (chunk) => console.log(chunk)
 * );
 */
