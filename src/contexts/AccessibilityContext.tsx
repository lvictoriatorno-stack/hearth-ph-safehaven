import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
  accessibilityMode: boolean;
  calmView: boolean;
  offlineMode: boolean;
  hideNotifications: boolean;
}

interface AccessibilityContextType extends AccessibilitySettings {
  setAccessibilityMode: (enabled: boolean) => void;
  setCalmView: (enabled: boolean) => void;
  setOfflineMode: (enabled: boolean) => void;
  setHideNotifications: (enabled: boolean) => void;
  isOnline: boolean;
}

const defaultSettings: AccessibilitySettings = {
  accessibilityMode: false,
  calmView: false,
  offlineMode: false,
  hideNotifications: true, // Default to hiding notifications for privacy
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('hearth-accessibility');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('hearth-accessibility', JSON.stringify(settings));
  }, [settings]);

  // Apply accessibility mode styles
  useEffect(() => {
    if (settings.accessibilityMode) {
      document.documentElement.classList.add('accessibility-mode');
    } else {
      document.documentElement.classList.remove('accessibility-mode');
    }
  }, [settings.accessibilityMode]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setAccessibilityMode = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, accessibilityMode: enabled }));
  };

  const setCalmView = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, calmView: enabled }));
  };

  const setOfflineMode = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, offlineMode: enabled }));
  };

  const setHideNotifications = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, hideNotifications: enabled }));
  };

  return (
    <AccessibilityContext.Provider value={{
      ...settings,
      setAccessibilityMode,
      setCalmView,
      setOfflineMode,
      setHideNotifications,
      isOnline,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
