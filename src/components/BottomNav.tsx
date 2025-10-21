import { Home, MessageCircle, BookOpen, Heart, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const getNavItems = (t: (key: string) => string) => [
  { path: "/home", icon: Home, label: t('nav.home') },
  { path: "/threads", icon: MessageCircle, label: t('nav.threads') },
  { path: "/learn", icon: BookOpen, label: t('nav.learn') },
  { path: "/reflect", icon: Heart, label: t('nav.reflect') },
  { path: "/crisis", icon: Shield, label: t('nav.crisis') },
];

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const navItems = getNavItems(t);
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "h-6 w-6 transition-all",
                  isActive && "animate-breathe"
                )} 
              />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
