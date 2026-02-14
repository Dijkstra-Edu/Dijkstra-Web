"use client";

import React, { useState, useRef, useEffect } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import {
  FileText,
  X,
  ArrowUp,
  Copy,
  RefreshCw,
  Share2,
  Trash2,
  ChevronLeft,
  Search,
  Check,
  Download,
  Edit3,
  MoreVertical,
  Plus,
  Square,
} from "lucide-react";

// API & helpers
import { callGemini } from "@/lib/geminiClient";
import { toast } from "sonner";
import { uploadFileToSupabase } from "@/lib/storageHelpers";
import { loadChats, saveChat, updateChatMessages, deleteChat } from "@/lib/dbHelpers";
import { useSettingsStore } from "@/lib/Zustand/settings-store";

// ============================================
// TYPES
// ============================================
type MessageFileMeta = {
  name: string;
  url: string;
  size?: number;
  mime?: string;
  base64?: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  files?: File[] | MessageFileMeta[];
};

type ChatSession = {
  id: string;
  session_id?: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

type PreviewFile = {
  src: string;
  name: string;
  mime?: string;
};

// ============================================
// FILE HELPERS
// ============================================
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const base64Data = base64.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const getGeminiMimeType = (file: File): string => {
  const mimeMap: Record<string, string> = {
    "image/jpeg": "image/jpeg",
    "image/jpg": "image/jpeg",
    "image/png": "image/png",
    "image/gif": "image/gif",
    "image/webp": "image/webp",
    "application/pdf": "application/pdf",
    "text/plain": "text/plain",
  };
  return mimeMap[file.type] || file.type;
};

const isImageMeta = (file: any): boolean => {
  const meta = file as MessageFileMeta;
  const mime = meta.mime || "";
  return (
    mime.startsWith("image/") ||
    (meta.name && meta.name.match(/\.(png|jpe?g|gif|webp)$/i) != null)
  );
};

const buildPreviewSrcFromMeta = (meta: MessageFileMeta): string | null => {
  if (meta.url && meta.url.length > 0) return meta.url;
  if (meta.base64) {
    return `data:${meta.mime || "application/octet-stream"};base64,${meta.base64}`;
  }
  return null;
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function DijkstraGPT() {
  // STATE
  const [prompt, setPrompt] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [, setApiStatus] = useState<"checking" | "active" | "inactive">("checking");
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [previewFile, setPreviewFile] = useState<PreviewFile | null>(null);

  // REFS
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const cancelGenerationRef = useRef<boolean>(false);

  const currentSession = chatSessions.find((s) => s.id === currentSessionId);
  const messages = currentSession?.messages || [];
  const hasMessages = messages.length > 0;

  // ============================================
  // UTIL / VALIDATION
  // ============================================
  const validateCredentials = (): boolean => {
    const { geminiKey, supabaseUrl, supabaseKey } = useSettingsStore.getState();
    if (!geminiKey || !supabaseUrl || !supabaseKey) {
      toast.error("Please configure your API credentials in Settings > Developer Settings", {
        duration: 5000,
      });
      return false;
    }
    return true;
  };

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  useEffect(() => {
    if (messagesEndRef.current && hasMessages) {
      let scrollContainer = messagesEndRef.current.closest(".overflow-y-auto");
      if (!scrollContainer) {
        let parent = messagesEndRef.current.parentElement;
        while (parent && parent !== document.body) {
          const style = window.getComputedStyle(parent);
          if (style.overflowY === "auto" || style.overflowY === "scroll") {
            scrollContainer = parent;
            break;
          }
          parent = parent.parentElement;
        }
      }
      const doScroll = () => {
        if (scrollContainer) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        } else {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      };
      setTimeout(doScroll, 80);
    }
  }, [messages, isLoading, hasMessages]);

  useEffect(() => {
    async function init() {
      if (!validateCredentials()) {
        const fallback: ChatSession = {
          id: Date.now().toString(),
          session_id: Date.now().toString(),
          title: "New Chat",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setChatSessions([fallback]);
        setCurrentSessionId(fallback.id);
        return;
      }

      try {
        const chats = await loadChats();
        if (!chats || chats.length === 0) {
          const initial: ChatSession = {
            id: Date.now().toString(),
            session_id: Date.now().toString(),
            title: "New Chat",
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setChatSessions([initial]);
          setCurrentSessionId(initial.id);
          await saveChat({
            id: initial.id,
            session_id: initial.session_id!,
            title: initial.title,
            messages: [],
          });
          return;
        }

        const mapped = chats.map((c: any) => {
          const mappedMessages: Message[] = (c.messages ?? []).map((m: any) => ({
            id: m.id,
            role: m.role,
            content: m.content ?? "",
            timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
            files: m.files ?? undefined,
          }));
          return {
            id: c.id,
            session_id: c.session_id,
            title: c.title,
            messages: mappedMessages,
            createdAt: new Date(c.created_at),
            updatedAt: new Date(c.updated_at),
          } as ChatSession;
        });

        setChatSessions(mapped);
        setCurrentSessionId(mapped[0]?.id ?? null);
      } catch (err) {
        console.error("Failed to load chats:", err);
        toast.error("Failed to load chats. Please check your Supabase credentials.");

        const fallback: ChatSession = {
          id: Date.now().toString(),
          session_id: Date.now().toString(),
          title: "New Chat",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setChatSessions([fallback]);
        setCurrentSessionId(fallback.id);
      }

      void checkApiStatus();
    }

    void init();
  }, []);

  // ============================================
  // SESSION MANAGEMENT
  // ============================================
  const createNewChat = async (): Promise<void> => {
    const s: ChatSession = {
      id: Date.now().toString(),
      session_id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChatSessions((prev) => [s, ...prev]);
    setCurrentSessionId(s.id);
    setPrompt("");
    setUploadedFiles([]);
    cancelGenerationRef.current = false;

    if (!validateCredentials()) return;

    try {
      await saveChat({ id: s.id, session_id: s.session_id!, title: s.title, messages: [] });
    } catch (err) {
      console.error("saveChat failed:", err);
      toast.error("Could not save new chat to DB");
    }
  };

  const updateSessionTitle = async (sessionId: string, firstMessage: string): Promise<void> => {
    const newTitle = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "");
    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId && s.title === "New Chat"
          ? { ...s, title: newTitle, updatedAt: new Date() }
          : s
      )
    );

    const session = chatSessions.find((s) => s.id === sessionId);
    if (session && session.title === "New Chat") {
      try {
        await saveChat({
          id: session.id,
          session_id: session.session_id!,
          title: newTitle,
          messages: session.messages,
        });
      } catch (err) {
        console.error("Failed to update title in DB:", err);
      }
    }
  };

  const deleteSession = async (sessionId: string): Promise<void> => {
    if (!confirm("Are you sure you want to delete this chat?")) return;

    try {
      await deleteChat(sessionId);
      setChatSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (currentSessionId === sessionId) {
        const rest = chatSessions.filter((s) => s.id !== sessionId);
        setCurrentSessionId(rest[0]?.id ?? null);
      }
      toast.success("Chat deleted");
    } catch (err) {
      console.error("deleteChat failed:", err);
      toast.error("Failed to delete chat from DB");
    }
  };

  const downloadSession = (session: ChatSession): void => {
    const lines = session.messages.map((m) => {
      const roleLabel = m.role === "user" ? "User" : "Assistant";
      const time = m.timestamp.toLocaleString();
      const files = (m.files as any[]) || [];
      const fileText =
        files.length > 0
          ? `\nAttachments: ${files
              .map((f: any) => f.name || "")
              .filter(Boolean)
              .join(", ")}`
          : "";
      return `### ${roleLabel} (${time})\n\n${m.content || ""}${fileText}`;
    });

    const md = `# ${session.title}\n\n${lines.join("\n\n---\n\n")}\n`;
    const dataBlob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${session.title.replace(/[^\w\-]+/g, "_") || "chat"}_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Chat downloaded");
  };

  const renameSession = (sessionId: string): void => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (session) {
      setEditingSessionId(sessionId);
      setEditingTitle(session.title);
    }
  };

  const saveRename = async (): Promise<void> => {
    if (!editingSessionId || !editingTitle.trim()) {
      setEditingSessionId(null);
      setEditingTitle("");
      return;
    }

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === editingSessionId
          ? { ...s, title: editingTitle.trim(), updatedAt: new Date() }
          : s
      )
    );

    const chatToSave = chatSessions.find((c) => c.id === editingSessionId);
    try {
      if (chatToSave) {
        await saveChat({
          id: chatToSave.id,
          session_id: chatToSave.session_id!,
          title: editingTitle.trim(),
          messages: chatToSave.messages,
        });
        toast.success("Chat renamed");
      }
    } catch (err) {
      console.error("saveChat (rename) failed:", err);
      toast.error("Failed to rename chat in DB");
    } finally {
      setEditingSessionId(null);
      setEditingTitle("");
    }
  };

  const shareSession = async (sessionId: string): Promise<void> => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (!session) return;

    const shareText = `${session.title}\n\n${session.messages
      .map((m) => `${m.role === "user" ? "You" : "Assistant"}: ${m.content}`)
      .join("\n\n")}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: session.title, text: shareText });
        toast.success("Chat shared");
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("Chat copied to clipboard");
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error);
    }
  };

  // ============================================
  // API STATUS
  // ============================================
  const checkApiStatus = async (): Promise<void> => {
    try {
      const { geminiKey, supabaseUrl, supabaseKey } = useSettingsStore.getState();
      if (!geminiKey || !supabaseUrl || !supabaseKey) {
        setApiStatus("inactive");
        return;
      }

      const response = await callGemini("test", []);
      if (response) setApiStatus("active");
      else setApiStatus("inactive");
    } catch (error) {
      setApiStatus("inactive");
      console.error("API check failed:", error);
    }
  };

  // ============================================
  // FILE HANDLING
  // ============================================
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "text/plain",
    ];

    const validFiles = files.filter((file) => {
      const isValid =
        validTypes.includes(file.type) ||
        file.name.match(/\.(jpg|jpeg|png|gif|webp|pdf|txt)$/i);
      if (!isValid) toast.error(`File type not supported: ${file.name}`);
      return isValid;
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
    if (validFiles.length > 0) toast.success(`${validFiles.length} file(s) added`);
  };

  const removeFile = (index: number): void => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ============================================
  // MESSAGE ACTIONS
  // ============================================
  const copyMessage = async (content: string, messageId: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      toast.success("Copied");
      setTimeout(() => setCopiedMessageId(null), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const updateAssistantContent = (
    sessionId: string | null,
    messageId: string,
    newContent: string
  ) => {
    if (!sessionId) return;
    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              messages: session.messages.map((m) =>
                m.id === messageId ? { ...m, content: newContent } : m
              ),
              updatedAt: new Date(),
            }
          : session
      )
    );
  };

  const addMessage = async (message: Message): Promise<MessageFileMeta[] | undefined> => {
    let filesToSave: MessageFileMeta[] | undefined;

    if (message.files && message.files.length > 0 && (message.files as any)[0] instanceof File) {
      filesToSave = [];
      for (const f of message.files as File[]) {
        let base64Data: string | undefined;
        let publicUrl = "";

        try {
          base64Data = await fileToBase64(f);
        } catch (err) {
          console.error("Base64 conversion failed:", err);
          toast.error(`Failed to read ${f.name}`);
        }

        try {
          const uploaded = await uploadFileToSupabase(f);
          if (uploaded && typeof uploaded.publicUrl === "string") {
            publicUrl = uploaded.publicUrl;
          }
        } catch (err) {
          console.error("Supabase upload failed:", err);
        }

        if (base64Data) {
          filesToSave.push({
            name: f.name,
            url: publicUrl,
            size: f.size,
            mime: f.type || getGeminiMimeType(f),
            base64: base64Data,
          });
        }
      }
    } else if (message.files) {
      filesToSave = message.files as MessageFileMeta[];
    }

    const msgToSave: Message = {
      ...message,
      files: filesToSave,
      timestamp: message.timestamp ?? new Date(),
    };

    let newMessagesForDb: Message[] | null = null;

    setChatSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentSessionId) {
          const updatedMessages = [...s.messages, msgToSave];
          newMessagesForDb = updatedMessages;
          return { ...s, messages: updatedMessages, updatedAt: new Date() };
        }
        return s;
      })
    );

    if (currentSessionId && newMessagesForDb) {
      try {
        await updateChatMessages(currentSessionId, newMessagesForDb);
      } catch (err) {
        console.error("updateChatMessages failed:", err);
      }
    }

    return filesToSave;
  };

  // ============================================
  // STREAMING
  // ============================================
  const streamGeminiResponse = async (
    promptText: string,
    sessionId: string,
    assistantMessageId: string,
    files?: MessageFileMeta[]
  ) => {
    try {
      const fileParts =
        files && files.length > 0
          ? files.map((file) => ({
              inlineData: {
                mimeType: file.mime || "image/jpeg",
                data: file.base64 || "",
              },
            }))
          : [];

      const res: any = await callGemini(promptText, fileParts);

      const handleStreaming = async (full: string) => {
        let i = 0;
        while (i <= full.length) {
          if (cancelGenerationRef.current) {
            const partial = full.slice(0, i) || "⚠ Generation stopped by user.";
            updateAssistantContent(sessionId, assistantMessageId, partial);
            await saveStreamedMessage(sessionId, assistantMessageId, partial);
            return partial;
          }
          await new Promise((r) => setTimeout(r, 14));
          i += Math.ceil(Math.random() * 3);
          updateAssistantContent(sessionId, assistantMessageId, full.slice(0, i));
        }
        updateAssistantContent(sessionId, assistantMessageId, full);
        await saveStreamedMessage(sessionId, assistantMessageId, full);
        return full;
      };

      if (typeof res === "string") return await handleStreaming(res);
      if (res && typeof res === "object" && typeof (res as any).text === "string") {
        return await handleStreaming((res as any).text);
      }

      const fallback = String(res);
      updateAssistantContent(sessionId, assistantMessageId, fallback);
      await saveStreamedMessage(sessionId, assistantMessageId, fallback);
      return fallback;
    } catch (error) {
      if (cancelGenerationRef.current) {
        updateAssistantContent(sessionId, assistantMessageId, "⚠ Generation stopped by user.");
        return;
      }
      const errStr = "⚠ Error: " + String(error);
      updateAssistantContent(sessionId, assistantMessageId, errStr);
      throw error;
    }
  };

  const saveStreamedMessage = async (
    sessionId: string,
    messageId: string,
    content: string
  ): Promise<void> => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (!session) return;
    const updatedMessages = session.messages.map((m) =>
      m.id === messageId ? { ...m, content } : m
    );
    try {
      await updateChatMessages(sessionId, updatedMessages);
    } catch (err) {
      console.error("Failed to save streamed message to DB:", err);
    }
  };

  // ============================================
  // REGENERATE
  // ============================================
  const handleRegenerate = async (assistantMessageId: string): Promise<void> => {
    const session = chatSessions.find((s) => s.id === currentSessionId);
    if (!session) return;
    const idx = session.messages.findIndex((m) => m.id === assistantMessageId);
    if (idx <= 0) return;

    const userMsg = session.messages[idx - 1];
    if (!userMsg || userMsg.role !== "user") return;

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? { ...s, messages: s.messages.filter((m) => m.id !== assistantMessageId) }
          : s
      )
    );

    const updatedMessages = session.messages.filter((m) => m.id !== assistantMessageId);
    try {
      await updateChatMessages(currentSessionId!, updatedMessages);
    } catch (err) {
      console.error("Failed to update DB after regenerate:", err);
    }

    cancelGenerationRef.current = false;
    setIsLoading(true);

    const newAssistantMessage: Message = {
      id: (Date.now() + 2).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? { ...s, messages: [...s.messages, newAssistantMessage], updatedAt: new Date() }
          : s
      )
    );

    try {
      const userFiles = userMsg.files as MessageFileMeta[] | undefined;
      await streamGeminiResponse(
        userMsg.content || "Please analyze the attached file.",
        currentSessionId!,
        newAssistantMessage.id,
        userFiles
      );
      toast.success("Response regenerated");
    } catch (error) {
      if (!cancelGenerationRef.current) {
        toast.error("Failed to regenerate: " + String(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const shareMessage = async (content: string): Promise<void> => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "DijkstraGPT Message", text: content });
        toast.success("Shared");
      } else {
        await navigator.clipboard.writeText(content);
        toast.success("Copied (share not available)");
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error);
    }
  };

  // ============================================
  // INPUT HANDLERS
  // ============================================
  const handleSubmit = async (): Promise<void> => {
    if (!prompt.trim() && uploadedFiles.length === 0) return;
    if (!validateCredentials()) return;

    cancelGenerationRef.current = false;

    if (!currentSessionId) await createNewChat();

    const currentPrompt = prompt;
    const currentFiles = [...uploadedFiles];

    const hasText = currentPrompt.trim().length > 0;
    const effectivePrompt = hasText
      ? currentPrompt
      : "Please analyze the attached file(s) and give me a helpful response.";

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentPrompt,
      timestamp: new Date(),
      files: currentFiles.length > 0 ? currentFiles : undefined,
    };

    const processedFiles = await addMessage(userMessage);

    setPrompt("");
    setUploadedFiles([]);
    setIsLoading(true);

    if (currentSession && currentSession.messages.length === 0) {
      const titleSource = hasText ? currentPrompt : currentFiles[0]?.name || effectivePrompt;
      await updateSessionTitle(currentSessionId!, titleSource);
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? { ...s, messages: [...s.messages, assistantMessage], updatedAt: new Date() }
          : s
      )
    );

    try {
      await streamGeminiResponse(
        effectivePrompt,
        currentSessionId!,
        assistantMessage.id,
        processedFiles
      );
    } catch (error) {
      if (!cancelGenerationRef.current) {
        const errorMessage: Message = {
          id: (Date.now() + 3).toString(),
          role: "assistant",
          content: "⚠ Error: " + String(error),
          timestamp: new Date(),
        };
        updateAssistantContent(currentSessionId, assistantMessage.id, errorMessage.content);
        await saveStreamedMessage(currentSessionId!, assistantMessage.id, errorMessage.content);
        toast.error("Failed to get response");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  const handleStopGeneration = () => {
    if (!isLoading) return;
    cancelGenerationRef.current = true;
    setIsLoading(false);
    toast.info("Generation stopped");
  };

  // ============================================
  // SEARCH
  // ============================================
  const filteredSessions = chatSessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.messages.some((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // ============================================
  // MESSAGE RENDER
  // ============================================
  const renderFilePreview = (file: any, idx: number) => {
    const meta = file as MessageFileMeta;
    const mime = meta.mime || "";
    const isImage =
      mime.startsWith("image/") ||
      (meta.name && meta.name.match(/\.(png|jpe?g|gif|webp)$/i) != null);

    const src = buildPreviewSrcFromMeta(meta);

    const openPreview = () => {
      if (!src) return;
      setPreviewFile({
        src,
        name: meta.name || "File",
        mime: mime || undefined,
      });
    };

    if (isImage && src) {
      return (
        <button
          type="button"
          key={idx}
          onClick={openPreview}
          className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-muted/40 hover:brightness-105 transition"
        >
          <img src={src} alt={meta.name || "Image"} className="w-full h-full object-cover" />
        </button>
      );
    }

    return (
      <button
        type="button"
        key={idx}
        onClick={openPreview}
        className="flex items-center gap-2 px-3 py-1.5 bg-muted/60 rounded-full text-xs hover:bg-muted/80 transition"
      >
        <FileText className="h-3 w-3" />
        <span className="truncate max-w-[150px]">{meta.name}</span>
      </button>
    );
  };

  const renderMessage = (msg: Message, i: number): JSX.Element => {
    const isUser = msg.role === "user";
    const isCopied = copiedMessageId === msg.id;
    const isLastMessage = i === messages.length - 1;
    const isStreamingAssistant = !isUser && isLastMessage && isLoading;

    const hasFiles = msg.files && (msg.files as any).length > 0;
    const filesArray = (msg.files as any[]) || [];

    const allImagesOnly =
      hasFiles &&
      filesArray.length > 0 &&
      filesArray.every((f) => isImageMeta(f)) &&
      (msg.content || "").trim().length === 0;

    const contentToRender = msg.content || "";

    const displayContent =
      isStreamingAssistant && !contentToRender.trim().length
        ? "_DijkstraGPT is thinking..._"
        : contentToRender;

    if (allImagesOnly) {
      return (
        <div
          key={msg.id}
          className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
        >
          <div className="max-w-[80%] space-y-2">
            <div className="flex flex-wrap gap-2">
              {filesArray.map((file, idx) => renderFilePreview(file, idx))}
            </div>
            <p className="text-xs text-muted-foreground">
              {msg.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        key={msg.id}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
      >
        <div className="max-w-[80%] space-y-2">
          {hasFiles && (
            <div className="flex flex-wrap gap-2">
              {filesArray.map((file, idx) => renderFilePreview(file, idx))}
            </div>
          )}

          {displayContent.trim().length > 0 && (
            <div
              className={`prose prose-sm dark:prose-invert max-w-none ${
                isUser ? "text-right" : "text-left"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || "");
  if (!inline) {
    return (
      <pre
        className="code-scroll mt-2 mb-4 rounded-xl bg-muted border border-border/40 px-4 py-3 overflow-x-auto overflow-y-hidden text-sm"
      >
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    );
  }
  return (
    <code
      className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono"
      {...props}
    >
      {children}
    </code>
  );
}
,
                }}
              >
                {displayContent}
              </ReactMarkdown>
            </div>
          )}

          {!isStreamingAssistant && (
            <div
              className={`flex items-center gap-2 text-xs text-muted-foreground ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <span>{msg.timestamp.toLocaleTimeString()}</span>

              {!isUser && (
                <>
                  <span className="mx-1 text-muted-foreground/40">•</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyMessage(msg.content, msg.id)}
                      className="h-6 w-6 p-0"
                      aria-label="Copy message"
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRegenerate(msg.id)}
                      className="h-6 w-6 p-0"
                      aria-label="Regenerate response"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => shareMessage(msg.content)}
                      className="h-6 w-6 p-0"
                      aria-label="Share message"
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================
  // EXAMPLE PROMPTS
  // ============================================
  const examplePrompts = [
    "I'm lost. How do I get started with coding to get a job in tech?",
    "What are the steps I can take to become a Computer Science Engineer?",
    "How do I approach a coding interview?",
    "What are some good resources for learning algorithms?",
    "How can I leverage AI in my coding projects?",
    "How do I improve my resume for tech jobs?",
  ];

  // ============================================
  // INPUT AREA (ChatGPT-style)
  // ============================================
  const renderInputArea = (isCentered: boolean = false) => (
    <div className="relative max-w-4xl mx-auto w-full transition-all duration-500 ease-in-out">
      <div className="relative bg-background/95 rounded-3xl overflow-hidden">
        <div className="px-4 pt-3 pb-2">
          {uploadedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => {
                const isImageFile =
                  (file.type && file.type.startsWith("image/")) ||
                  file.name.match(/\.(png|jpe?g|gif|webp)$/i);

                const objectUrl =
                  typeof window !== "undefined" ? URL.createObjectURL(file) : "";

                if (isImageFile) {
                  return (
                    <button
                      type="button"
                      key={`img-${index}`}
                      onClick={() =>
                        objectUrl &&
                        setPreviewFile({
                          src: objectUrl,
                          name: file.name,
                          mime: file.type || "image/*",
                        })
                      }
                      className="relative h-16 w-20 rounded-2xl overflow-hidden bg-muted/40 hover:brightness-105 transition"
                    >
                      <img
                        src={objectUrl}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(uploadedFiles.indexOf(file));
                        }}
                        className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/70 text-white flex items-center justify-center"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </button>
                  );
                }

                return (
                  <div
                    key={`file-${index}`}
                    className="flex items-center gap-2 px-3 py-1.5 bg-muted/60 rounded-2xl text-xs"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        objectUrl &&
                        setPreviewFile({
                          src: objectUrl,
                          name: file.name,
                          mime: file.type || "application/octet-stream",
                        })
                      }
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-3 w-3" />
                      <div className="flex flex-col items-start">
                        <span className="truncate max-w-[160px] font-medium">
                          {file.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {file.type.split("/")[1] || "FILE"}
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(uploadedFiles.indexOf(file))}
                      className="h-4 w-4 rounded-full hover:bg-destructive/10 flex items-center justify-center"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isCentered
                ? "Describe what you want to build..."
                : "Ask me anything about CS, algorithms, or coding interviews..."
            }
            className="min-h-[64px] max-h-[260px] resize-none border-0 bg-transparent px-0 py-3 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ height: "auto" }}
            disabled={isLoading}
            aria-label="Message input"
          />
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-background/95">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 w-8 p-0 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition"
              aria-label="Attach files"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* ChatGPT-style: same round button, icon changes; white circle with black icon */}
          <Button
            type="button"
            onClick={isLoading ? handleStopGeneration : handleSubmit}
            disabled={!isLoading && !prompt.trim() && uploadedFiles.length === 0}
            className="h-9 w-9 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
            aria-label={isLoading ? "Stop generating" : "Send message"}
          >
            {isLoading ? <Square className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isCentered && (
        <div className="text-center mt-3">
          <p className="text-xs text-muted-foreground/80">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-muted/80 border border-border/50 rounded text-xs font-mono">
              ⌘ Enter
            </kbd>{" "}
            to send
          </p>
        </div>
      )}
    </div>
  );

  // ============================================
  // LAYOUT
  // ============================================
  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20 flex flex-col w-full h-full">
      <div className="flex-1 flex min-h-0">
        {/* MAIN CHAT AREA */}
        <div
          className={`flex-1 flex flex-col relative min-h-0 transition-[margin-right] duration-400 ease-in-out ${
            isSidebarOpen ? "mr-[280px]" : "mr-0"
          }`}
        >
          {!hasMessages && !isLoading ? (
            <>
              <div className="flex-shrink-0 text-center pt-4 pb-8">
                <div className="flex flex-col items-center space-y-2 my-8">
                  <img src="/icon.png" alt="Dijkstra GPT logo" className="h-30 w-30" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    Your Personal CS Prep Assistant
                  </h2>
                  <p className="text-muted-foreground text-center max-w-3xl">
                    This model has been trained on a wide range of computer science topics, tips
                    and tricks, resources, and more to help you on your journey towards becoming a
                    Computer Science Engineer. It is also context aware of what you do within
                    GitHub and Leetcode. Happy coding :)
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center px-4 pb-8">
                <div className="w-full max-w-4xl mx-auto space-y-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-lg font-semibold text-foreground/90 mb-2">
                        Get started with these examples
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Click any prompt to try it out
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {examplePrompts.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(example)}
                          className="group p-4 text-left bg-background border border-border/40 rounded-2xl hover:border-border hover:shadow-md hover:shadow-black/5 transition-all duration-200 hover:-translate-y-0.5"
                          aria-label={`Use example prompt: ${example}`}
                        >
                          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground leading-relaxed">
                            {example}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 min-h-0 p-6">
              <div className="max-w-4xl mx-auto h-full overflow-y-auto pr-1">
                {messages.map((m, i) => renderMessage(m, i))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input area with blur at the bottom (no border line) */}
          {hasMessages ? (
            <div className="flex-shrink-0 sticky bottom-0 p-6 z-10 bg-gradient-to-t from-background/95 via-background/85 to-transparent backdrop-blur-xl transition-all duration-400 ease-in-out">
              <div className="w-full max-w-4xl mx-auto">{renderInputArea(false)}</div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center px-4 pb-8">
              <div className="w-full max-w-4xl mx-auto">
                <div className="relative">{renderInputArea(true)}</div>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR (slide in/out) */}
        <div
          className={`fixed right-0 top-14 bottom-0 w-[310px] flex flex-col border-l border-border bg-background/95 backdrop-blur-md z-40 transform transition-transform duration-400 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-3 border-b border-border">
            <Button
              onClick={createNewChat}
              className="w-full justify-center rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm font-medium"
            >
              New Chat
            </Button>
          </div>

          <div className="px-3 py-2">
            <div className="relative h-9">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full h-full pl-10 pr-3 text-sm bg-secondary text-foreground border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 pb-8">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                    currentSessionId === session.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50 text-foreground"
                  }`}
                  onClick={() => setCurrentSessionId(session.id)}
                >
                  <div className="flex items-center gap-1 min-w-0">
                    {editingSessionId === session.id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={saveRename}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveRename();
                          if (e.key === "Escape") {
                            setEditingSessionId(null);
                            setEditingTitle("");
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                        className="flex-1 text-sm bg-background border border-border/50 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-sm truncate max-w-[150px]">{session.title}</p>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          renameSession(session.id);
                        }}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          shareSession(session.id);
                        }}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadSession(session);
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-700 hover:bg-red-600/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* SIDEBAR TOGGLE */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-20 z-50 bg-background shadow-lg hover:shadow-xl border border-border/50 transition-all duration-400 ease-in-out ${
          isSidebarOpen ? "right-[320px]" : "right-4"
        }`}
        aria-label={isSidebarOpen ? "Close chat history" : "Open chat history"}
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-400 ease-in-out ${
            isSidebarOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileUpload}
        accept=".txt,.pdf,.doc,.docx,.md,.json,.csv,.xlsx,.jpg,.jpeg,.png,image/*,application/pdf"
        aria-label="File upload input"
      />

      {/* INLINE PREVIEW OVERLAY (images + PDFs) */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <button
            type="button"
            onClick={() => setPreviewFile(null)}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black/90 transition"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>

          {previewFile.mime?.startsWith("image/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewFile.src}
              alt={previewFile.name}
              className="max-w-[90vw] max-h-[90vh] rounded-xl"
            />
          ) : (
            <iframe
              src={previewFile.src}
              title={previewFile.name}
              className="w-[85vw] h-[85vh] rounded-xl bg-background"
            />
          )}
        </div>
      )}
    </div>
  );
}
