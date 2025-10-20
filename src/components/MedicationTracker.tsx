import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pill, Check, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MedicationTrackerProps {
  userId?: string;
}

export const MedicationTracker = ({ userId }: MedicationTrackerProps) => {
  const [takenToday, setTakenToday] = useState(false);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      checkTodayStatus();
      calculateStreak();
    }
  }, [userId]);

  const checkTodayStatus = async () => {
    if (!userId) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("medication_logs")
      .select("*")
      .eq("user_id", userId)
      .gte("taken_at", today.toISOString())
      .maybeSingle();

    if (!error && data) {
      setTakenToday(true);
    }
  };

  const calculateStreak = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("medication_logs")
      .select("taken_at")
      .eq("user_id", userId)
      .order("taken_at", { ascending: false });

    if (error || !data || data.length === 0) {
      setStreak(0);
      return;
    }

    let currentStreak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    for (const log of data) {
      const logDate = new Date(log.taken_at);
      logDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (checkDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === currentStreak) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const handleTaken = async () => {
    if (!userId || takenToday) return;

    setLoading(true);
    const { error } = await supabase
      .from("medication_logs")
      .insert({ user_id: userId });

    if (error) {
      toast({
        title: "Error",
        description: "Could not log medication. Please try again.",
        variant: "destructive",
      });
    } else {
      setTakenToday(true);
      setStreak(streak + 1);
      toast({
        title: "Great job!",
        description: "Your health routine matters. Keep it up!",
      });
    }
    setLoading(false);
  };

  const handleRemindLater = () => {
    toast({
      title: "Reminder set",
      description: "Gentle reminder: staying consistent keeps you strong.",
    });
  };

  const progressPercentage = Math.min((streak / 30) * 100, 100);

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Pill className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Your Health Routine</h3>
          <p className="text-sm text-muted-foreground">ART Taken Today?</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleTaken}
            disabled={takenToday || loading || !userId}
            className="w-full min-h-[44px]"
            variant={takenToday ? "secondary" : "default"}
          >
            <Check className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{takenToday ? "Taken today" : "Yes, I've taken it"}</span>
          </Button>
          <Button
            onClick={handleRemindLater}
            disabled={takenToday || !userId}
            variant="outline"
            className="w-full min-h-[44px]"
          >
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Remind me later</span>
          </Button>
        </div>

        {streak > 0 && (
          <div className="space-y-3 pt-2 fade-in-up">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Adherence streak</span>
              <span className="font-semibold text-primary">
                {streak} {streak === 1 ? "day" : "days"} strong
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <Link to="/medication-history" className="block">
              <Button variant="ghost" size="sm" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Full History
              </Button>
            </Link>
          </div>
        )}

        {!userId && (
          <p className="text-xs text-muted-foreground text-center pt-2">
            Sign in to track your health routine
          </p>
        )}
      </div>
    </Card>
  );
};
