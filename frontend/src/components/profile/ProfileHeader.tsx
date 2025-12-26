import { Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  user: { name?: string; email?: string } | null;
  isEditing: boolean;
  onEditToggle: () => void;
}

/**
 * ProfileHeader Component
 * 
 * Displays user avatar, name, and edit toggle button.
 * Modern card design with gradient accents.
 */

export function ProfileHeader({ user, isEditing, onEditToggle }: ProfileHeaderProps) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
      {/* Gradient Accent */}
      <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-3xl" />
      
      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* Avatar */}
        <Avatar className="h-24 w-24 border-4 border-background shadow-lg ring-2 ring-primary/20">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {user?.name || "User"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
          
          {/* Edit Badge */}
          {isEditing && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
              <Edit2 className="h-3 w-3" />
              Editing Mode
            </div>
          )}
        </div>

        {/* Edit Button */}
        <Button
          onClick={onEditToggle}
          variant={isEditing ? "default" : "outline"}
          className="gap-2"
          size="lg"
        >
          {isEditing ? (
            <>
              <Check className="h-4 w-4" />
              Done
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
