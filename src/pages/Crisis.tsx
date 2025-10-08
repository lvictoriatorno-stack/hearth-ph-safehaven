import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { Phone, Heart, MapPin, Shield, AlertCircle } from "lucide-react";

const crisisOptions = [
  {
    title: "Emotional Support",
    description: "Talk to a trained counselor now",
    icon: Heart,
    color: "bg-blue-500",
    action: "NCMH Crisis Hotline: 0917-899-USAP (8727)",
  },
  {
    title: "Medical Help",
    description: "Connect to HIV care services",
    icon: MapPin,
    color: "bg-green-500",
    action: "Find nearest DOH-accredited clinic",
  },
  {
    title: "Faith Support",
    description: "Speak with a faith counselor",
    icon: Shield,
    color: "bg-purple-500",
    action: "Connect with verified faith partners",
  },
];

export default function Crisis() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header - Critical Alert Style */}
      <div className="bg-destructive/10 border-b border-destructive/20 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive animate-gentle-pulse" />
            <div>
              <h1 className="text-2xl font-bold text-destructive">Crisis Mode</h1>
              <p className="text-sm text-muted-foreground">Immediate support available 24/7</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Emergency Notice */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex gap-3">
            <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">You Are Not Alone</h3>
              <p className="text-sm text-muted-foreground">
                These are confidential, safe resources. Your privacy is protected. 
                Reaching out is a sign of strength.
              </p>
            </div>
          </div>
        </Card>

        {/* Crisis Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Choose Support Type</h2>
          {crisisOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all">
                <div className="flex gap-4 items-start mb-4">
                  <div className={`p-3 rounded-2xl ${option.color} bg-opacity-20`}>
                    <Icon className={`h-6 w-6`} style={{ color: option.color.replace('bg-', '') }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <Button variant="crisis" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  {option.action}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Additional Resources */}
        <Card className="p-6 bg-muted/30">
          <h3 className="font-semibold mb-3 text-sm">Other Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• DOH HIV/AIDS Registry: 02-8651-7800</li>
            <li>• Hopeline: 0917-558-HOPE (4673)</li>
            <li>• In Touch Community Services: (02) 8893-7603</li>
          </ul>
        </Card>

        {/* Reassurance */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/20">
          <p className="text-center text-sm italic">
            "Healing is personal. Take your time. You matter. 💗"
          </p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
