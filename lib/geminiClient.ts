// lib/geminiClient.ts
export async function callGemini(prompt: string, model?: string): Promise<string> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as any)?.error ?? "Request failed");
  }

  // server may return { text, debugShape } or { text: null, debugShape: {...} }
  if (typeof (data as any).text === "string" && (data as any).text.length > 0) {
    return (data as any).text;
  }

  // fallback: include debug info if no text found
  return `<<no text in response; debug=${JSON.stringify((data as any).debugShape ?? data)}>>`;
}
