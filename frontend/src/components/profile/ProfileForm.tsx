import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, X } from "lucide-react";
import { toast } from "sonner";

interface ProfileFormProps {
  user: { name?: string; email?: string } | null;
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
}

/**
 * ProfileForm Component
 * 
 * Displays user information in view or edit mode.
 * Handles form validation and submission.
 */

export function ProfileForm({ user, isEditing, onCancel, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    // TODO: Call API to update user profile
    toast.success("Profile updated successfully!");
    onSave();
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
    onCancel();
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur-sm">
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        {isEditing ? "Edit Information" : "Personal Information"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          {isEditing ? (
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          ) : (
            <div className="rounded-lg border border-border/50 bg-muted/30 px-4 py-3 text-foreground">
              {user?.name || "Not set"}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          {isEditing ? (
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          ) : (
            <div className="rounded-lg border border-border/50 bg-muted/30 px-4 py-3 text-foreground">
              {user?.email || "Not set"}
            </div>
          )}
        </div>

        {/* Additional Fields (placeholder for future expansion) */}
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium">
            Bio
          </Label>
          {isEditing ? (
            <textarea
              id="bio"
              rows={4}
              placeholder="Tell us about yourself..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          ) : (
            <div className="rounded-lg border border-border/50 bg-muted/30 px-4 py-3 text-muted-foreground">
              No bio added yet
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
