import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMessage, addMessageStream, createChatSession, deleteChatSesssion, editChatSessionTitle, getChatSessions, getMessages } from "@/services/dashboard/DijkstraIntelligenceClientService";
import { Message } from "@/types/client/dashboard/dijkstra-gpt";


export function useFetchChatSessions(username: string) {
  return useQuery({
    queryKey: ["conversations", username],
    queryFn: async () => {
        const sessions = await getChatSessions(username);
        if (!sessions) {
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
    mutationFn: () => {
      return createChatSession(username);
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
      for await (const chunk of addMessageStream(
        username,
        sessionId,
        messageContent
      )) {
        fullResponse += chunk;
        console.log("Full response:", fullResponse);
        queryClient.setQueryData(
          ["chat-messages", sessionId],
          (old: Message[] = []) =>
            old.map(msg =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
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
