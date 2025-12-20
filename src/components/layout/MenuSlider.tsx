import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useHealthCheck } from "@/hooks/useHealthCheck";

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
