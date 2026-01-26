import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { Calendar, TrendingUp, Heart, Sparkles, ChevronRight } from "lucide-react";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { CarePathwayCard } from "@/components/CarePathwayCard";

interface MoodOption {
  emoji: string;
  label: string;
  value: string;
  description: string;
}

const moodOptions: MoodOption[] = [
  { emoji: "😊", label: "Great", value: "great", description: "Feeling positive and energized" },
  { emoji: "🙂", label: "Good", value: "good", description: "Doing okay today" },
  { emoji: "😐", label: "Okay", value: "okay", description: "Neither good nor bad" },
  { emoji: "😔", label: "Low", value: "low", description: "Feeling down or tired" },
  { emoji: "😢", label: "Struggling", value: "struggling", description: "Having a hard time" },
];

const weeklyMoods = [
  { day: "Mon", dayFull: "Monday", mood: "great" },
  { day: "Tue", dayFull: "Tuesday", mood: "good" },
  { day: "Wed", dayFull: "Wednesday", mood: "okay" },
  { day: "Thu", dayFull: "Thursday", mood: "good" },
  { day: "Fri", dayFull: "Friday", mood: "great" },
  { day: "Sat", dayFull: "Saturday", mood: "good" },
  { day: "Sun", dayFull: "Sunday", mood: "great" },
];

const milestones = [
  { text: "7-day check-in streak!", textLabel: "Celebration", icon: "🎉" },
  { text: "Read 5 articles", textLabel: "Books", icon: "📚" },
  { text: "Shared in peer chat", textLabel: "Chat", icon: "💬" },
];

const getMoodData = (moodValue: string): MoodOption => {
  return moodOptions.find(m => m.value === moodValue) || moodOptions[2];
};

export default function Reflect() {
  const [skipped, setSkipped] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { saveReflection } = useOfflineStorage();
  const { accessibilityMode, isOnline } = useAccessibility();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    saveReflection(mood);
  };

  const handleSkip = () => {
    setSkipped(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Weekly Reflection</h1>
          <p className="text-sm text-muted-foreground">Your wellness journey</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Today's Check-in */}
        {!skipped && !selectedMood && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="font-semibold">How are you feeling today?</h2>
            </div>
            
            <div className="space-y-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-accent/30 hover:bg-accent/50 transition-all text-left"
                  aria-label={`${mood.label}: ${mood.description}`}
                >
                  <span className="text-2xl" aria-hidden="true">{mood.emoji}</span>
                  <div className="flex-1">
                    <span className="font-medium block">{mood.label}</span>
                    <span className="text-sm text-muted-foreground">{mood.description}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </button>
              ))}
            </div>

            <button
              onClick={handleSkip}
              className="w-full mt-4 p-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
            >
              Not ready today? That's okay. Skip for now.
            </button>
          </Card>
        )}

        {/* Skipped message */}
        {skipped && (
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/20">
            <div className="text-center space-y-2">
              <Heart className="h-8 w-8 text-primary mx-auto" aria-hidden="true" />
              <p className="font-medium">Take your time</p>
              <p className="text-sm text-muted-foreground">
                You can always come back when you're ready. There's no pressure here.
              </p>
              <Button 
                variant="soft" 
                className="mt-4"
                onClick={() => setSkipped(false)}
              >
                I'm ready now
              </Button>
            </div>
          </Card>
        )}

        {/* Selected mood confirmation */}
        {selectedMood && (
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/20">
            <div className="text-center space-y-2">
              <span className="text-4xl" aria-hidden="true">{getMoodData(selectedMood).emoji}</span>
              <p className="font-medium">Thank you for sharing</p>
              <p className="text-sm text-muted-foreground">
                {getMoodData(selectedMood).label} — {getMoodData(selectedMood).description}
              </p>
              {!isOnline && (
                <p className="text-xs text-muted-foreground mt-2">
                  Saved offline. Will sync when you're back online.
                </p>
              )}
            </div>
          </Card>
        )}

        {/* Mood Pattern */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">This Week's Mood</h2>
          </div>
          <div className={`grid gap-2 ${accessibilityMode ? 'grid-cols-4' : 'grid-cols-7'}`}>
            {weeklyMoods.map((item, idx) => {
              const moodData = getMoodData(item.mood);
              return (
                <div 
                  key={idx} 
                  className="text-center p-2 rounded-xl bg-accent/20"
                  role="listitem"
                  aria-label={`${item.dayFull}: ${moodData.label}`}
                >
                  <span className="text-2xl" aria-hidden="true">{moodData.emoji}</span>
                  <span className="block text-xs font-medium mt-1">{moodData.label}</span>
                  <span className="text-xs text-muted-foreground">{item.day}</span>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            You're doing well! Most days this week were positive.
          </p>
        </Card>

        {/* Milestones */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">Milestones</h2>
          </div>
          <div className="space-y-3">
            {milestones.map((milestone, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 p-3 rounded-2xl bg-accent/30"
                role="listitem"
              >
                <span className="text-2xl" aria-hidden="true">{milestone.icon}</span>
                <div>
                  <span className="text-sm font-medium block">{milestone.text}</span>
                  <span className="text-xs text-muted-foreground">{milestone.textLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Gratitude */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">Gratitude Note</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            What are you grateful for today?
          </p>
          <Button variant="soft" className="w-full">
            <Heart className="h-4 w-4 mr-2" aria-hidden="true" />
            Add a Note
          </Button>
        </Card>

        {/* Prayer/Faith Request (Optional) */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">Faith Support</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Would you like to share a prayer request with faith-based partners?
          </p>
          <Button variant="outline" className="w-full">
            <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
            Share Request (Optional)
          </Button>
        </Card>

        {/* Care Pathway - Discreet, optional access to testing/treatment info */}
        <CarePathwayCard />
      </div>

      <BottomNav />
    </div>
  );
}
