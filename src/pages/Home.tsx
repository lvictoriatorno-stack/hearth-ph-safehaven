import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodSelector } from "@/components/MoodSelector";
import { MedicationTracker } from "@/components/MedicationTracker";
import { EmergencyExit } from "@/components/EmergencyExit";
import { BottomNav } from "@/components/BottomNav";
import { Heart, Shield, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-sanctuary.jpg";

export default function Home() {
  const [userId, setUserId] = useState<string | undefined>();

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

  return (
    <div className="min-h-screen bg-background pb-20">
      <EmergencyExit />
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80" />
        <div className="relative text-center px-6 z-10">
          <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">
            Welcome to Hearth
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md">
            Your safe space. Your sanctuary.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6 fade-in-up">
        {/* Daily Check-in */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Daily Check-in</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your emotions and health matter. Take a moment for both.
          </p>
          <MoodSelector />
        </div>

        {/* Health Routine */}
        <MedicationTracker userId={userId} />

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/chat">
              <Card className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm">Peer Support</h3>
                <p className="text-xs text-muted-foreground">Connect anonymously</p>
              </Card>
            </Link>

            <Link to="/learn">
              <Card className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm">Learn</h3>
                <p className="text-xs text-muted-foreground">Knowledge is power</p>
              </Card>
            </Link>

            <Link to="/reflect">
              <Card className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <Heart className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm">Reflect</h3>
                <p className="text-xs text-muted-foreground">Your wellness journey</p>
              </Card>
            </Link>

            <Link to="/crisis">
              <Card className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-destructive/5">
                <Shield className="h-8 w-8 text-destructive mb-2" />
                <h3 className="font-semibold text-sm">Crisis Mode</h3>
                <p className="text-xs text-muted-foreground">Immediate support</p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Daily Affirmation */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/20">
          <p className="text-center text-lg italic text-foreground/80">
            "You are safe here. Healing is personal. You're not alone."
          </p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
