import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

const moodEmojis: Record<string, string> = {
  hopeful: "🌤",
  grateful: "🙏",
  angry: "😤",
  tired: "🌧",
  healing: "🌱",
  resilient: "💪",
};

const moodLabels: Record<string, string> = {
  hopeful: "Hopeful",
  grateful: "Grateful",
  angry: "Angry",
  tired: "Tired",
  healing: "Healing",
  resilient: "Resilient",
};

const supportiveMessages = [
  "I hear you 💗",
  "You're not alone",
  "Sending you light ✨",
  "Thank you for sharing",
  "You are so brave",
];

export default function ThreadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userAlias, setUserAlias] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchThread();
    fetchReplies();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/");
      return;
    }

    const { data: alias } = await supabase
      .from("user_aliases")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    setUserAlias(alias);
  };

  const fetchThread = async () => {
    try {
      const { data, error } = await supabase
        .from("threads")
        .select(`
          *,
          user_aliases!inner(alias)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      setThread(data);
    } catch (error) {
      console.error("Error fetching thread:", error);
      toast({
        title: "Error",
        description: "Failed to load thread",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReplies = async () => {
    try {
      const { data, error } = await supabase
        .from("thread_replies")
        .select(`
          *,
          user_aliases!inner(alias)
        `)
        .eq("thread_id", id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim() || !userAlias) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error } = await supabase.from("thread_replies").insert([{
        thread_id: id,
        user_id: session.user.id,
        alias_id: userAlias.id,
        content: replyContent,
        mood: "hopeful" as any,
      }]);

      if (error) throw error;

      setReplyContent("");
      fetchReplies();
      toast({
        title: "Reply sent!",
        description: "Your warm words have been shared.",
      });
    } catch (error) {
      console.error("Error posting reply:", error);
      toast({
        title: "Error",
        description: "Failed to post reply",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Thread not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/threads")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-primary">Thread</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Original Thread */}
        <Card className="p-4 bg-primary/5">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{thread.user_aliases.alias}</span>
              <span className="text-xl">{moodEmojis[thread.mood]}</span>
              <span className="text-xs text-muted-foreground">{moodLabels[thread.mood]}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm mb-3">{thread.content}</p>
          <div className="flex items-center gap-1 text-primary">
            <Heart className="h-4 w-4" />
            <span className="text-xs font-medium">
              {thread.warm_replies_count} warm {thread.warm_replies_count === 1 ? "reply" : "replies"}
            </span>
          </div>
        </Card>

        {/* Quick Supportive Replies */}
        <div className="flex flex-wrap gap-2">
          {supportiveMessages.map((message) => (
            <Button
              key={message}
              variant="soft"
              size="sm"
              onClick={() => setReplyContent(message)}
            >
              {message}
            </Button>
          ))}
        </div>

        {/* Replies */}
        <div className="space-y-3">
          {replies.map((reply) => (
            <Card key={reply.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-sm">{reply.user_aliases.alias}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{reply.content}</p>
            </Card>
          ))}
        </div>
      </main>

      {/* Reply Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-lg mx-auto flex gap-2">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Send a warm reply..."
            maxLength={280}
            className="resize-none min-h-[44px] max-h-[120px]"
          />
          <Button
            onClick={handleReply}
            disabled={!replyContent.trim()}
            size="icon"
            variant="sanctuary"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
