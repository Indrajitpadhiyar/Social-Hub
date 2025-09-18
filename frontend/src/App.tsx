import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Dashboard from "./components/Dashboard";
import AuthForm from "./components/AuthForm";
import NotFound from "./pages/NotFound";
import Chat from "./components/Chat";
// import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthModeChange = (mode: "login" | "register") => {
    setAuthMode(mode);
  };

  if (loading) {
    return (
      <LoadingScreen isLoading={loading} onComplete={() => setLoading(false)} />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route
                path="/register"
                element={
                  <AuthForm
                    mode={authMode}
                    onModeChange={handleAuthModeChange}
                  />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/auth" element={<AuthForm />} /> */}
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
