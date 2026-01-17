import { useAccessibility } from "@/contexts/AccessibilityContext";
import { WifiOff, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export const OfflineIndicator = () => {
  const { isOnline } = useAccessibility();
  const [showReconnected, setShowReconnected] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline && isOnline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (isOnline && !showReconnected) return null;

  return (
    <div 
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
        isOnline 
          ? "bg-green-500/90 text-white" 
          : "bg-muted border border-border text-foreground"
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4" aria-hidden="true" />
          <span>Back online</span>
          <span className="sr-only">Your internet connection has been restored</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" aria-hidden="true" />
          <span>Offline — saved content still available</span>
          <span className="sr-only">You are currently offline. Previously saved content is still available.</span>
        </>
      )}
    </div>
  );
};
