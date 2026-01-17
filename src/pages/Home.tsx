import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodSelector } from "@/components/MoodSelector";
import { MedicationTracker } from "@/components/MedicationTracker";
import { EmergencyExit } from "@/components/EmergencyExit";
import { BottomNav } from "@/components/BottomNav";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
import { Heart, Shield, BookOpen, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { cacheContentForOffline } from "@/hooks/useOfflineStorage";
import heroImage from "@/assets/hero-sanctuary.jpg";

export default function Home() {
  const [userId, setUserId] = useState<string | undefined>();
  const { t } = useLanguage();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id);
    });

    // Cache content for offline use
    cacheContentForOffline();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <EmergencyExit />
      
      {/* Accessibility Toggle - Always visible */}
      <div className="fixed top-4 left-4 z-50">
        <AccessibilityToggle />
      </div>

      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80" />
        <div className="absolute top-4 right-16 z-20 flex items-center gap-2">
          <LanguageSelector />
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="bg-card/80 backdrop-blur" aria-label="Open settings">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="relative text-center px-6 z-10">
          <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">
            {t('home.greeting')}
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md">
            {t('home.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6 fade-in-up">
        {/* Daily Check-in */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Daily Check-in</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your emotions and health matter. Take a moment for both.
          </p>
          <MoodSelector />
        </section>

        {/* Health Routine */}
        <MedicationTracker userId={userId} />

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/threads">
              <Card className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <Users className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-sm">Community</h3>
                <p className="text-xs text-muted-foreground">Connect with others</p>
              </Card>
            </Link>

            <Link to="/learn">
              <Card className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <BookOpen className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-sm">Learn</h3>
                <p className="text-xs text-muted-foreground">Knowledge is power</p>
              </Card>
            </Link>

            <Link to="/reflect">
              <Card className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <Heart className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-sm">Reflect</h3>
                <p className="text-xs text-muted-foreground">Your wellness journey</p>
              </Card>
            </Link>

            <Link to="/crisis">
              <Card className="p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-destructive/5">
                <Shield className="h-8 w-8 text-destructive mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-sm">Crisis Mode</h3>
                <p className="text-xs text-muted-foreground">Immediate support</p>
              </Card>
            </Link>
          </div>
        </section>

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
