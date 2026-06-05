"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Send } from "lucide-react";

interface SendMessageProps {
  channelId: string;
  teamId: string;
}

export function SendMessage({ channelId, teamId }: SendMessageProps) {
  const [message, setMessage] = useState("");
  const sendMessageMutation = useMutation(api.functions.sendMessage);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    await sendMessageMutation({
      channelId,
      content: message.trim(),
      teamId,
    });
    
    setMessage("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type a message..."
        className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className="h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}