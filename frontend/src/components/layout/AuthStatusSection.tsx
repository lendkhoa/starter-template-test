import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { useBoundSelectors, useSystemStore } from "@/hooks/useBoundSelectors";

interface AuthStatusSectionProps {
  onNavigate: () => void;
}

/**
 * AuthStatusSection Component
 * 
 * Displays user authentication status and profile.
 * Shows login button when not authenticated, or user info with logout when authenticated.
 */

export function AuthStatusSection({ onNavigate }: AuthStatusSectionProps) {
  const { currentUser, isAuthenticated, logout } = useBoundSelectors();

  const handleLogout = () => {
    logout();
    toast.info("Logged out", {
        description: "See you next time!"
    });
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    window.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/profile' } }));
    // Close the menu
    onNavigate();
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
                   const { fetchCurrentUser } = useSystemStore.getState(); 
                   fetchCurrentUser();
                }} 
            />
        </div>
     );
  }

  return (
    <div className="group flex items-center justify-between gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:bg-muted/50">
        {/* Clickable Avatar Area */}
        <button
          onClick={handleProfileClick}
          className="flex flex-1 items-center gap-3 overflow-hidden text-left transition-opacity hover:opacity-80"
        >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-sm ring-2 ring-gray-200 transition-transform hover:scale-105 dark:ring-gray-700">
                <User className="h-5 w-5" />
            </div>
            <div className="flex flex-col truncate">
                <span className="truncate text-sm font-semibold leading-none text-foreground">{currentUser?.name || 'User'}</span>
                <span className="truncate text-xs text-muted-foreground mt-1">{currentUser?.email || 'user@example.com'}</span>
            </div>
        </button>
        
        {/* Logout Button */}
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
