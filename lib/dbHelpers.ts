// ============================================
//lib/dbHelpers.ts
// ============================================
import { getSupabaseClient } from "./supabaseClient";

export async function loadChats() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("Error loading chats:", error);
    throw error;
  }
}

export async function saveChat(chat: {
  id: string;
  session_id: string;
  title: string;
  messages: any[];
  created_at?: string | Date;
  updated_at?: string | Date;
}) {
  try {
    const supabase = getSupabaseClient();
    const payload = {
      id: chat.id,
      session_id: chat.session_id,
      title: chat.title,
      messages: chat.messages,
      created_at: chat.created_at ?? new Date().toISOString(),
      updated_at: chat.updated_at ?? new Date().toISOString(),
    };

    const { error } = await supabase.from("chats").upsert(payload);
    if (error) throw error;
  } catch (error) {
    console.error("Error saving chat:", error);
    throw error;
  }
}

export async function updateChatMessages(chatId: string, messages: any[]) {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("chats")
      .update({
        messages,
        updated_at: new Date().toISOString(),
      })
      .eq("id", chatId);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating chat messages:", error);
    throw error;
  }
}

export async function deleteChat(chatId: string) {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("chats").delete().eq("id", chatId);
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
}
