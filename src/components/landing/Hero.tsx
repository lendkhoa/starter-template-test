import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 text-center">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] animate-pulse" />
      <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] opacity-20 bg-blue-500/20 blur-[100px]" />
      
      <div className="z-10 max-w-4xl space-y-8">
        <div className="mx-auto w-fit rounded-full border border-border/50 bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur md:text-sm">
          🚀 Ready to deploy template
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
          <span className="block text-foreground">Build Faster with</span>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Premium Simplicity
          </span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl md:leading-relaxed">
          A flexible, hot-reloading template designed to support <span className="text-foreground font-semibold">any backend</span>. 
          Start with a clean slate, robust architecture, and scale indefinitely.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="h-14 w-full px-8 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 sm:w-auto">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="h-14 w-full px-8 text-base backdrop-blur-sm hover:bg-muted sm:w-auto">
            View Architecture
          </Button>
        </div>
      </div>
    </section>
  );
}
