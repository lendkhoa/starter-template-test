import { MenuSlider } from "@/components/layout/MenuSlider";
import { Hero } from "@/components/landing/Hero";
import { ProfilePage } from "@/pages/ProfilePage";
import { Toaster } from "@/components/ui/sonner"
import { useEffect, useState } from "react";
import { useBoundSelectors } from "@/hooks/useBoundSelectors";

function App() {
  const { refreshUser } = useBoundSelectors();
  const [currentPage, setCurrentPage] = useState<'home' | 'profile'>('home');

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Listen for navigation events from MenuSlider
  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<{ path: string }>;
      if (customEvent.detail.path === '/profile') {
        setCurrentPage('profile');
      } else if (customEvent.detail.path === '/') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('navigate', handleNavigation);
    return () => window.removeEventListener('navigate', handleNavigation);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <MenuSlider />
      
      {/* Main Content */}
      <main className="relative z-0">
        {currentPage === 'home' ? <Hero /> : <ProfilePage />}
      </main>
      <Toaster />
    </div>
  );
}

export default App;
