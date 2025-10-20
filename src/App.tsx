import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Threads from "./pages/Threads";
import ThreadDetail from "./pages/ThreadDetail";
import Learn from "./pages/Learn";
import Reflect from "./pages/Reflect";
import Crisis from "./pages/Crisis";
import SafeScreen from "./pages/SafeScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
