"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Paperclip, ImageIcon, FileText, Sparkles, X, ArrowUp } from "lucide-react"

export default function ChatInterface() {
  const [prompt, setPrompt] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isEnhanced, setIsEnhanced] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [prompt])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const enhancePrompt = () => {
    setIsEnhanced(!isEnhanced)
    if (!isEnhanced) {
      setPrompt((prev) => `Enhanced: ${prev}`)
    } else {
      setPrompt((prev) => prev.replace("Enhanced: ", ""))
    }
  }

  const handleSubmit = () => {
    if (!prompt.trim() && uploadedFiles.length === 0) return

    console.log("Submitting:", {
      prompt,
      files: uploadedFiles,
      enhanced: isEnhanced,
    })

    setPrompt("")
    setUploadedFiles([])
    setIsEnhanced(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const examplePrompts = [
    "I'm lost. How do I get started with coding to get a job in tech?",
    "What are the steps I can take to become a Computer Science Engineer?",
    "How do I approach a coding interview?",
    "What are some good resources for learning algorithms?",
    "How can I leverage AI in my coding projects?",
    "How do I improve my resume for tech jobs?",
  ]

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-4 pb-8">
        {/* Logo & tagline */}
        <div className="flex flex-col items-center space-y-2 my-8">
          <img src="/icon.png" alt="Dijkstra GPT logo" className="h-30 w-30" />
          <h2 className="text-2xl font-semibold">Your Personal CS Prep Assistant</h2>
          <p className="text-gray-500 text-center max-w-3xl">
            This model has been trained on a wide range of computer science topics, tips and tricks, resources, and more to help you on your journey towards becoming a Computer Science Engineer. It is also context aware of what you do within GitHub and Leetcode. Happy coding :)
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 pb-8">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Chat Input Container */}
          <div className="relative">
            {/* File Uploads Display */}
            {uploadedFiles.length > 0 && (
              <div className="mb-4 p-4 bg-muted/50 rounded-2xl border border-border/50">
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-2 bg-background border border-border/50 hover:bg-muted/80 transition-colors"
                    >
                      <FileText className="h-3 w-3" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-destructive/20 hover:text-destructive rounded-full"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Main Input Card */}
            <div className="relative bg-background border border-border/50 rounded-3xl shadow-lg shadow-black/5 overflow-hidden">
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe what you want to build..."
                  className="min-h-[80px] max-h-[300px] resize-none border-0 bg-transparent px-6 py-5 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                  style={{ height: "auto" }}
                />

                {/* Action Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border/30">
                  <div className="flex items-center gap-1">
                    {/* Voice Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleRecording}
                      className={`h-9 w-9 p-0 rounded-xl transition-all duration-200 ${
                        isRecording
                          ? "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>

                    {/* File Upload */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-9 w-9 p-0 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>

                    {/* Image Upload */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const input = document.createElement("input")
                        input.type = "file"
                        input.accept = "image/*"
                        input.multiple = true
                        input.onchange = (e) => handleFileUpload(e as any)
                        input.click()
                      }}
                      className="h-9 w-9 p-0 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>

                    {/* Enhance Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={enhancePrompt}
                      className={`h-9 w-9 p-0 rounded-xl transition-all duration-200 ${
                        isEnhanced
                          ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Send Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim() && uploadedFiles.length === 0}
                    className="h-9 px-4 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcut */}
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground/80">
                Press{" "}
                <kbd className="px-1.5 py-0.5 bg-muted/80 border border-border/50 rounded text-xs font-mono">
                  ⌘ Enter
                </kbd>{" "}
                to send
              </p>
            </div>
          </div>

          {/* Example Prompts */}
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
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-black/10 to-green-800/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-black/20 group-hover:to-green-800/20 transition-colors">
                      <Sparkles className="h-4 w-4 text-green-800" />
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

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileUpload}
        accept=".txt,.pdf,.doc,.docx,.md,.json,.csv,.xlsx"
      />
    </div>
  )
}
