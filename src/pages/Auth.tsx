import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Accessibility } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Welcome to Hearth. Your anonymous alias has been created.",
        });

        navigate("/home");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });

        navigate("/home");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Discreet accessibility access */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to="/settings"
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-card border border-border hover:bg-accent transition-colors"
            aria-label="Accessibility settings"
          >
            <Accessibility className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p className="text-sm">Accessibility settings</p>
        </TooltipContent>
      </Tooltip>

      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Hearth</h1>
          <p className="text-sm text-muted-foreground text-center">
            A safe, anonymous space for healing and support
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            variant="sanctuary"
            disabled={loading}
          >
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Need an account? Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Your identity remains anonymous. We only use your email for account security.
          </p>
        </div>
      </Card>
    </div>
  );
}
