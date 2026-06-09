import { Conversation } from "@/types/server/dijkstra-intelligence/Conversation";
import { apiCall, apiCallStream } from "../CoreApiService";
import { MessageDto } from "@/types/server/dijkstra-intelligence/Message";
import { Message } from "@/types/client/dashboard/dijkstra-gpt";

export async function getChatSessions(
  username: string
): Promise<Conversation[]> {
  const path = `ai/conversation/list/${encodeURIComponent(username)}`;
  console.log("Fetching chat sessions for user:", path);
  const raw = await apiCall<Conversation[]>("dijkstra-intelligence", path);
  return raw;
}

export async function getMessages(
  sessionId: string
): Promise<Message[]> {
  const path = `ai/chat/${encodeURIComponent(sessionId)}/history`;
  console.log("Fetching messages for session:", path);
  const raw = await apiCall<MessageDto[]>("dijkstra-intelligence", path);
  return raw.map(mapMessageDtoToMessage);
}

function mapMessageDtoToMessage(messageDto: MessageDto): Message {
    return {
        id: messageDto.id,
        role: messageDto.role === "human" ? "user" : "assistant",
        sessionId: messageDto.conversation_id,
        timestamp: new Date(messageDto.created_at),
        content: messageDto.content,
        files: [] // Assuming files are not currently returned by the API, this can be updated when that functionality is added
    }
}

export async function createChatSession(
  username: string
): Promise<Conversation> {
  const path = `ai/conversation/`;
  console.log("Creating new chat session:", path);
  const raw = await apiCall<Conversation>("dijkstra-intelligence", path, { method: "POST",    
     body: JSON.stringify({"user_id": username}) });
  return raw;
}

export async function addMessage(
  username: string,
  sessionId: string,
  messageContent: string
): Promise<Message> {
  const path = `ai/chat`;
  console.log("Adding message:", path);
  const raw = await apiCall<MessageDto>("dijkstra-intelligence", path, { 
     method: "POST",    
     body: JSON.stringify({"user_id": username, "conversation_id": sessionId, "message": messageContent}) });
  return mapMessageDtoToMessage(raw);
}


export async function* addMessageStream(
  username: string,
  sessionId: string,
  messageContent: string
): AsyncGenerator<string> {
  yield* apiCallStream(
    "dijkstra-intelligence",
    "ai/chat/streaming",
    {
      method: "POST",
      body: JSON.stringify({
        user_id: username,
        conversation_id: sessionId,
        message: messageContent,
      }),
    }
  );
}


export async function editChatSessionTitle(
  sessionId: string,
  title: string
): Promise<Conversation> {
  const path = `ai/conversation/${encodeURIComponent(sessionId)}`;

  return await apiCall<Conversation>(
    "dijkstra-intelligence",
    path,
    {
      method: "PUT",
      body: JSON.stringify({
        title,
      }),
    }
  );
}
    
export async function deleteChatSesssion(
  sessionId: string,
): Promise<Conversation> {
  const path = `ai/conversation/${encodeURIComponent(sessionId)}`;
  console.log("Deleting chat session:", path);
  return await apiCall<Conversation>("dijkstra-intelligence", path, { method: "DELETE"});
}

    