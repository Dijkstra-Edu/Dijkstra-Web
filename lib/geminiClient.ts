// lib/geminiClient.ts
/**
 * Client library for calling Gemini AI API
 * Provides functions for standard and streaming requests
 */

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
 * Calls Gemini API and returns the complete response
 * @param prompt - User's input prompt
 * @param model - Optional model name (defaults to gemini-2.0-flash-exp)
 * @returns Promise resolving to generated text
 * @throws Error if request fails
 */
export async function callGemini(
  prompt: string, 
  model?: string
): Promise<string> {
  // Make POST request to API route
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
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
 * @param prompt - User's input prompt
 * @param onChunk - Callback function called with each text chunk
 * @param model - Optional model name
 * @returns Promise that resolves when streaming completes
 * @throws Error if request fails
 */
export async function callGeminiStreaming(
  prompt: string,
  onChunk: (chunk: string) => void,
  model?: string
): Promise<void> {
  // Make POST request to API route
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
  });

  // Handle error responses
  if (!res.ok) {
    const errorData: GeminiResponse = await res.json().catch(() => ({}));
    throw new Error(errorData.error ?? "Request failed");
  }

  // Parse complete response
  const data: GeminiResponse = await res.json();
  const fullText = data.text || "";

  // Simulate streaming by breaking text into word chunks
  // This creates a typing effect for better user experience
  const words = fullText.split(" ");
  let currentText = "";

  for (let i = 0; i < words.length; i++) {
    // Add word with space (except first word)
    currentText += (i > 0 ? " " : "") + words[i];
    
    // Call callback with updated text
    onChunk(currentText);
    
    // Small delay between words for typing effect
    // Adjust delay value (in ms) to control typing speed
    await new Promise(resolve => setTimeout(resolve, 30));
  }
}