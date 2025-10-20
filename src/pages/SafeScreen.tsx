import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SafeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Subtle way to return to the app after a delay
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Today's Weather</h1>
          <p className="text-muted-foreground">Your daily forecast</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current</p>
              <p className="text-4xl font-bold">24°C</p>
            </div>
            <Sun className="h-16 w-16 text-yellow-500" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Cloud className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Tomorrow</p>
              <p className="font-semibold">22°C</p>
            </div>
            <div className="text-center">
              <Sun className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <p className="text-xs text-muted-foreground">Wednesday</p>
              <p className="font-semibold">26°C</p>
            </div>
            <div className="text-center">
              <CloudRain className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <p className="text-xs text-muted-foreground">Thursday</p>
              <p className="font-semibold">20°C</p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Tap anywhere to continue
          </p>
        </div>
      </div>
    </div>
  );
}
