// ============================================
//lib/storageHelpers.ts
// ============================================
import { getSupabaseClient } from "./supabaseClient";

/**
 * uploadFileToSupabase(file, folder)
 * Uploads a browser File to the 'uploads' bucket and returns { path, publicUrl }.
 *
 * Notes:
 * - Assumes you created a bucket named 'uploads' (public or private).
 * - For private buckets use createSignedUrl instead of getPublicUrl.
 */
export async function uploadFileToSupabase(file: File, folder = "chat_uploads") {
  try {
    const supabase = getSupabaseClient();
    const timestamp = Date.now();
    const safeName = file.name.replace(/\s+/g, "_");
    const filePath = `${folder}/${timestamp}_${safeName}`;

    const { data, error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      throw uploadError;
    }

    // If the bucket is public, getPublicUrl will return usable URL
    const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(data.path);

    return {
      path: data.path,
      publicUrl: urlData.publicUrl,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * getPublicUrlForPath(path)
 * Returns a public url for a stored path (works if bucket is public).
 */
export function getPublicUrlForPath(path: string) {
  try {
    const supabase = getSupabaseClient();
    const { data } = supabase.storage.from("uploads").getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error("Error getting public URL:", error);
    throw error;
  }
}