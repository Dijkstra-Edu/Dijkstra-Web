"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";

// UI Components from shadcn/ui library
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

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
} from "lucide-react";

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

  // ============================================
  // REFS FOR DOM ELEMENTS
  // ============================================

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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

// Check API status on mount
useEffect(() => {
  checkApiStatus();
}, []);

  const deleteSession = (sessionId: string): void => {
    setChatSessions((prev) => prev.filter((s) => s.id !== sessionId));

    if (currentSessionId === sessionId) {
      const remaining = chatSessions.filter((s) => s.id !== sessionId);
      setCurrentSessionId(remaining.length > 0 ? remaining[0].id : null);
    }

    toast.success("Chat deleted");
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

      // If it's a fetch Response-like object with a ReadableStream body
      if (res && res.body && typeof res.body.getReader === "function") {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let accumulated = "";

        while (!done) {
          // eslint-disable-next-line no-await-in-loop
          const { value, done: d } = await reader.read();
          if (value) {
            accumulated += decoder.decode(value, { stream: true });
            updateAssistantContent(sessionId, assistantMessageId, accumulated);
          }
          done = !!d;
        }

        // finalize (in case any leftovers)
        updateAssistantContent(sessionId, assistantMessageId, accumulated);
        return accumulated;
      }

      // If callGemini returned a string, simulate typing
      if (typeof res === "string") {
        const full = res;
        let i = 0;
        // A small delay between characters produces a smooth typing effect. Adjust as needed.
        while (i <= full.length) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 12));
          i += Math.ceil(Math.random() * 3); // append a few chars at a time to feel natural
          const chunk = full.slice(0, i);
          updateAssistantContent(sessionId, assistantMessageId, chunk);
        }

        updateAssistantContent(sessionId, assistantMessageId, full);
        return full;
      }

      // If the response shape is unknown but contains text field
      if (res && typeof res === "object" && typeof res.text === "string") {
        const text = res.text;
        let i = 0;
        while (i <= text.length) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 12));
          i += Math.ceil(Math.random() * 4);
          updateAssistantContent(sessionId, assistantMessageId, text.slice(0, i));
        }
        updateAssistantContent(sessionId, assistantMessageId, text);
        return text;
      }

      // Unknown shape -> convert to string and show
      const fallback = String(res);
      updateAssistantContent(sessionId, assistantMessageId, fallback);
      return fallback;
    } catch (error) {
      const errStr = "⚠ Error: " + String(error);
      updateAssistantContent(sessionId, assistantMessageId, errStr);
      throw error;
    }
  };

  const regenerateMessage = async (userMessage: Message): Promise<void> => {
    setIsLoading(true);

    try {
      // create placeholder assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      addMessage(assistantMessage);

      await streamGeminiResponse(userMessage.content, currentSessionId!, assistantMessage.id);

      toast.success("Response regenerated");
    } catch (error) {
      toast.error("Failed to regenerate: " + String(error));
    } finally {
      setIsLoading(false);
    }
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
      const errorMessage: Message = {
        id: (Date.now() + 3).toString(),
        role: "assistant",
        content: "⚠ Error: " + String(error),
        timestamp: new Date(),
      };
      // replace the placeholder content with the error
      updateAssistantContent(currentSessionId, assistantMessage.id, errorMessage.content);
      toast.error("Failed to get response");
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

    // Split content by code blocks (```) and preserve formatting
    const parts = msg.content.split(/```/g);

    return (
      <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
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

            {/* Message content with code block formatting */}
            <div className="space-y-3">
              {parts.map((part, idx) =>
                idx % 2 === 1 ? (
                  // Code block (odd indices)
                  <div
                    key={idx}
                    className="relative bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-sm overflow-x-auto"
                  >
                    <pre className="whitespace-pre-wrap">{part.trim()}</pre>
                  </div>
                ) : (
                  // Regular text with list formatting (even indices)
                  <div key={idx} className="prose prose-sm dark:prose-invert max-w-none">
                    {part.split("\n").map((line, li) => {
                      if (line.trim().match(/^[-*]\s+/)) {
                        return (
                          <li key={li} className="ml-4 list-disc">
                            {line.replace(/^[-*]\s+/, "")}
                          </li>
                        );
                      } else if (line.trim().match(/^\d+\.\s+/)) {
                        return (
                          <li key={li} className="ml-4 list-decimal">
                            {line.replace(/^\d+\.\s+/, "")}
                          </li>
                        );
                      } else if (line.trim()) {
                        return <p key={li}>{line}</p>;
                      }
                      return <br key={li} />;
                    })}
                  </div>
                )
              )}
            </div>

            {/* Timestamp */}
            <p className="text-xs opacity-70 mt-3">{msg.timestamp.toLocaleTimeString()}</p>
          </div>

          {/* Action buttons for assistant messages - ICONS ONLY */}
          {!isUser && (
            <div className="flex items-center gap-1 px-4 pb-3 border-t border-border/30 pt-2">
              {/* Copy button - Icon only */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyMessage(msg.content, msg.id)}
                className="h-8 w-8 p-0"
                aria-label="Copy message"
              >
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>

              {/* Regenerate button - Icon only */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const userMsg = messages[i - 1];
                  if (userMsg && userMsg.role === "user") {
                    void regenerateMessage(userMsg);
                  }
                }}
                className="h-8 w-8 p-0"
                aria-label="Regenerate response"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>

              {/* Share button - Icon only */}
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
  // MAIN COMPONENT RENDER
  // ============================================

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* ==================== MAIN CHAT AREA ==================== */}
      <div className="flex-1 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Empty state with example prompts */}
            {messages.length === 0 && !isLoading ? (
              <div className="space-y-8 pt-20">
                {/* Header with logo */}
                <div className="text-center mb-12">
                  <div className="flex justify-center mb-6">
                    <img src="/icon.png" alt="Dijkstra GPT" className="h-24 w-24" />
                  </div>
                  <h1 className="text-3xl font-bold mb-3">Your Personal CS Prep Assistant</h1>
                  <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                    Trained on computer science topics, interview prep, and coding resources to help you
                    excel in your journey to becoming a Computer Science Engineer.
                  </p>
                </div>

                {/* Instructions */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Get started with these examples</h3>
                  <p className="text-sm text-muted-foreground">Click any prompt to try it out</p>
                </div>

                {/* Example prompt cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="group p-4 text-left bg-background border border-border/50 rounded-2xl hover:border-border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                      aria-label={`Use example prompt: ${example}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium leading-relaxed">{example}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Render all messages */}
                {messages.map((m, i) => renderMessage(m, i))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start mb-6">
                    <div className="bg-background border border-border/50 p-4 rounded-2xl shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* ==================== INPUT AREA ==================== */}
        <div className="flex-shrink-0 p-6 border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            {/* Uploaded files preview */}
            {uploadedFiles.length > 0 && (
              <div className="mb-4 p-4 bg-muted/50 rounded-2xl border border-border/50">
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-2">
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
            <div className="relative bg-background border border-border/50 rounded-3xl shadow-lg overflow-hidden">
              {/* Textarea */}
              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about CS, algorithms, or coding interviews..."
                className="min-h-[80px] max-h-[300px] resize-none border-0 bg-transparent px-6 py-5 text-base focus-visible:ring-0"
                disabled={isLoading}
                aria-label="Message input"
              />

              {/* Action buttons bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border/30">
                {/* Left side - Input tools (removed voice & enhance) */}
                <div className="flex items-center gap-1">
                  {/* File attachment button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-9 w-9 p-0 rounded-xl"
                    aria-label="Attach file"
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
                    className="h-9 w-9 p-0 rounded-xl"
                    aria-label="Upload image"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </div>

                {/* Right side - Send button */}
                <Button
                  onClick={handleSubmit}
                  disabled={(!prompt.trim() && uploadedFiles.length === 0) || isLoading}
                  className="h-9 px-4 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  )}
                  Send
                </Button>
              </div>
            </div>

            {/* Keyboard shortcut hint */}
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 bg-muted border border-border/50 rounded text-xs">⌘ Enter</kbd> to send
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== SIDEBAR - CHAT HISTORY ==================== */}
<div
  className={`${
    isSidebarOpen ? "w-80" : "w-0"
  } transition-all duration-300 bg-background border-l border-border/50 flex flex-col ${isSidebarOpen ? 'overflow-y-auto' : 'overflow-hidden'} relative`}
>
        {/* Sidebar header */}
        <div className="p-4 border-b border-border/50">
          {/* Title and close button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat History
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* New chat button */}
          <Button onClick={createNewChat} className="w-full mb-3" aria-label="Create new chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            New Chat
          </Button>

          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border/50 rounded-lg bg-background text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
              aria-label="Search chat history"
            />
          </div>
        </div>

        {/* Chat sessions list */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Grouped by date */}
          {Object.entries(groupedSessions).map(([date, sessions]) => (
            <div key={date} className="mb-4">
              {/* Date header */}
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground font-medium">
                <Calendar className="h-3 w-3" />
                {date === new Date().toDateString()
                  ? "Today"
                  : date === new Date(Date.now() - 86400000).toDateString()
                  ? "Yesterday"
                  : new Date(date).toLocaleDateString()}
              </div>

              {/* Session items */}
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    currentSessionId === session.id ? "bg-muted border border-border" : "hover:bg-muted/50"
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
                  {/* Session info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.messages.length} messages • {session.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons - Download and Delete */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Download button - Icon only */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadSession(session);
                      }}
                      aria-label={`Download chat: ${session.title}`}
                    >
                      <Download className="h-3 w-3" />
                    </Button>

                    {/* Delete button - Icon only */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                      aria-label={`Delete chat: ${session.title}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Empty state */}
          {filteredSessions.length === 0 && (
            <div className="text-center text-muted-foreground mt-8 px-4">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-sm">No chat history yet</p>
              <p className="text-xs">Start a conversation to see your chats here</p>
            </div>
          )}
        </div>

       {/* Sidebar footer */}
      </div>

      {/* ==================== FLOATING SIDEBAR TOGGLE ==================== */}
      {!isSidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-20 right-4 z-10 bg-background shadow-lg hover:shadow-xl border border-border/50"
          aria-label="Open chat history"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

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

      {/* ==================== FLOATING API STATUS INDICATOR (Bottom Right) ==================== */}
      <div className={`fixed bottom-6 z-50 transition-all duration-300 ${
        isSidebarOpen ? 'right-[336px]' : 'right-6'
      }`}>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 shadow-lg backdrop-blur-sm transition-all ${
          apiStatus === 'active' 
            ? 'bg-green-500/10 border-green-500 text-green-600' 
            : apiStatus === 'inactive'
            ? 'bg-red-500/10 border-red-500 text-red-600'
            : 'bg-yellow-500/10 border-yellow-500 text-yellow-600'
        }`}>
          <div className={`w-3 h-3 rounded-full ${
            apiStatus === 'active' 
              ? 'bg-green-500 animate-pulse' 
              : apiStatus === 'inactive'
              ? 'bg-red-500'
              : 'bg-yellow-500 animate-pulse'
          }`} />
          <span className="text-sm font-medium">
            {apiStatus === 'active' ? 'Active' : apiStatus === 'inactive' ? 'Inactive' : 'Checking...'}
          </span>
          {apiStatus === 'inactive' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={checkApiStatus}
              className="h-6 px-2 text-xs ml-1"
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
