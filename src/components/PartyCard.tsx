"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { PartyData } from "@/types/election";
import { getPct, C, itemVariants } from "@/lib/utils";
import { ShimmerBar } from "./SharedComponents";
import { X, Instagram, User, Award, Quote } from "lucide-react";

export default function PartyCard({ party, total, rank }: { party: PartyData; total: number; rank: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const c = C[party.color_theme] || C.gold;
  const pct = parseFloat(getPct(party.votes, total));

  return (
    <>
      <motion.div
        ref={ref}
        variants={itemVariants}
        onClick={() => setIsOpen(true)}
        className={`relative group cursor-pointer rounded-2xl overflow-hidden glass-card-${party.color_theme} transition-all hover:shadow-lg`}
        whileHover={{ y: -5, scale: 1.01 }}
      >
        <div className="p-4 flex items-center gap-4">
          {/* Small Avatar/Logo */}
          <div className="relative shrink-0">
            <div className={`w-16 h-16 rounded-full border-2 ${c.border} overflow-hidden bg-white`}>
              {party.president_photo_url ? (
                <img src={party.president_photo_url} className="w-full h-full object-cover" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl text-stone-400">👤</div>
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-lg border ${c.border} bg-white flex items-center justify-center overflow-hidden shadow-sm`}>
              {party.logo_url ? <img src={party.logo_url} className="w-full h-full object-cover" alt="" /> : <span className={`text-[10px] font-black ${c.text}`}>{party.number}</span>}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.badge}`}>เบอร์ {party.number}</span>
              {rank === 1 && <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">LEADING</span>}
            </div>
            <h3 className={`text-lg font-black ${c.text} truncate`}>{party.name}</h3>
            <div className="flex items-baseline gap-2 mt-1">
               <span className={`text-2xl font-black tabular-nums ${c.text}`}>
                {inView ? <CountUp end={party.votes} duration={2} separator="," preserveValue /> : "0"}
              </span>
              <span className={`text-xs font-bold ${c.dim}`}>{pct.toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="hidden md:block">
             <motion.div 
               className={`w-8 h-8 rounded-full border ${c.border} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
             >
               <Award size={14} className={c.text} />
             </motion.div>
          </div>
        </div>
        <div className="px-4 pb-3">
           <ShimmerBar pct={pct} color={party.color_hex} />
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-white/40 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl glass-card-${party.color_theme} border-stone-200`}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/50 text-stone-600 flex items-center justify-center hover:bg-white/80 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative">
                {/* Header Background */}
                <div className={`h-32 bg-gradient-to-br ${c.bar} opacity-20`} />
                
                <div className="px-6 pb-8 -mt-16 relative z-10 text-center">
                  <div className="inline-block relative mb-4">
                    <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 ${c.border} overflow-hidden bg-stone-100 shadow-xl mx-auto`}>
                      {party.president_photo_url ? (
                        <img src={party.president_photo_url} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl text-stone-400">👤</div>
                      )}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 ${c.border} bg-white shadow-lg flex items-center justify-center overflow-hidden`}>
                       {party.logo_url ? <img src={party.logo_url} className="w-full h-full object-cover" alt="" /> : <span className={`text-xl font-black ${c.text}`}>{party.number}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1 mb-6">
                    <span className={`text-xs font-black px-3 py-1 rounded-full mb-2 ${c.badge}`}>เบอร์ {party.number}</span>
                    <h2 className={`text-3xl md:text-4xl font-black ${c.text}`}>{party.name}</h2>
                    <p className="text-stone-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                      <User size={14} /> {party.president_name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/60 rounded-2xl p-4 border border-stone-200 shadow-sm">
                       <p className="text-stone-500 text-xs font-bold uppercase mb-1">Total Votes</p>
                       <p className={`text-3xl font-black ${c.text}`}><CountUp end={party.votes} duration={2} separator="," /></p>
                    </div>
                    <div className="bg-white/60 rounded-2xl p-4 border border-stone-200 shadow-sm">
                       <p className="text-stone-500 text-xs font-bold uppercase mb-1">Percentage</p>
                       <p className={`text-3xl font-black ${c.text}`}>{pct.toFixed(1)}%</p>
                    </div>
                  </div>

                  {party.slogan && (
                    <div className="mb-8 p-6 bg-white/40 rounded-2xl border border-stone-200 italic text-stone-600 relative shadow-sm">
                      <Quote className="absolute -top-3 -left-1 text-stone-300 opacity-50" size={32} />
                      <p className="text-lg">"{party.slogan}"</p>
                    </div>
                  )}

                  {party.instagram_url && (
                    <a 
                      href={party.instagram_url} 
                      target="_blank" 
                      className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-base font-black transition-all hover:scale-[1.02] active:scale-[0.98] ${c.insta}`}
                    >
                      <Instagram size={20} /> FOLLOW ON INSTAGRAM
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
