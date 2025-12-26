import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AuthStatusSection } from "./AuthStatusSection";
import { BackendHealthIndicator } from "./BackendHealthIndicator";
import { SettingsSubMenu } from "./SettingsSubMenu";
import { WorkflowTriggerButton } from "./WorkflowTriggerButton";

/**
 * MenuSlider Component
 * 
 * Main navigation menu slider that appears from the left side.
 * Orchestrates all child components and manages the open/close state.
 */

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
                {/* Settings Submenu */}
                <div className="px-2">
                   <SettingsSubMenu />
                </div>
                
                {/* Workflow Trigger Button */}
                <div className="px-2">
                   <WorkflowTriggerButton />
                </div>
            </nav>
        </div>

        {/* Footer Area - Backend Health & User Profile */}
        <div className="border-t border-border/50 pt-4">
            <BackendHealthIndicator />
            <div className="mt-4">
                <AuthStatusSection onNavigate={() => setOpen(false)} />
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
