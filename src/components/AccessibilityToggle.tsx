import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Accessibility, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface AccessibilityToggleProps {
  variant?: "icon" | "full";
}

export const AccessibilityToggle = ({ variant = "icon" }: AccessibilityToggleProps) => {
  const { accessibilityMode, setAccessibilityMode } = useAccessibility();

  if (variant === "full") {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant={accessibilityMode ? "default" : "outline"}
          size="sm"
          onClick={() => setAccessibilityMode(!accessibilityMode)}
          className="gap-2"
        >
          <Accessibility className="h-4 w-4" aria-hidden="true" />
          <span>{accessibilityMode ? "Accessibility On" : "Accessibility"}</span>
        </Button>
        <Link to="/settings">
          <Button variant="ghost" size="icon" aria-label="Open settings">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => setAccessibilityMode(!accessibilityMode)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            accessibilityMode 
              ? "bg-primary text-primary-foreground shadow-md" 
              : "bg-card border-2 border-border hover:bg-accent"
          }`}
          aria-label={accessibilityMode ? "Turn off accessibility mode" : "Turn on accessibility mode"}
          aria-pressed={accessibilityMode}
        >
          <Accessibility className="h-5 w-5" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p className="text-sm">
          {accessibilityMode ? "Accessibility mode is on — larger text, clearer labels" : "Turn on accessibility mode"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
