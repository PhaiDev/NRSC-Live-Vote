import { ArrowRight, BarChart3 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden w-full pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Live Voting Results 2026
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 mb-6 drop-shadow-sm">
          Real-time Election <br className="hidden md:block" /> Dashboard
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
          Track the latest candidate standings, view detailed voting statistics, 
          and experience the democratic process unfold in beautiful high-fidelity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <BarChart3 className="w-5 h-5" />
            View Leaderboard
          </button>
          
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 transition-all">
            Learn More
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="absolute left-1/2 top-40 -z-10 -translate-x-1/2 blur-3xl xl:-top-6 opacity-30 pointer-events-none" aria-hidden="true">
        <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
    </section>
  );
}
