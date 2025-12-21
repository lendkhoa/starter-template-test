import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/api";
import { LogIn } from "lucide-react";
import { toast } from "sonner";

interface LoginDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function LoginDialog({ trigger, onSuccess }: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await AuthService.login(email, password);
      handleSuccess();
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid credentials or server offline");
      toast.error("Login failed", {
        description: "Please check your credentials and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
        await AuthService.loginWithGoogle();
        handleSuccess();
    } catch (err) {
        console.error("Google login failed", err);
        setError("Google authentication failed");
        toast.error("Google Login failed");
    } finally {
        setLoading(false);
    }
  };

  const handleSuccess = () => {
      setOpen(false);
      toast.success("Welcome back!", {
        description: "You have successfully logged in."
      });
      if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="w-full mt-2">
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Enter your credentials or use a provider to access your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
            <Button variant="outline" type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Sign in with Google
            </Button>
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            
            {error && (
                <div className="text-xs text-red-500 font-medium">
                    {error}
                </div>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </div>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
