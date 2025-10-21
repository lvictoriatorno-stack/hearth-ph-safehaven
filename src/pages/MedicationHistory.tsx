import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdherenceRing } from "@/components/AdherenceRing";
import { WeeklyTimeline } from "@/components/WeeklyTimeline";
import { BottomNav } from "@/components/BottomNav";
import { EmergencyExit } from "@/components/EmergencyExit";
import { Heart, ChevronLeft, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { subDays, startOfDay, endOfDay, differenceInDays } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function MedicationHistory() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [userId, setUserId] = useState<string | undefined>();
  const [streak, setStreak] = useState(0);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyPercentage, setMonthlyPercentage] = useState(0);
  const [affirmation, setAffirmation] = useState("");

  const dailyAffirmations = [
    t('medHistory.affirmation1'),
    t('medHistory.affirmation2'),
    t('medHistory.affirmation3'),
    t('medHistory.affirmation4'),
    t('medHistory.affirmation5'),
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      loadMedicationData();
    }
    const randomAffirmation =
      dailyAffirmations[Math.floor(Math.random() * dailyAffirmations.length)];
    setAffirmation(randomAffirmation);
  }, [userId]);

  const loadMedicationData = async () => {
    if (!userId) return;

    await calculateStreak();
    await loadWeeklyData();
    await calculateMonthlyAdherence();
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

  const loadWeeklyData = async () => {
    if (!userId) return;

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);

      const { data, error } = await supabase
        .from("medication_logs")
        .select("*")
        .eq("user_id", userId)
        .gte("taken_at", dayStart.toISOString())
        .lte("taken_at", dayEnd.toISOString())
        .maybeSingle();

      let status: "taken" | "reminder" | "missed" = "missed";
      if (data) {
        status = "taken";
      } else if (date > new Date()) {
        status = "missed";
      }

      days.push({ date, status });
    }

    setWeeklyData(days);
  };

  const calculateMonthlyAdherence = async () => {
    if (!userId) return;

    const thirtyDaysAgo = subDays(new Date(), 30);

    const { data, error } = await supabase
      .from("medication_logs")
      .select("taken_at")
      .eq("user_id", userId)
      .gte("taken_at", thirtyDaysAgo.toISOString());

    if (!error && data) {
      const percentage = Math.round((data.length / 30) * 100);
      setMonthlyPercentage(percentage);
    }
  };

  const adherencePercentage = streak > 0 ? Math.min((streak / 7) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      <EmergencyExit />

      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background pt-6 pb-8 px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/home")}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('medHistory.title')}</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-2">
          {t('medHistory.subtitle')}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Adherence Overview Card */}
        <Card className="p-6 shadow-lg fade-in-up">
          <AdherenceRing streak={streak} percentage={adherencePercentage} />
          <p className="text-center mt-4 text-muted-foreground">
            You've taken your ART for {streak} {streak === 1 ? t('med.dayStrong') : t('med.daysStrong')}.
          </p>
          <div className="mt-4 p-4 bg-accent/20 rounded-xl">
            <p className="text-sm italic text-center text-foreground/80">
              "{affirmation}"
            </p>
          </div>
        </Card>

        {/* Weekly Timeline */}
        <Card className="p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">{t('medHistory.weeklyProgress')}</h3>
          <WeeklyTimeline days={weeklyData} />
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>{t('status.taken')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>{t('status.reminder')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted"></div>
              <span>{t('status.missed')}</span>
            </div>
          </div>
        </Card>

        {/* Monthly Summary */}
        <Collapsible>
          <Card className="shadow-lg">
            <CollapsibleTrigger className="w-full p-6 text-left hover:bg-accent/5 transition-colors rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{t('medHistory.monthlySummary')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('medHistory.completedThisMonth')} {monthlyPercentage}% {t('medHistory.thisMonth')}
                  </p>
                </div>
                <ChevronLeft className="h-5 w-5 text-muted-foreground transform rotate-[-90deg]" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6 pt-2 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Days on track</span>
                  <span className="font-semibold">
                    {Math.round((monthlyPercentage / 100) * 30)} / 30
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${monthlyPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Progress, not perfection. You're doing great.
                </p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Motivation / Support */}
        <Card className="p-6 bg-primary/5 border-primary/20 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">{t('medHistory.needHelp')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect with others on their journey or adjust your reminders.
          </p>
          <div className="flex gap-3">
            <Link to="/threads" className="flex-1">
              <Button variant="outline" className="w-full">
                {t('medHistory.peerTips')}
              </Button>
            </Link>
            <Button variant="outline" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              {t('medHistory.setReminders')}
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="flex gap-3 pt-4">
          <Link to="/home" className="flex-1">
            <Button variant="default" className="w-full">
              {t('medHistory.backToCheckIn')}
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
