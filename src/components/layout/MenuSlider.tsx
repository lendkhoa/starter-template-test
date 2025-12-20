import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import { AuthService } from "@/services/api";
import { LogIn, LogOut, User } from "lucide-react";

export function MenuSlider() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 transition-transform hover:scale-110 md:top-6 md:left-6">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] border-r border-border/40 bg-background/95 backdrop-blur-xl sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold tracking-tight text-foreground/90">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
            <AuthStatusSection />
            
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border p-4 text-muted-foreground bg-muted/20 animate-in fade-in zoom-in duration-500">
              <span className="font-medium">Empty Menu Slider</span>
              <span className="text-xs opacity-70 mt-2 text-center text-balance">The structure is ready for your dynamic links.</span>
            </div>
            
            <BackendHealthIndicator />

            {/* Example Connectivity Note */}
            <div className="rounded-lg bg-blue-50/50 p-4 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              <strong>Strategy Note:</strong> Connect this component to a <code>useMenu()</code> hook to load items from any backend.
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function AuthStatusSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  // Login Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        await AuthService.login(email, password);
        setIsLoggedIn(true);
        setOpen(false); // Close dialog
    } catch (err) {
        console.error("Login failed", err);
        setError("Invalid credentials or server offline");
    } finally {
        setLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isLoggedIn ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <User className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{isLoggedIn ? 'Admin User' : 'Guest'}</span>
                    <span className="text-xs text-muted-foreground">{isLoggedIn ? 'admin@example.com' : 'Not logged in'}</span>
                </div>
            </div>
        </div>

        {isLoggedIn ? (
            <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2" 
                onClick={handleLogout}
            >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
        ) : (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="w-full mt-2">
                         <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                        <DialogDescription>
                            Enter your credentials to access your account.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="grid gap-4 py-4">
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
                            <Button type="submit" disabled={loading}>
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        )}
    </div>
  );
}

function BackendHealthIndicator() {
  const { data, loading, error } = useHealthCheck();

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3 text-sm shadow-sm">
      <span className="text-muted-foreground">Backend Status</span>
      {loading ? (
        <span className="flex items-center text-yellow-500 animate-pulse">
          <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></span> Connecting...
        </span>
      ) : error ? (
        <span className="flex items-center text-red-500">
          <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span> Offline
        </span>
      ) : (
        <span className="flex items-center text-green-500">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span> Online ({data?.version})
        </span>
      )}
    </div>
  );
}
