import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Threads from "./pages/Threads";
import ThreadDetail from "./pages/ThreadDetail";
import Learn from "./pages/Learn";
import Reflect from "./pages/Reflect";
import Crisis from "./pages/Crisis";
import SafeScreen from "./pages/SafeScreen";
import Settings from "./pages/Settings";
import MedicationHistory from "./pages/MedicationHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AccessibilityProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <OfflineIndicator />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Onboarding />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/home" element={<Home />} />
              <Route path="/threads" element={<Threads />} />
              <Route path="/thread/:id" element={<ThreadDetail />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/reflect" element={<Reflect />} />
              <Route path="/crisis" element={<Crisis />} />
              <Route path="/safe" element={<SafeScreen />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/medication-history" element={<MedicationHistory />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
