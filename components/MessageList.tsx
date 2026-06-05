import { Hash } from "lucide-react";

interface MessageListProps {
  messages: any[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col h-full">
      {messages?.map((message, index) => (
        <div
          key={index}
          className="flex gap-4 p-4 hover:bg-muted/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Hash className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">User</span>
              <span className="text-xs text-muted-foreground">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
      {messages?.length === 0 && (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No messages yet</p>
            <p className="text-sm">Be the first to send a message!</p>
          </div>
        </div>
      )}
      {messages && messages.length > 0 && (
        <div className="flex-1" />
      )}
    </div>
  );
}