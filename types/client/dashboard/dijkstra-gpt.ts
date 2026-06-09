export type Message = {
  id: string;
  role: "user" | "assistant";
  sessionId: string;
  content: string;
  timestamp: Date;
  files?: File[];
};