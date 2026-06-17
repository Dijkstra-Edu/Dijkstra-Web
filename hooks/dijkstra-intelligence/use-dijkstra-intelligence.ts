import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMessage, addMessageStream, createChatSession, deleteChatSesssion, editChatSessionTitle, getChatSessions, getMessages } from "@/services/dashboard/DijkstraIntelligenceClientService";
import { Message } from "@/types/client/dashboard/dijkstra-gpt";


export function useFetchChatSessions(username: string) {
  return useQuery({
    queryKey: ["conversations", username],
    queryFn: async () => {
        const sessions = await getChatSessions(username);
        console.log("Number of sessions:"+sessions.length)
        if (!sessions || sessions.length == 0) {
            return [await createChatSession(username)];
        }
        return sessions;
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFetchMessagesForChat(sessionId: string) {
  return useQuery({
    queryKey: ["chat-messages", sessionId],
    queryFn: async () => {
        const messages = await getMessages(sessionId);
        return messages;
    },
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5,
  });
}


export function useCreateChatSession(username: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({setCurrentSessionId} : {setCurrentSessionId: React.Dispatch<React.SetStateAction<string | undefined>> }) => {

      const newChatSession =  await createChatSession(username);
      setCurrentSessionId(newChatSession['id'])
      return newChatSession
  },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['conversations', username] 
      });
    },
  });
}

export function useAddMessageStream(username: string) {
  const queryClient = useQueryClient();

  const sendMessageStreaming = async (
    sessionId: string,
    messageContent: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date(),
      files: [],
      sessionId,
    };

    const assistantMessageId = `assistant-${Date.now()}`;

    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      files: [],
      sessionId,
    };

    queryClient.setQueryData(
      ["chat-messages", sessionId],
      (old: Message[] = []) => [
        ...old,
        userMessage,
        assistantMessage,
      ]
    );

    let fullResponse = "";

    try {
      let read_message_id = false
      let true_assistant_message_id: string;
      for await (var chunk of addMessageStream(
        username,
        sessionId,
        messageContent
      )) {
        if (!read_message_id) {
          const match = chunk.match(/^message_id:([^\n]+)\n/);
         if (match) {
            const messageId = match[1];
            chunk = chunk.slice(match[0].length);

            console.log(messageId);
            console.log(chunk);
            true_assistant_message_id = messageId;
            read_message_id = true;
          }
        }
        fullResponse += chunk;
        queryClient.setQueryData(
          ["chat-messages", sessionId],
          (old: Message[] = []) =>
            old.map(msg =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    id: true_assistant_message_id,
                    content: fullResponse,
                  }
                : msg
            )
        );
      }
      setIsLoading(false);
    } catch (error) {
      queryClient.setQueryData(
        ["chat-messages", sessionId],
        (old: Message[] = []) =>
          old.filter(msg => msg.id !== assistantMessageId)
      );
      setIsLoading(false);
      throw error;
    }
  };

  return { sendMessageStreaming };
}

export function useEditChatSessionTitle(username: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({sessionId, title} : { sessionId: string; title: string }) => {
      return editChatSessionTitle(sessionId, title);
  },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['conversations', username]  // Maybe not the most efficient way to do this but it works for now, ideally we would just update the title in the cache without refetching all conversations
      });
    },
  });
}

export function useDeleteChatSession(username: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({sessionId} : { sessionId: string }) => {
      return deleteChatSesssion(sessionId);
  },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['conversations', username]  // Maybe not the most efficient way to do this but it works for now, ideally we would just update the title in the cache without refetching all conversations
      });
    },
  });
}
