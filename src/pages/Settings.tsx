import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/BottomNav";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Accessibility, 
  Eye, 
  WifiOff, 
  BellOff, 
  Shield, 
  ArrowLeft,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { 
    accessibilityMode, 
    setAccessibilityMode,
    calmView,
    setCalmView,
    offlineMode,
    setOfflineMode,
    hideNotifications,
    setHideNotifications,
    isOnline
  } = useAccessibility();
  const { t } = useLanguage();

  const settingGroups = [
    {
      title: "Comfort & Accessibility",
      description: "Make the app easier to use",
      icon: Heart,
      settings: [
        {
          id: "accessibility",
          icon: Accessibility,
          title: "Accessibility Mode",
          description: "Larger text, clearer labels, simpler layout. Good for when you're tired or overwhelmed.",
          value: accessibilityMode,
          onChange: setAccessibilityMode,
        },
        {
          id: "calm",
          icon: Eye,
          title: "Calm View",
          description: "Show fewer posts in Community. Protect yourself from emotional overload.",
          value: calmView,
          onChange: setCalmView,
        },
      ]
    },
    {
      title: "Privacy & Safety",
      description: "Keep your information private",
      icon: Shield,
      settings: [
        {
          id: "notifications",
          icon: BellOff,
          title: "Hide Notifications",
          description: "No pop-ups or alerts that could be seen by others. Your privacy matters.",
          value: hideNotifications,
          onChange: setHideNotifications,
        },
        {
          id: "offline",
          icon: WifiOff,
          title: "Offline Mode",
          description: "Save resources for viewing without internet. Your reflections sync when you're back online.",
          value: offlineMode,
          onChange: setOfflineMode,
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/home">
              <Button variant="ghost" size="icon" aria-label="Go back to home">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-primary">Settings</h1>
              <p className="text-sm text-muted-foreground">Your comfort, your way</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Connection Status */}
        {!isOnline && (
          <Card className="p-4 bg-muted/50 border-muted">
            <div className="flex items-center gap-3">
              <WifiOff className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="font-medium">You're offline</p>
                <p className="text-sm text-muted-foreground">
                  No worries — saved content is still available
                </p>
              </div>
            </div>
          </Card>
        )}

        {settingGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <div key={group.title} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <GroupIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold">{group.title}</h2>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                </div>
              </div>
              
              {group.settings.map((setting) => {
                const Icon = setting.icon;
                return (
                  <Card key={setting.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-accent" aria-hidden="true">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label 
                          htmlFor={setting.id}
                          className="font-medium block cursor-pointer"
                        >
                          {setting.title}
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {setting.description}
                        </p>
                      </div>
                      <Switch
                        id={setting.id}
                        checked={setting.value}
                        onCheckedChange={setting.onChange}
                        aria-describedby={`${setting.id}-description`}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          );
        })}

        {/* Reassurance */}
        <Card className="p-5 bg-gradient-to-br from-primary/5 to-accent/20">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Your choices are saved on this device only.</strong>
            <br />
            No one else can see your settings.
          </p>
        </Card>

        {/* Quick Exit Reminder */}
        <Card className="p-4 border-muted">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-muted" aria-hidden="true">
              <Shield className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Quick Exit</p>
              <p className="text-sm text-muted-foreground mt-1">
                Tap the X button in the top-right corner of any page to quickly hide the app. 
                It will show a neutral weather screen.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
