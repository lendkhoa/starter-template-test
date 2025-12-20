import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import { AuthService } from "@/services/api";
import { LogIn, LogOut, User, Settings, Sun, Moon, Laptop } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ui/theme-provider";

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
      <SheetContent side="left" className="flex w-[300px] flex-col border-r border-border/40 bg-background/95 backdrop-blur-xl sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold tracking-tight text-foreground/90">
            Brand
          </SheetTitle>
        </SheetHeader>
        
        {/* Main Navigation Links Area - Grows to fill space */}
        <div className="flex-1 py-8">
            <nav className="flex flex-col space-y-2">
                {/* Fixed "Settings" Item with Submenu */}
                <div className="px-2">
                   <SettingsSubMenu />
                </div>
            </nav>
        </div>

        {/* Footer Area - User Profile & Auth */}
        <div className="border-t border-border/50 pt-4">
            <BackendHealthIndicator />
            <div className="mt-4">
                <AuthStatusSection />
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

function SettingsSubMenu() {
  const { setTheme } = useTheme();

  return (
    <div className="w-full">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
