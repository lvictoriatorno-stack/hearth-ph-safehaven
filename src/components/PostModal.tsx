import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (content: string, mood: string, tag: string) => Promise<void>;
}

export const PostModal = ({ open, onClose, onSubmit }: PostModalProps) => {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("hopeful");
  const [tag, setTag] = useState("none");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || content.length > 280) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content, mood, tag);
      setContent("");
      setMood("hopeful");
      setTag("none");
      onClose();
    } catch (error) {
      console.error("Error posting thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">Share Your Thoughts</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Your words may comfort someone today.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="content">Your message</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share what's on your heart..."
              maxLength={280}
              className="min-h-[120px] resize-none"
            />
            <div className="text-xs text-muted-foreground text-right">
              {content.length}/280 characters
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mood">How are you feeling?</Label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger id="mood">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hopeful">🌤 Hopeful</SelectItem>
                <SelectItem value="grateful">🙏 Grateful</SelectItem>
                <SelectItem value="angry">😤 Angry</SelectItem>
                <SelectItem value="tired">🌧 Tired</SelectItem>
                <SelectItem value="healing">🌱 Healing</SelectItem>
                <SelectItem value="resilient">💪 Resilient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag">Tag (optional)</Label>
            <Select value={tag} onValueChange={setTag}>
              <SelectTrigger id="tag">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="treatment_wins">Treatment Wins</SelectItem>
                <SelectItem value="faith_and_healing">Faith & Healing</SelectItem>
                <SelectItem value="just_venting">Just Venting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || content.length > 280 || isSubmitting}
            className="w-full"
            variant="sanctuary"
          >
            {isSubmitting ? "Sharing..." : "Share Warmly"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
