import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

export const EmergencyExit = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleEmergencyExit = () => {
    navigate("/safe");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleEmergencyExit}
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-card border-2 border-border hover:bg-accent transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-110"
          aria-label="Emergency exit"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left" className="max-w-xs">
        <p className="text-sm">{t('emergency.tooltip')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
