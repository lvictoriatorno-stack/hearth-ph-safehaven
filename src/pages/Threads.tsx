import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { ThreadCard } from "@/components/ThreadCard";
import { PostModal } from "@/components/PostModal";
import { Plus, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Threads() {
  const [threads, setThreads] = useState<any[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [userAlias, setUserAlias] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchThreads();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Not authenticated, redirect to onboarding
      navigate("/");
      return;
    }

    setCurrentUserId(session.user.id);

    // Get user's alias
    const { data: alias } = await supabase
      .from("user_aliases")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    setUserAlias(alias);
  };

  const fetchThreads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("threads")
        .select(`
          *,
          user_aliases!inner(alias)
        `)
        .eq("is_approved", true)
        .eq("is_under_review", false)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setThreads(data || []);
    } catch (error) {
      console.error("Error fetching threads:", error);
      toast({
        title: "Error",
        description: "Failed to load threads",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkForFlaggedWords = (text: string): boolean => {
    const flaggedWords = [
      'call', 'text', 'phone', 'number', 'contact', 'email', 'address',
      'suicide', 'kill myself', 'end my life', 'want to die', 'killing myself',
      'take my life', 'harm myself'
    ];
    
    const lowerText = text.toLowerCase();
    return flaggedWords.some(word => lowerText.includes(word));
  };

  const handlePostThread = async (content: string, mood: string, tag: string) => {
    if (!userAlias) {
      toast({
        title: "Error",
        description: "Please sign in to post",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const containsFlaggedWords = checkForFlaggedWords(content);

      const { error } = await supabase.from("threads").insert([{
        user_id: session.user.id,
        alias_id: userAlias.id,
        content,
        mood: mood as any,
        tag: tag as any,
        is_flagged: containsFlaggedWords,
        is_under_review: containsFlaggedWords,
      }]);

      if (error) throw error;

      if (containsFlaggedWords) {
        toast({
          title: "Post Under Review",
          description: "Your post has been submitted for review to ensure community safety.",
        });
      } else {
        toast({
          title: "Posted!",
          description: "Your words may comfort someone today.",
        });
      }

      fetchThreads();
    } catch (error) {
      console.error("Error posting thread:", error);
      toast({
        title: "Error",
        description: "Failed to post thread",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (threadId: string) => {
    try {
      const { error } = await supabase
        .from("threads")
        .delete()
        .eq("id", threadId);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Your thread has been deleted.",
      });

      fetchThreads();
    } catch (error) {
      console.error("Error deleting thread:", error);
      toast({
        title: "Error",
        description: "Failed to delete thread",
        variant: "destructive",
      });
    }
  };

  const handleReport = async (threadId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error } = await supabase.from("moderation_flags").insert({
        thread_id: threadId,
        reporter_user_id: session.user.id,
        reason: "User reported",
      });

      if (error) throw error;

      toast({
        title: "Reported",
        description: "Thank you for helping keep our community safe.",
      });
    } catch (error) {
      console.error("Error reporting thread:", error);
      toast({
        title: "Error",
        description: "Failed to report thread",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary mb-1">Community Threads</h1>
          <p className="text-sm text-muted-foreground">
            A safe space for sharing, listening, and healing.
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Safety Notice */}
        <Card className="p-4 bg-accent/30 border-primary/20">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Stay Safe</h3>
              <p className="text-xs text-muted-foreground">
                Do not share personal information. All posts are monitored for safety.
              </p>
            </div>
          </div>
        </Card>

        {/* Threads Feed */}
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading threads...</div>
        ) : threads.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No threads yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {threads.map((thread) => (
              <ThreadCard
                key={thread.id}
                id={thread.id}
                alias={thread.user_aliases.alias}
                content={thread.content}
                mood={thread.mood}
                tag={thread.tag}
                warmRepliesCount={thread.warm_replies_count}
                createdAt={thread.created_at}
                userId={thread.user_id}
                currentUserId={currentUserId || undefined}
                onClick={() => navigate(`/thread/${thread.id}`)}
                onReport={() => handleReport(thread.id)}
                onDelete={() => handleDelete(thread.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <Button
        onClick={() => setIsPostModalOpen(true)}
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg"
        variant="sanctuary"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <PostModal
        open={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handlePostThread}
      />

      <BottomNav />
    </div>
  );
}
