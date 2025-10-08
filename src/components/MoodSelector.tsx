import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smile, Meh, Frown, Heart, Sparkles } from "lucide-react";

const moods = [
  { icon: Smile, label: "Great", color: "text-green-500" },
  { icon: Sparkles, label: "Good", color: "text-blue-500" },
  { icon: Meh, label: "Okay", color: "text-yellow-500" },
  { icon: Frown, label: "Struggling", color: "text-orange-500" },
  { icon: Heart, label: "Need Support", color: "text-primary" },
];

interface MoodSelectorProps {
  onMoodSelect?: (mood: string) => void;
}

export const MoodSelector = ({ onMoodSelect }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelect?.(mood);
  };

  return (
    <Card className="p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center">How are you feeling today?</h3>
      <div className="grid grid-cols-5 gap-3">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.label;
          
          return (
            <button
              key={mood.label}
              onClick={() => handleSelect(mood.label)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
                isSelected 
                  ? "bg-primary/10 scale-110 shadow-md" 
                  : "hover:bg-accent hover:scale-105"
              }`}
            >
              <Icon className={`h-8 w-8 ${isSelected ? "text-primary" : mood.color}`} />
              <span className="text-xs font-medium text-center">{mood.label}</span>
            </button>
          );
        })}
      </div>
      {selectedMood && (
        <p className="mt-4 text-sm text-muted-foreground text-center fade-in-up">
          {selectedMood === "Need Support" 
            ? "It's okay to reach out. You're not alone. 💗" 
            : "Thank you for sharing. Your feelings matter."}
        </p>
      )}
    </Card>
  );
};
