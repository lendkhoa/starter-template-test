import { Button } from "@/components/ui/button";
import { Settings, Sun, Moon, Laptop } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ui/theme-provider";

/**
 * SettingsSubMenu Component
 * 
 * Dropdown menu for app settings.
 * Currently provides theme switching (light/dark/system).
 */

export function SettingsSubMenu() {
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
