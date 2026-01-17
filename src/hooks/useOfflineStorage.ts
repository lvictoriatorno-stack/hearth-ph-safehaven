import { useState, useEffect } from 'react';

interface OfflineReflection {
  id: string;
  mood: string;
  note?: string;
  timestamp: string;
  synced: boolean;
}

const STORAGE_KEY = 'hearth-offline-reflections';
const CACHED_CONTENT_KEY = 'hearth-cached-content';

export const useOfflineStorage = () => {
  const [pendingReflections, setPendingReflections] = useState<OfflineReflection[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPendingReflections(JSON.parse(saved));
    }
  }, []);

  const saveReflection = (mood: string, note?: string) => {
    const reflection: OfflineReflection = {
      id: crypto.randomUUID(),
      mood,
      note,
      timestamp: new Date().toISOString(),
      synced: false,
    };

    const updated = [...pendingReflections, reflection];
    setPendingReflections(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return reflection;
  };

  const markAsSynced = (ids: string[]) => {
    const updated = pendingReflections.map(r => 
      ids.includes(r.id) ? { ...r, synced: true } : r
    );
    setPendingReflections(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const getUnsyncedReflections = () => {
    return pendingReflections.filter(r => !r.synced);
  };

  const clearSynced = () => {
    const unsynced = pendingReflections.filter(r => !r.synced);
    setPendingReflections(unsynced);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unsynced));
  };

  return {
    pendingReflections,
    saveReflection,
    markAsSynced,
    getUnsyncedReflections,
    clearSynced,
  };
};

// Cache educational and crisis content for offline access
export const cacheContentForOffline = () => {
  const content = {
    crisisHotlines: [
      {
        title: "NCMH Crisis Hotline",
        description: "24/7 mental health emergency support",
        phone: "09178998727",
        display: "0917-899-USAP (8727)",
      },
      {
        title: "DOH HIV/AIDS Registry",
        description: "HIV testing, treatment and counseling",
        phone: "0286517800",
        display: "02-8651-7800",
      },
      {
        title: "Hopeline Philippines",
        description: "Crisis intervention and suicide prevention",
        phone: "09175584673",
        display: "0917-558-HOPE (4673)",
      },
      {
        title: "In Touch Community",
        description: "LGBTQ+ support and counseling",
        phone: "0288937603",
        display: "(02) 8893-7603",
      },
    ],
    clinics: [
      {
        name: "San Lazaro Hospital",
        address: "Quiricada St, Santa Cruz, Manila",
        services: "HIV Testing & Treatment",
      },
      {
        name: "Philippine General Hospital",
        address: "Taft Avenue, Ermita, Manila",
        services: "HIV Clinic & Counseling",
      },
      {
        name: "Quezon City Health Department",
        address: "Quezon Avenue, Quezon City",
        services: "Free HIV Testing",
      },
    ],
    cachedAt: new Date().toISOString(),
  };

  localStorage.setItem(CACHED_CONTENT_KEY, JSON.stringify(content));
  return content;
};

export const getCachedContent = () => {
  const saved = localStorage.getItem(CACHED_CONTENT_KEY);
  return saved ? JSON.parse(saved) : null;
};
