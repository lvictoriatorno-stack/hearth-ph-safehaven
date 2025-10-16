import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ThreadCardProps {
  id: string;
  alias: string;
  content: string;
  mood: string;
  tag?: string;
  warmRepliesCount: number;
  createdAt: string;
  onClick?: () => void;
  onReport?: () => void;
}

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

const tagLabels: Record<string, string> = {
  treatment_wins: "Treatment Wins",
  faith_and_healing: "Faith & Healing",
  just_venting: "Just Venting",
  none: "",
};

export const ThreadCard = ({
  alias,
  content,
  mood,
  tag,
  warmRepliesCount,
  createdAt,
  onClick,
  onReport,
}: ThreadCardProps) => {
  return (
    <Card
      className="p-4 cursor-pointer hover:bg-accent/5 transition-all"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground">{alias}</span>
          <span className="text-xl">{moodEmojis[mood]}</span>
          <span className="text-xs text-muted-foreground">{moodLabels[mood]}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>

      {tag && tag !== "none" && (
        <div className="mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {tagLabels[tag]}
          </span>
        </div>
      )}

      <p className="text-sm mb-3 text-foreground/90">{content}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-primary">
          <Heart className="h-4 w-4" />
          <span className="text-xs font-medium">
            {warmRepliesCount} warm {warmRepliesCount === 1 ? "reply" : "replies"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onReport?.();
          }}
          className="h-auto py-1 px-2"
        >
          <Flag className="h-3 w-3 mr-1" />
          <span className="text-xs">Report</span>
        </Button>
      </div>
    </Card>
  );
};
