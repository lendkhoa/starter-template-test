import { MenuSlider } from "@/components/layout/MenuSlider";
import { Hero } from "@/components/landing/Hero";

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <MenuSlider />
      
      {/* Main Content */}
      <main className="relative z-0">
        <Hero />
      </main>
    </div>
  );
}

export default App;
