import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { ThreadCard } from "@/components/ThreadCard";
import { PostModal } from "@/components/PostModal";
import { Plus, Shield, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import type { Thread, UserAlias, MoodType, ThreadTag } from "@/types/database";

export default function Threads() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [userAlias, setUserAlias] = useState<UserAlias | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { calmView, setCalmView } = useAccessibility();

  // Calm view shows fewer posts
  const CALM_VIEW_LIMIT = 3;
  const displayedThreads = calmView ? threads.slice(0, CALM_VIEW_LIMIT) : threads;

  useEffect(() => {
    checkAuth();
    fetchThreads();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/");
      return;
    }

    setCurrentUserId(session.user.id);

    const { data: alias } = await supabase
      .from("user_aliases")
      .select("*")
      .eq("user_id", session.user.id)
      .single() as { data: UserAlias | null; error: any };

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
        .order("created_at", { ascending: false }) as { data: Thread[] | null; error: any };

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

      const { error } = await supabase.from("threads").insert({
        user_id: session.user.id,
        alias_id: userAlias.id,
        content,
        mood: mood as MoodType,
        tag: tag as ThreadTag,
        is_flagged: containsFlaggedWords,
        is_under_review: containsFlaggedWords,
      } as any);

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
        .eq("id", threadId) as { error: any };

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
      } as any);

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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-primary">Community Threads</h1>
            <Button
              variant={calmView ? "default" : "outline"}
              size="sm"
              onClick={() => setCalmView(!calmView)}
              className="gap-2"
              aria-pressed={calmView}
            >
              {calmView ? (
                <>
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                  <span>Calm View</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  <span>Calm View</span>
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            A safe space for sharing, listening, and healing.
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Calm View Notice */}
        {calmView && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex gap-3 items-center">
              <EyeOff className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">Calm View is on</p>
                <p className="text-xs text-muted-foreground">
                  Showing fewer posts to protect your peace. This is self-care, not a restriction.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Safety Notice */}
        <Card className="p-4 bg-accent/30 border-primary/20">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
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
            {displayedThreads.map((thread) => (
              <ThreadCard
                key={thread.id}
                id={thread.id}
                alias={thread.user_aliases?.alias || 'Anonymous'}
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
            
            {/* Show more button in calm view */}
            {calmView && threads.length > CALM_VIEW_LIMIT && (
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  {threads.length - CALM_VIEW_LIMIT} more posts hidden
                </p>
                <Button 
                  variant="soft" 
                  size="sm"
                  onClick={() => setCalmView(false)}
                >
                  Show all posts
                </Button>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <Button
        onClick={() => setIsPostModalOpen(true)}
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg"
        variant="sanctuary"
        size="icon"
        aria-label="Create new post"
      >
        <Plus className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">Create new post</span>
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
