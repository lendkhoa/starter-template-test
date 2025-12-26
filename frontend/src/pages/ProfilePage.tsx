import { useState } from "react";
import { useBoundSelectors } from "@/hooks/useBoundSelectors";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * ProfilePage Component
 * 
 * Modern, elegant user profile page with view and edit modes.
 * Modular design for easy testing and maintenance.
 */

export function ProfilePage() {
  const { currentUser, isAuthenticated } = useBoundSelectors();
  const [isEditing, setIsEditing] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Please sign in</h2>
          <p className="mt-2 text-muted-foreground">
            You need to be logged in to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/' } }))}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Profile Content */}
        <div className="space-y-6">
          {/* Header Section */}
          <ProfileHeader
            user={currentUser}
            isEditing={isEditing}
            onEditToggle={() => setIsEditing(!isEditing)}
          />

          {/* Stats Section */}
          {!isEditing && <ProfileStats />}

          {/* Profile Form */}
          <ProfileForm
            user={currentUser}
            isEditing={isEditing}
            onCancel={() => setIsEditing(false)}
            onSave={() => setIsEditing(false)}
          />
        </div>
      </div>
    </div>
  );
}
