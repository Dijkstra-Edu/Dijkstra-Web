// ============================================
// lib/supabaseClient.ts
// ============================================
import { createClient } from "@supabase/supabase-js";
import { useSettingsStore } from "@/lib/Zustand/settings-store";

let supabaseClient: any = null;
let currentUrl: string = "";
let currentKey: string = "";

/**
 * Gets or creates Supabase client using credentials from settings store
 * Creates new client if credentials change
 */
export function getSupabaseClient() {
  // For server-side (fallback to env vars)
  if (typeof window === "undefined") {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createClient(url, key);
  }

  // Get credentials from settings store
  const { supabaseUrl, supabaseKey } = useSettingsStore.getState();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase credentials not configured. Please add them in Settings > Developer Settings."
    );
  }

  // Create new client if credentials changed or client doesn't exist
  if (
    !supabaseClient ||
    currentUrl !== supabaseUrl ||
    currentKey !== supabaseKey
  ) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    currentUrl = supabaseUrl;
    currentKey = supabaseKey;
  }

  return supabaseClient;
}

// Named export 'supabase' for backward compatibility
// This will use the dynamic client
export const supabase = new Proxy({} as any, {
  get(target, prop) {
    const client = getSupabaseClient();
    return client[prop];
  }
});

/**
 * Reset client when credentials change (call this from settings if needed)
 */
export function resetSupabaseClient() {
  supabaseClient = null;
  currentUrl = "";
  currentKey = "";
}