import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Shield, Heart, Users } from "lucide-react";
import iconCare from "@/assets/icon-care.png";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [ageGroup, setAgeGroup] = useState("");
  const [consents, setConsents] = useState({
    peerChat: false,
    faithSupport: false,
    dailyReflections: false,
  });

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
              <h3 className="text-sm font-medium mb-3">Optional Features (you can change these later)</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox 
                    checked={consents.peerChat}
                    onCheckedChange={(checked) => 
                      setConsents({...consents, peerChat: checked as boolean})
                    }
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Anonymous Peer Chat</span>
                    <p className="text-xs text-muted-foreground">Connect with others safely</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox 
                    checked={consents.faithSupport}
                    onCheckedChange={(checked) => 
                      setConsents({...consents, faithSupport: checked as boolean})
                    }
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Faith Support</span>
                    <p className="text-xs text-muted-foreground">Access spiritual guidance</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox 
                    checked={consents.dailyReflections}
                    onCheckedChange={(checked) => 
                      setConsents({...consents, dailyReflections: checked as boolean})
                    }
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Daily Reflections</span>
                    <p className="text-xs text-muted-foreground">Gentle reminders & prompts</p>
                  </div>
                </label>
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
                disabled={!ageGroup}
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
