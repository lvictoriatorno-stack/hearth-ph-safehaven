import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { Calendar, TrendingUp, Heart, Sparkles } from "lucide-react";

const weeklyMoods = [
  { day: "Mon", mood: "Great" },
  { day: "Tue", mood: "Good" },
  { day: "Wed", mood: "Okay" },
  { day: "Thu", mood: "Good" },
  { day: "Fri", mood: "Great" },
  { day: "Sat", mood: "Good" },
  { day: "Sun", mood: "Great" },
];

const milestones = [
  { text: "7-day check-in streak!", icon: "🎉" },
  { text: "Read 5 articles", icon: "📚" },
  { text: "Shared in peer chat", icon: "💬" },
];

export default function Reflect() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Weekly Reflection</h1>
          <p className="text-sm text-muted-foreground">Your wellness journey</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Mood Pattern */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">This Week's Mood</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weeklyMoods.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl mb-1">
                  {item.mood === "Great" ? "😊" : item.mood === "Good" ? "🙂" : "😐"}
                </div>
                <span className="text-xs text-muted-foreground">{item.day}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            You're doing well! Most days this week were positive. 💗
          </p>
        </Card>

        {/* Milestones */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Milestones</h2>
          </div>
          <div className="space-y-3">
            {milestones.map((milestone, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 p-3 rounded-2xl bg-accent/30"
              >
                <span className="text-2xl">{milestone.icon}</span>
                <span className="text-sm font-medium">{milestone.text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Gratitude */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Gratitude Note</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            What are you grateful for today?
          </p>
          <Button variant="soft" className="w-full">
            Add a Note
          </Button>
        </Card>

        {/* Prayer/Faith Request (Optional) */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Faith Support</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Would you like to share a prayer request with faith-based partners?
          </p>
          <Button variant="outline" className="w-full">
            Share Request (Optional)
          </Button>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
