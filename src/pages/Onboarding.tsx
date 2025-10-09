import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, Heart, Users, User, Smile, Star, Sparkles, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import iconCare from "@/assets/icon-care.png";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [ageGroup, setAgeGroup] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const avatarOptions = [
    { id: "user", icon: User, color: "bg-primary/20 text-primary" },
    { id: "smile", icon: Smile, color: "bg-accent/20 text-accent" },
    { id: "star", icon: Star, color: "bg-sanctuary/20 text-sanctuary" },
    { id: "sparkles", icon: Sparkles, color: "bg-primary/20 text-primary" },
    { id: "sun", icon: Sun, color: "bg-accent/20 text-accent" },
    { id: "moon", icon: Moon, color: "bg-sanctuary/20 text-sanctuary" },
  ];

  const handleComplete = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 fade-in-up">
        {/* Logo/Icon */}
        <div className="text-center">
          <img src={iconCare} alt="Hearth" className="w-24 h-24 mx-auto mb-4 animate-breathe" />
          <h1 className="text-3xl font-bold text-primary">Welcome to Hearth</h1>
          <p className="text-muted-foreground mt-2">Your digital safe space</p>
        </div>

        {step === 1 && (
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Your Privacy Matters</h3>
                  <p className="text-sm text-muted-foreground">
                    Your identity is protected. You are in control. All conversations are confidential.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Safe by Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Built following RA 11166 principles: dignity, inclusivity, and informed consent.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">You're Not Alone</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with a supportive community that understands your journey.
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={() => setStep(2)} variant="sanctuary" className="w-full" size="lg">
              Continue
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Personalize Your Experience</h2>
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-medium mb-2 block">Age Group</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["Teen (13-19)", "Adult (20+)"].map((group) => (
                      <Button
                        key={group}
                        variant={ageGroup === group ? "default" : "soft"}
                        onClick={() => setAgeGroup(group)}
                        className="w-full"
                      >
                        {group}
                      </Button>
                    ))}
                  </div>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Choose Your Avatar</h3>
              <div className="grid grid-cols-6 gap-2">
                {avatarOptions.map((avatar) => {
                  const Icon = avatar.icon;
                  return (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`relative transition-all ${
                        selectedAvatar === avatar.id ? "scale-110" : "hover:scale-105"
                      }`}
                    >
                      <Avatar className={`w-12 h-12 ${avatar.color} ${
                        selectedAvatar === avatar.id ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}>
                        <AvatarFallback className={avatar.color}>
                          <Icon className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleComplete} 
                variant="sanctuary" 
                className="flex-1"
                disabled={!ageGroup || !selectedAvatar}
              >
                Get Started
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
