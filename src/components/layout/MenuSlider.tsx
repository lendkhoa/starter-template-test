import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import { LogIn, LogOut, User, Settings, Sun, Moon, Laptop } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ui/theme-provider";
import { toast } from "sonner";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { useBoundSelectors, useSystemStore } from "@/hooks/useBoundSelectors";

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
  const { currentUser, isAuthenticated, logout } = useBoundSelectors();

  const handleLogout = () => {
    logout();
    toast.info("Logged out", {
        description: "See you next time!"
    });
  };

  if (!isAuthenticated) {
     return (
        <div className="w-full">
            <LoginDialog 
                trigger={
                    <Button className="w-full justify-start gap-2 shadow-sm font-semibold" size="lg">
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                    </Button>
                } 
                onSuccess={() => {
                   // We need to fetch the user after successful login if the dialog doesn't return it
                   // But LoginDialog handles the API call. 
                   // Ideally LoginDialog should call store.login() instead of AuthService directly
                   // For now, we will just trigger a refresh or let the socket update?
                   // No, let's just assume we reload or fetch.
                   // Actually best pattern: LoginDialog calls AuthService, then calls onSuccess.
                   // We should update the store here.
                   // However, the cleanest way is if LoginDialog uses the hook too.
                   // For this refactor, let's keep it simple:
                   // The store updates itself if we call refreshUser, or we can assume LoginDialog updates it.
                   // Let's rely on refreshUser() being called in onSuccess.
                   const { fetchCurrentUser } = useSystemStore.getState(); 
                   fetchCurrentUser();
                }} 
            />
        </div>
     );
  }

  return (
    <div className="group flex items-center justify-between gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:bg-muted/50">
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm ring-2 ring-background">
                <User className="h-5 w-5" />
            </div>
            <div className="flex flex-col truncate">
                <span className="truncate text-sm font-semibold leading-none text-foreground">{currentUser?.name || 'User'}</span>
                <span className="truncate text-xs text-muted-foreground mt-1">{currentUser?.email || 'user@example.com'}</span>
            </div>
        </div>
        
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="h-8 w-8 shrink-0 text-muted-foreground opacity-70 transition-all hover:bg-destructive/10 hover:text-destructive hover:opacity-100 group-hover:opacity-100"
        >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
        </Button>
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
                <Button variant="ghost" className="w-full justify-start gap-2 px-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
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
