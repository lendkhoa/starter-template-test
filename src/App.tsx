import { MenuSlider } from "@/components/layout/MenuSlider";
import { Hero } from "@/components/landing/Hero";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <MenuSlider />
      
      {/* Main Content */}
      <main className="relative z-0">
        <Hero />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
