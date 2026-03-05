"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";

// UI Components from shadcn/ui library
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Markdown rendering
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Icon library (removed voice & enhance icons)
import {
  Paperclip,
  Image,
  FileText,
  X,
  ArrowUp,
  Copy,
  RefreshCw,
  Share2,
  MessageSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  Check,
  Download,
  Edit3,
  MoreVertical,
  Pause,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// API client for Gemini AI communication
import { callGemini } from "@/lib/geminiClient";

// Toast notification system
import { toast } from "sonner";

// ============================================
// TYPE DEFINITIONS
// ============================================

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  files?: File[];
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function DijkstraGPT() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const [prompt, setPrompt] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'active' | 'inactive'>('checking');
  const [hasMessages, setHasMessages] = useState<boolean>(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");

  // ============================================
  // REFS FOR DOM ELEMENTS
  // ============================================

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // cancel flag for streaming
  const cancelGenerationRef = useRef<boolean>(false);
  

  // ============================================
  // COMPUTED VALUES
  // ============================================

  const currentSession = chatSessions.find((session) => session.id === currentSessionId);
  const messages = currentSession?.messages || [];

  // ============================================
  // EFFECTS
  // ============================================

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && hasMessages) {
      let scrollContainer = messagesEndRef.current.closest('.overflow-y-auto');
      if (!scrollContainer) {
        let parent = messagesEndRef.current.parentElement;
        while (parent && parent !== document.body) {
          const style = window.getComputedStyle(parent);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            scrollContainer = parent;
            break;
          }
          parent = parent.parentElement;
        }
      }
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer?.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      } else {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [messages, isLoading, hasMessages]);

  // Track if there are messages to determine layout state
  // Note: hasMessages is set immediately on submit, so we only update if it's false and messages exist
  useEffect(() => {
    if (!hasMessages && messages.length > 0) {
      setHasMessages(true);
    }
  }, [messages, hasMessages]);

  // Initialize with a default session on mount
  useEffect(() => {
    const initialSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChatSessions([initialSession]);
    setCurrentSessionId(initialSession.id);
  }, []);  

  // ============================================
  // SESSION MANAGEMENT FUNCTIONS
  // ============================================

  const createNewChat = (): void => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChatSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setPrompt("");
    setUploadedFiles([]);
    setIsLoading(false);
    cancelGenerationRef.current = false;
    toast.success("New chat created");
  };

  const updateSessionTitle = (sessionId: string, firstMessage: string): void => {
    setChatSessions((prev) =>
      prev.map((session) => {
        if (session.id === sessionId && session.title === "New Chat") {
          return {
            ...session,
            title: firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : ""),
            updatedAt: new Date(),
          };
        }
        return session;
      })
    );
  };

  // Check API status on mount
  useEffect(() => {
    checkApiStatus();
  }, []);

  const deleteSession = (sessionId: string): void => {
    if (!confirm("Are you sure you want to delete this chat?")) return;

    setChatSessions((prev) => prev.filter((s) => s.id !== sessionId));

    if (currentSessionId === sessionId) {
      const remaining = chatSessions.filter((s) => s.id !== sessionId);
      setCurrentSessionId(remaining.length > 0 ? remaining[0].id : null);
    }

    toast.success("Chat deleted");
  };

  const renameSession = (sessionId: string): void => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (session) {
      setEditingSessionId(sessionId);
      setEditingTitle(session.title);
    }
  };

  const saveRename = (): void => {
    if (editingSessionId && editingTitle.trim()) {
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === editingSessionId
            ? { ...session, title: editingTitle.trim(), updatedAt: new Date() }
            : session
        )
      );
      toast.success("Chat renamed");
    }
    setEditingSessionId(null);
    setEditingTitle("");
  };

  const shareSession = async (sessionId: string): Promise<void> => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (!session) return;

    const shareText = `${session.title}\n\n${session.messages
      .map((m) => `${m.role === "user" ? "You" : "Assistant"}: ${m.content}`)
      .join("\n\n")}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: session.title,
          text: shareText,
        });
        toast.success("Chat shared");
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("Chat copied to clipboard");
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error);
    }
  };

  const downloadSession = (session: ChatSession): void => {
    const dataStr = JSON.stringify(session, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${session.title}_${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
    toast.success("Chat downloaded");
  };

  const addMessage = (message: Message): void => {
    setChatSessions((prev) =>
      prev.map((session) => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, message],
            updatedAt: new Date(),
          };
        }
        return session;
      })
    );
  };
  // ============================================
  // API STATUS CHECK
  // ============================================

  const checkApiStatus = async (): Promise<void> => {
    try {
      const response = await callGemini("test");
      if (response) {
        setApiStatus('active');
        console.log('✅ API key is active');
      } else {
        setApiStatus('inactive');
        console.log('❌ API key is not configured or invalid');
      }
    } catch (error) {
      setApiStatus('inactive');
      console.error('❌ API check failed:', error);
    }
  };

  // ============================================
  // FILE HANDLING FUNCTIONS
  // ============================================

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);

    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const validFiles = files.filter((file) => {
      const isValid = validTypes.includes(file.type) || file.name.match(/\.(jpg|jpeg|png|pdf|txt|doc|docx)$/i);

      if (!isValid) {
        toast.error(`File type not supported: ${file.name}`);
      }
      return isValid;
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);

    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} file(s) uploaded`);
    }
  };

  const removeFile = (index: number): void => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ============================================
  // MESSAGE ACTION FUNCTIONS
  // ============================================

  const copyMessage = async (content: string, messageId: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      toast.success("Copied to clipboard");

      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  // Helper to update assistant message content progressively (streaming)
  const updateAssistantContent = (sessionId: string | null, messageId: string, newContent: string) => {
    if (!sessionId) return;
    setChatSessions((prev) =>
      prev.map((session) => {
        if (session.id !== sessionId) return session;
        return {
          ...session,
          messages: session.messages.map((m) => (m.id === messageId ? { ...m, content: newContent } : m)),
          updatedAt: new Date(),
        };
      })
    );
  };

  // Try to handle streaming from callGemini. If callGemini returns a Response-like object with a body stream,
  // we read it. Otherwise, if it returns a string, we simulate a typewriter streaming effect.
  const streamGeminiResponse = async (promptText: string, sessionId: string, assistantMessageId: string) => {
    try {
      const res: any = await callGemini(promptText);

      // ReadableStream (true streaming)
      if (res && res.body && typeof res.body.getReader === "function") {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let accumulated = "";

        while (!done) {
          if (cancelGenerationRef.current) {
            updateAssistantContent(
              sessionId,
              assistantMessageId,
              accumulated || "⚠ Generation stopped by user."
            );
            return accumulated;
          }

          // eslint-disable-next-line no-await-in-loop
          const { value, done: d } = await reader.read();
          if (value) {
            accumulated += decoder.decode(value, { stream: true });
            updateAssistantContent(sessionId, assistantMessageId, accumulated);
          }
          done = !!d;
        }

        updateAssistantContent(sessionId, assistantMessageId, accumulated);
        return accumulated;
      }

      // Simple string
      if (typeof res === "string") {
        const full = res;
        let i = 0;
        while (i <= full.length) {
          if (cancelGenerationRef.current) {
            updateAssistantContent(
              sessionId,
              assistantMessageId,
              full.slice(0, i) || "⚠ Generation stopped by user."
            );
            return full.slice(0, i);
          }
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 12));
          i += Math.ceil(Math.random() * 3);
          const chunk = full.slice(0, i);
          updateAssistantContent(sessionId, assistantMessageId, chunk);
        }
        updateAssistantContent(sessionId, assistantMessageId, full);
        return full;
      }

      // Object with `.text`
      if (res && typeof res === "object" && typeof res.text === "string") {
        const text = res.text;
        let i = 0;
        while (i <= text.length) {
          if (cancelGenerationRef.current) {
            updateAssistantContent(
              sessionId,
              assistantMessageId,
              text.slice(0, i) || "⚠ Generation stopped by user."
            );
            return text.slice(0, i);
          }
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 12));
          i += Math.ceil(Math.random() * 4);
          updateAssistantContent(sessionId, assistantMessageId, text.slice(0, i));
        }
        updateAssistantContent(sessionId, assistantMessageId, text);
        return text;
      }

      const fallback = String(res);
      updateAssistantContent(sessionId, assistantMessageId, fallback);
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

  const handleRegenerate = async (assistantMessageId: string): Promise<void> => {
    const session = chatSessions.find((s) => s.id === currentSessionId);
    if (!session) return;

    const idx = session.messages.findIndex((m) => m.id === assistantMessageId);
    if (idx <= 0) return;

    const userMsg = session.messages[idx - 1];
    if (!userMsg || userMsg.role !== "user") return;

    // Remove old assistant message
    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? { ...s, messages: s.messages.filter((m) => m.id !== assistantMessageId) }
          : s
      )
    );

    cancelGenerationRef.current = false;
    setIsLoading(true);

    // New assistant bubble
    const newAssistantMessage: Message = {
      id: (Date.now() + 2).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    addMessage(newAssistantMessage);

    try {
      await streamGeminiResponse(userMsg.content, currentSessionId!, newAssistantMessage.id);
      toast.success("Response regenerated");
    } catch (error) {
      if (!cancelGenerationRef.current) {
        toast.error("Failed to regenerate: " + String(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopGeneration = () => {
    if (!isLoading) return;
    cancelGenerationRef.current = true;
    setIsLoading(false);
    toast.info("Generation stopped");
  };

  const shareMessage = async (content: string): Promise<void> => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "DijkstraGPT Message",
          text: content,
        });
        toast.success("Shared successfully");
      } else {
        await navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard (Share not available)");
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error);
    }
  };

  // ============================================
  // INPUT HANDLING FUNCTIONS
  // ============================================

  const handleSubmit = async (): Promise<void> => {
    if (!prompt.trim() && uploadedFiles.length === 0) return;

    cancelGenerationRef.current = false;

    // Trigger layout transition immediately
    setHasMessages(true);

    if (!currentSessionId) {
      createNewChat();
    }

    const currentPrompt = prompt;
    const currentFiles = [...uploadedFiles];

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentPrompt,
      timestamp: new Date(),
      files: currentFiles.length > 0 ? currentFiles : undefined,
    };

    addMessage(userMessage);

    setPrompt("");
    setUploadedFiles([]);
    setIsLoading(true);

    if (currentSession && currentSession.messages.length === 0) {
      updateSessionTitle(currentSessionId!, currentPrompt);
    }

    // Create an assistant placeholder message (will be updated progressively)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    addMessage(assistantMessage);

    try {
      await streamGeminiResponse(currentPrompt, currentSessionId!, assistantMessage.id);
    } catch (error) {
      if (!cancelGenerationRef.current) {
        const errorMessage: Message = {
          id: (Date.now() + 3).toString(),
          role: "assistant",
          content: "⚠ Error: " + String(error),
          timestamp: new Date(),
        };
        // replace the placeholder content with the error
        updateAssistantContent(currentSessionId, assistantMessage.id, errorMessage.content);
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

  // ============================================
  // SEARCH & FILTER
  // ============================================

  const filteredSessions = chatSessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedSessions = filteredSessions.reduce((groups, session) => {
    const date = session.updatedAt.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, ChatSession[]>);

  // ============================================
  // RENDER MESSAGE FUNCTION
  // ============================================

  const renderMessage = (msg: Message, i: number): React.JSX.Element => {
    const isUser = msg.role === "user";
    const isCopied = copiedMessageId === msg.id;

    const isLastMessage = i === messages.length - 1;
    const shouldShowThinkingPlaceholder =
      !isUser && isLastMessage && isLoading && msg.content.trim() === "";

    const displayContent = shouldShowThinkingPlaceholder
      ? "DijkstraGPT is thinking ..."
      : msg.content || "";

    return (
      <div key={i} className={`group flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
        <div
          className={`max-w-[80%] rounded-2xl shadow-lg ${
            isUser
              ? "bg-foreground text-background"
              : "bg-background border border-border/50"
          }`}
        >
          <div className="p-4">
            {/* File attachments display for user messages */}
            {isUser && msg.files && msg.files.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {msg.files.map((file, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    {file.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Message content with markdown rendering */}
            <div className="space-y-3">
              <div
                className={`prose prose-sm dark:prose-invert max-w-none ${
                  shouldShowThinkingPlaceholder ? "text-muted-foreground italic" : ""
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayContent}</ReactMarkdown>
              </div>
            </div>

            {/* Timestamp */}
            <p className="text-xs opacity-70 mt-3">{msg.timestamp.toLocaleTimeString()}</p>
          </div>

          {/* Action buttons for assistant messages - hover only */}
          {!isUser && (
            <div className="flex items-center gap-1 px-4 pb-3 border-t border-border/30 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Copy button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyMessage(msg.content, msg.id)}
                className="h-8 w-8 p-0"
                aria-label="Copy message"
              >
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>

              {/* Regenerate button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRegenerate(msg.id)}
                className="h-8 w-8 p-0"
                aria-label="Regenerate response"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>

              {/* Share button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => shareMessage(msg.content)}
                className="h-8 w-8 p-0"
                aria-label="Share message"
              >
                <Share2 className="h-4 w-4" />
              </Button>
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
  // RENDER INPUT AREA
  // ============================================

  const renderInputArea = (isCentered: boolean = false) => (
    <div 
      className={`relative max-w-4xl mx-auto transition-all duration-500 ease-in-out ${
        isCentered ? 'w-full' : 'w-full'
      }`}
    >
      {/* Uploaded files preview */}
      {uploadedFiles.length > 0 && (
        <div className="mb-4 p-4 bg-muted/50 rounded-2xl border border-border/50">
          <div className="flex flex-wrap gap-2">
            {uploadedFiles.map((file, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-2 bg-background border border-border/50 hover:bg-muted/80 transition-colors">
                <FileText className="h-3 w-3" />
                <span className="text-sm font-medium">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive/20 hover:text-destructive rounded-full"
                  onClick={() => removeFile(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input container */}
      <div className="relative bg-background border border-border/50 rounded-3xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isCentered ? "Describe what you want to build..." : "Ask me anything about CS, algorithms, or coding interviews..."}
            className="min-h-[80px] max-h-[300px] resize-none border-0 bg-transparent px-6 py-5 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ height: "auto" }}
            disabled={isLoading}
            aria-label="Message input"
          />

          {/* Action buttons bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border/30">
            {/* Left side - Input tools */}
            <div className="flex items-center gap-1">
              {/* File attachment button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-9 w-9 p-0 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Attach file"
                disabled={isLoading}
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              {/* Image upload button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.multiple = true;
                  input.onchange = (e) => handleFileUpload(e as unknown as React.ChangeEvent<HTMLInputElement>);
                  input.click();
                }}
                className="h-9 w-9 p-0 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Upload image"
                disabled={isLoading}
              >
                <Image className="h-4 w-4" />
              </Button>
            </div>

            {/* Right side - Send/Stop button */}
            {isLoading ? (
              <Button
                variant="ghost"
                onClick={handleStopGeneration}
                className="h-9 w-9 p-0 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Stop generation"
              >
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!prompt.trim() && uploadedFiles.length === 0}
                className="h-9 px-4 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                Send
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
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
  // MAIN COMPONENT RENDER
  // ============================================

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20 flex flex-col w-full h-full">
      {/* ==================== MAIN CHAT AREA ==================== */}
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex flex-col relative min-h-0">
          {/* Messages Container - No internal scroll, uses parent scroll */}
          {!hasMessages && !isLoading ? (
            <>
              {/* Header - matches original layout */}
              <div className="flex-shrink-0 text-center pt-4 pb-8">
                <div className="flex flex-col items-center space-y-2 my-8">
                  <img src="/icon.png" alt="Dijkstra GPT logo" className="h-30 w-30" />
                  <h2 className="text-2xl font-semibold">Your Personal CS Prep Assistant</h2>
                  <p className="text-gray-500 text-center max-w-3xl">
                    This model has been trained on a wide range of computer science topics, tips and tricks, resources, and more to help you on your journey towards becoming a Computer Science Engineer. It is also context aware of what you do within GitHub and Leetcode. Happy coding :)
                  </p>
                </div>
              </div>

              {/* Main Content - matches original layout */}
              <div className={`flex-1 flex flex-col items-center px-4 pb-8 ${hasMessages ? 'hidden' : ''}`}>
                <div className="w-full max-w-4xl mx-auto space-y-8">
                  {/* Example Prompts - Below Input (shown in original layout) */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-lg font-semibold text-foreground/90 mb-2">Get started with these examples</h2>
                      <p className="text-sm text-muted-foreground">Click any prompt to try it out</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {examplePrompts.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(example)}
                          className="group p-4 text-left bg-background border border-border/50 rounded-2xl hover:border-border hover:shadow-md hover:shadow-black/5 transition-all duration-200 hover:-translate-y-0.5"
                          aria-label={`Use example prompt: ${example}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-black/10 to-green-800/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-black/20 group-hover:to-green-800/20 transition-colors">
                              <MessageSquare className="h-4 w-4 text-green-800" />
                            </div>
                            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                              {example}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Messages view – scrollable
            <div className="flex-1 min-h-0 p-6">
              <div className="max-w-4xl mx-auto h-full overflow-y-auto pr-1">
                {messages.map((m, i) => renderMessage(m, i))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* ==================== INPUT AREA - SINGLE INSTANCE THAT MOVES ==================== */}
          {hasMessages ? (
            <div className="flex-shrink-0 sticky bottom-0 p-6 border-t border-border/50 bg-gradient-to-br from-black/2 via-black/2 to-black/2 backdrop-blur-sm z-10 transition-all duration-500 ease-in-out">
              <div className="w-full max-w-4xl mx-auto">
                {renderInputArea(false)}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center px-4 pb-8">
              <div className="w-full max-w-4xl mx-auto">
                <div className="relative">
                  {renderInputArea(true)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================== SIDEBAR - CHAT HISTORY ==================== */}
        <div
          className={`transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-md border-l border-border/30 flex flex-col sticky top-2 self-start shadow-lg`}
          style={{ 
            height: 'calc(100vh - var(--header-height, 64px) - 40px)',
            width: isSidebarOpen ? '20rem' : '0',
            minWidth: isSidebarOpen ? '20rem' : '0',
            overflow: 'hidden'
          }}
        >
          {/* Sidebar content wrapper - controls visibility */}
          <div 
            className={`flex flex-col h-full transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100 delay-100' : 'opacity-0 delay-0'}`}
            style={{ 
              visibility: isSidebarOpen ? 'visible' : 'hidden',
              width: '20rem'
            }}
          >
            {/* Sidebar header */}
            <div className="flex-shrink-0 p-4 border-b border-border/30 bg-gradient-to-b from-transparent to-muted/20">
              {/* Title */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold flex items-center gap-2 text-foreground/90">
                  <MessageSquare className="h-4 w-4" />
                  Chat History
                </h2>
              </div>

              {/* New chat button */}
              <Button 
                onClick={createNewChat} 
                className="w-full mb-3 h-9 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 rounded-lg shadow-sm" 
                aria-label="Create new chat"
              >
                <MessageSquare className="h-3.5 w-3.5 mr-2" />
                New Chat
              </Button>

              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3.5 w-3.5" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-border/40 rounded-lg bg-background/50 text-sm focus:ring-2 focus:ring-ring/50 focus:border-ring/50 transition-all duration-200 text-foreground placeholder:text-muted-foreground/60"
                  aria-label="Search chat history"
                />
              </div>
            </div>

            {/* Chat sessions list with ScrollArea */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="p-3 space-y-1">
                {/* Grouped by date */}
                {Object.entries(groupedSessions).map(([date, sessions]) => (
                  <div key={date} className="mb-3">
                    {/* Date header */}
                    <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground/70 font-medium uppercase tracking-wider">
                      <Calendar className="h-3 w-3" />
                      {date === new Date().toDateString()
                        ? "Today"
                        : date === new Date(Date.now() - 86400000).toDateString()
                        ? "Yesterday"
                        : new Date(date).toLocaleDateString()}
                    </div>

                    {/* Session items */}
                    <div className="space-y-2">
                      {sessions.map((session) => (
                        <Card
                          key={session.id}
                          className={`group relative cursor-pointer transition-all duration-200 hover:shadow-md py-0 ${
                            currentSessionId === session.id 
                              ? "border-primary/50 bg-muted/50 shadow-sm" 
                              : "hover:border-border/80"
                          }`}
                          onClick={() => setCurrentSessionId(session.id)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Select chat: ${session.title}`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setCurrentSessionId(session.id);
                            }
                          }}
                        >
                          <div className="p-2.5">
                            <div className="flex items-center justify-between gap-2">
                              {/* Session info */}
                              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                <div className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors duration-200 ${
                                  currentSessionId === session.id 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground"
                                }`}>
                                  <MessageSquare className="h-3.5 w-3.5" />
                                </div>
                                <div className="min-w-0 flex-1 overflow-hidden">
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
                                      className="w-full text-sm font-medium bg-background border border-border/50 rounded px-2 py-1"
                                    />
                                  ) : (
                                    <>
                                      <p className={`text-sm font-medium truncate max-w-[150px] transition-colors duration-200 ${
                                        currentSessionId === session.id ? "text-foreground" : "text-foreground/90"
                                      }`} title={session.title}>
                                        {session.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground/70 mt-0.5 truncate max-w-[150px]">
                                        {session.messages.length} messages • {session.updatedAt.toLocaleDateString()}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Action buttons - Dropdown menu */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
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
                                      <Edit3 className="h-4 w-4 mr-2" /> Rename
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        shareSession(session.id);
                                      }}
                                    >
                                      <Share2 className="h-4 w-4 mr-2" /> Share
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        downloadSession(session);
                                      }}
                                    >
                                      <Download className="h-4 w-4 mr-2" /> Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600 focus:text-red-700 hover:bg-red-600/10"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSession(session.id);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Empty state */}
                {filteredSessions.length === 0 && (
                  <div className="text-center text-muted-foreground mt-12 px-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 opacity-40" />
                    </div>
                    <p className="text-sm font-medium mb-1">No chat history yet</p>
                    <p className="text-xs text-muted-foreground/70">Start a conversation to see your chats here</p>
                  </div>
                )}
              </div>
              </ScrollArea>
          </div>
        </div>
      </div>

      {/* ==================== FLOATING SIDEBAR TOGGLE ==================== */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-20 z-50 bg-background shadow-lg hover:shadow-xl border border-border/50 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'right-[340px]' : 'right-4'
        }`}
        aria-label={isSidebarOpen ? "Close chat history" : "Open chat history"}
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* ==================== HIDDEN FILE INPUT ==================== */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileUpload}
        accept=".txt,.pdf,.doc,.docx,.md,.json,.csv,.xlsx,.jpg,.jpeg,.png,image/*,application/pdf"
        aria-label="File upload input"
      />

    </div>
  );
}
