import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import { Send, Shield, AlertCircle } from "lucide-react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Anonymous",
      text: "Sometimes I feel like I'm carrying this alone...",
      time: "2m ago",
    },
    {
      id: 2,
      user: "Anonymous",
      text: "You're not alone. We're all here for each other. 💗",
      time: "1m ago",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: "You",
        text: message,
        time: "Just now",
      },
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Peer Support</h1>
          <p className="text-sm text-muted-foreground">Anonymous, safe, moderated</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Safety Notice */}
        <Card className="p-4 bg-accent/30 border-primary/20">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Stay Safe</h3>
              <p className="text-xs text-muted-foreground">
                Do not share personal information like phone numbers, addresses, or clinic names. 
                Moderators actively monitor for safety.
              </p>
            </div>
          </div>
        </Card>

        {/* Messages */}
        <div className="space-y-3">
          {messages.map((msg) => (
            <Card 
              key={msg.id} 
              className={`p-4 ${msg.user === "You" ? "bg-primary/5" : ""}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-sm">{msg.user}</span>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className="text-sm">{msg.text}</p>
            </Card>
          ))}
        </div>

        {/* Guidelines Reminder */}
        <Card className="p-3 bg-muted/30">
          <div className="flex gap-2 items-start">
            <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Be kind, respectful, and supportive. This is a judgment-free zone.
            </p>
          </div>
        </Card>
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-lg mx-auto flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-2xl"
          />
          <Button onClick={handleSend} size="icon" variant="sanctuary">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
