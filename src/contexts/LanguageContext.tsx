import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'tl' | 'ceb';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Home page
    'home.greeting': 'Welcome to Hearth',
    'home.subtitle': 'Your safe space for wellness and support',
    'home.mood.title': 'How are you feeling today?',
    'home.mood.great': 'Great',
    'home.mood.good': 'Good',
    'home.mood.okay': 'Okay',
    'home.mood.struggling': 'Struggling',
    'home.mood.needSupport': 'Need Support',
    'home.mood.supportMessage': "It's okay to reach out. You're not alone. 💗",
    'home.mood.thanksMessage': 'Thank you for sharing. Your feelings matter.',
    
    // Medication Tracker
    'med.title': 'Your Health Routine',
    'med.subtitle': 'ART Taken Today?',
    'med.taken': 'Yes, I\'ve taken it',
    'med.takenToday': 'Taken today',
    'med.remindLater': 'Remind me later',
    'med.streak': 'Adherence streak',
    'med.daysStrong': 'days strong',
    'med.dayStrong': 'day strong',
    'med.viewHistory': 'View Full History',
    'med.signInPrompt': 'Sign in to track your health routine',
    'med.successTitle': 'Great job!',
    'med.successMessage': 'Your health routine matters. Keep it up!',
    'med.reminderTitle': 'Reminder set',
    'med.reminderMessage': 'Gentle reminder: staying consistent keeps you strong.',
    
    // Medication History
    'medHistory.title': 'Your Health Progress',
    'medHistory.subtitle': 'Small steps, strong foundations. Every dose matters.',
    'medHistory.daysStrong': 'Days Strong',
    'medHistory.affirmation1': 'Healing isn\'t linear — consistency builds courage.',
    'medHistory.affirmation2': 'Every step forward matters, no matter how small.',
    'medHistory.affirmation3': 'Your commitment to yourself is powerful.',
    'medHistory.affirmation4': 'Progress, not perfection. You\'re doing great.',
    'medHistory.affirmation5': 'Taking care of yourself is an act of strength.',
    'medHistory.weeklyProgress': 'Weekly Progress',
    'medHistory.monthlySummary': 'Monthly Summary',
    'medHistory.completedThisMonth': 'You completed',
    'medHistory.thisMonth': 'this month',
    'medHistory.viewDetails': 'View Details',
    'medHistory.needHelp': 'Need help staying on track?',
    'medHistory.peerTips': 'Anonymous Peer Tips',
    'medHistory.setReminders': 'Set Reminder Preferences',
    'medHistory.backToCheckIn': 'Back to Daily Check-in',
    
    // Bottom Nav
    'nav.home': 'Home',
    'nav.threads': 'Threads',
    'nav.learn': 'Learn',
    'nav.reflect': 'Reflect',
    'nav.crisis': 'Crisis',
    
    // Emergency Exit
    'emergency.tooltip': 'Tap this if you need to quickly hide Hearth.',
    
    // Days of week
    'day.mon': 'Mon',
    'day.tue': 'Tue',
    'day.wed': 'Wed',
    'day.thu': 'Thu',
    'day.fri': 'Fri',
    'day.sat': 'Sat',
    'day.sun': 'Sun',
    
    // Status
    'status.taken': 'Taken',
    'status.reminder': 'Reminder Sent',
    'status.missed': 'Missed',
  },
  tl: {
    // Home page
    'home.greeting': 'Maligayang pagdating sa Hearth',
    'home.subtitle': 'Ang iyong ligtas na espasyo para sa kalusugan at suporta',
    'home.mood.title': 'Kumusta ka ngayong araw?',
    'home.mood.great': 'Napakaganda',
    'home.mood.good': 'Mabuti',
    'home.mood.okay': 'Okay lang',
    'home.mood.struggling': 'Nahihirapan',
    'home.mood.needSupport': 'Kailangan ng Suporta',
    'home.mood.supportMessage': 'Okay lang na humingi ng tulong. Hindi ka nag-iisa. 💗',
    'home.mood.thanksMessage': 'Salamat sa pagbahagi. Mahalaga ang iyong nararamdaman.',
    
    // Medication Tracker
    'med.title': 'Ang Iyong Kalusugang Gawain',
    'med.subtitle': 'Nainom na ba ang ART ngayong araw?',
    'med.taken': 'Oo, nainom ko na',
    'med.takenToday': 'Nainom na ngayong araw',
    'med.remindLater': 'Paalala mamaya',
    'med.streak': 'Sunod-sunod na araw',
    'med.daysStrong': 'araw na malakas',
    'med.dayStrong': 'araw na malakas',
    'med.viewHistory': 'Tingnan ang Buong Kasaysayan',
    'med.signInPrompt': 'Mag-sign in upang subaybayan ang iyong kalusugang gawain',
    'med.successTitle': 'Mahusay!',
    'med.successMessage': 'Mahalaga ang iyong kalusugang gawain. Ipagpatuloy!',
    'med.reminderTitle': 'Naka-set na ang paalala',
    'med.reminderMessage': 'Mahinahong paalala: ang pagiging tuloy-tuloy ay nagpapalakas sa iyo.',
    
    // Medication History
    'medHistory.title': 'Ang Iyong Pag-unlad sa Kalusugan',
    'medHistory.subtitle': 'Maliliit na hakbang, matatag na pundasyon. Bawat dosis ay mahalaga.',
    'medHistory.daysStrong': 'Araw na Malakas',
    'medHistory.affirmation1': 'Ang paggaling ay hindi tuwid — ang pagiging tuloy-tuloy ay bumubuo ng tapang.',
    'medHistory.affirmation2': 'Bawat hakbang pasulong ay mahalaga, gaano man kaliit.',
    'medHistory.affirmation3': 'Ang iyong pangako sa sarili ay makapangyarihan.',
    'medHistory.affirmation4': 'Pag-unlad, hindi perpeksyon. Mahusay ka.',
    'medHistory.affirmation5': 'Ang pag-aalaga sa sarili ay aksyon ng lakas.',
    'medHistory.weeklyProgress': 'Pag-unlad sa Linggo',
    'medHistory.monthlySummary': 'Buod ng Buwan',
    'medHistory.completedThisMonth': 'Natapos mo ang',
    'medHistory.thisMonth': 'ngayong buwan',
    'medHistory.viewDetails': 'Tingnan ang Mga Detalye',
    'medHistory.needHelp': 'Kailangan ng tulong para manatiling tuloy-tuloy?',
    'medHistory.peerTips': 'Mga Tip mula sa Kapwa (Walang Pangalan)',
    'medHistory.setReminders': 'I-set ang Mga Kagustuhan sa Paalala',
    'medHistory.backToCheckIn': 'Bumalik sa Arawang Pagsusuri',
    
    // Bottom Nav
    'nav.home': 'Home',
    'nav.threads': 'Threads',
    'nav.learn': 'Matuto',
    'nav.reflect': 'Mag-isip',
    'nav.crisis': 'Krisis',
    
    // Emergency Exit
    'emergency.tooltip': 'I-tap ito kung kailangan mong mabilis na itago ang Hearth.',
    
    // Days of week
    'day.mon': 'Lun',
    'day.tue': 'Mar',
    'day.wed': 'Miy',
    'day.thu': 'Huw',
    'day.fri': 'Biy',
    'day.sat': 'Sab',
    'day.sun': 'Lin',
    
    // Status
    'status.taken': 'Nainom',
    'status.reminder': 'May Paalala',
    'status.missed': 'Hindi Nainom',
  },
  ceb: {
    // Home page
    'home.greeting': 'Maayong pag-abot sa Hearth',
    'home.subtitle': 'Ang imong luwas nga luna para sa kaayohan ug suporta',
    'home.mood.title': 'Kumusta ka karon nga adlaw?',
    'home.mood.great': 'Maayo kaayo',
    'home.mood.good': 'Maayo',
    'home.mood.okay': 'Okay ra',
    'home.mood.struggling': 'Naglisod',
    'home.mood.needSupport': 'Nagkinahanglan og Tabang',
    'home.mood.supportMessage': 'Okay ra mangayo og tabang. Dili ka mag-inusara. 💗',
    'home.mood.thanksMessage': 'Salamat sa pagshare. Importante ang imong gibati.',
    
    // Medication Tracker
    'med.title': 'Ang Imong Kaayohan nga Rutina',
    'med.subtitle': 'Nainom na ba ang ART karon nga adlaw?',
    'med.taken': 'Oo, nainom na nako',
    'med.takenToday': 'Nainom na karon nga adlaw',
    'med.remindLater': 'Pahinumdomi ko unya',
    'med.streak': 'Sunod-sunod nga adlaw',
    'med.daysStrong': 'ka adlaw nga kusog',
    'med.dayStrong': 'ka adlaw nga kusog',
    'med.viewHistory': 'Tan-awa ang Tibuok Kasaysayan',
    'med.signInPrompt': 'Mag-sign in aron ma-track ang imong kaayohan nga rutina',
    'med.successTitle': 'Maayo kaayo!',
    'med.successMessage': 'Importante ang imong kaayohan nga rutina. Padayona!',
    'med.reminderTitle': 'Na-set na ang pahinumdom',
    'med.reminderMessage': 'Hinay nga pahinumdom: ang pagka-consistent nagpalig-on nimo.',
    
    // Medication History
    'medHistory.title': 'Ang Imong Pag-uswag sa Kaayohan',
    'medHistory.subtitle': 'Gamay nga tikang, lig-on nga pundasyon. Matag dosis importante.',
    'medHistory.daysStrong': 'Adlaw nga Lig-on',
    'medHistory.affirmation1': 'Ang pagkaayo dili tul-id — ang pagka-consistent nagbuild og kaisog.',
    'medHistory.affirmation2': 'Matag tikang paabante importante, bisan unsa ka gamay.',
    'medHistory.affirmation3': 'Ang imong commitment sa kaugalingon gamhanan.',
    'medHistory.affirmation4': 'Pag-uswag, dili perpeksyon. Maayo ka.',
    'medHistory.affirmation5': 'Ang pag-atiman sa kaugalingon usa ka buhat sa kalig-on.',
    'medHistory.weeklyProgress': 'Pag-uswag sa Semana',
    'medHistory.monthlySummary': 'Sumaryo sa Bulan',
    'medHistory.completedThisMonth': 'Nakompleto nimo ang',
    'medHistory.thisMonth': 'karong bulana',
    'medHistory.viewDetails': 'Tan-awa ang mga Detalye',
    'medHistory.needHelp': 'Nagkinahanglan og tabang aron magpabilin sa track?',
    'medHistory.peerTips': 'Mga Tip gikan sa Kapareha (Walay Ngalan)',
    'medHistory.setReminders': 'I-set ang mga Preference sa Pahinumdom',
    'medHistory.backToCheckIn': 'Balik sa Daily Check-in',
    
    // Bottom Nav
    'nav.home': 'Home',
    'nav.threads': 'Threads',
    'nav.learn': 'Pagkat-on',
    'nav.reflect': 'Pagpamalandong',
    'nav.crisis': 'Krisis',
    
    // Emergency Exit
    'emergency.tooltip': 'I-tap kini kung kinahanglan nimong dali nga itago ang Hearth.',
    
    // Days of week
    'day.mon': 'Lun',
    'day.tue': 'Mar',
    'day.wed': 'Miy',
    'day.thu': 'Huw',
    'day.fri': 'Biy',
    'day.sat': 'Sab',
    'day.sun': 'Dom',
    
    // Status
    'status.taken': 'Nainom',
    'status.reminder': 'May Pahinumdom',
    'status.missed': 'Wala Nainom',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('hearth-language');
    // Handle migration from old 'taglish' value
    if (saved === 'taglish') return 'en';
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('hearth-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
