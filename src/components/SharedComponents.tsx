"use client";
import { motion } from "framer-motion";
import { PartyData } from "@/types/election";
import { C } from "@/lib/utils";

export function ShimmerBar({ pct, color, delay = 0.4 }: { pct: number; color: string; delay?: number }) {
  return (
    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
      <motion.div className="h-full rounded-full relative overflow-hidden shimmer-bar"
        initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2, ease: "easeOut", delay }}
        style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }} />
    </div>
  );
}

export function FloatingLogo({ party, size }: { party: PartyData; size: "xl" | "lg" | "md" | "sm" }) {
  const dim = { xl: "w-32 h-44 md:w-40 md:h-56", lg: "w-24 h-32 md:w-32 md:h-44", md: "w-20 h-28 md:w-24 md:h-32", sm: "w-10 h-10" }[size];
  const radius = size === "sm" ? "rounded-xl" : "rounded-2xl md:rounded-3xl";
  const c = C[party.color_theme] || C.gold;
  return (
    <motion.div
      className={`${dim} ${radius} overflow-hidden border-2 flex items-center justify-center shrink-0 cursor-default bg-stone-900`}
      style={{ borderColor: c.glow }}
      animate={{ y: [0, -7, 0] }} transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      whileHover={{ scale: 1.08, boxShadow: `0 0 32px ${c.glow}, 0 0 8px ${c.glow}` }}
    >
      {party.logo_url
        ? <img src={party.logo_url} alt={party.name} className="w-full h-full object-cover" />
        : <span className={`font-black text-base ${c.text}`}>{party.name.slice(0, 2)}</span>
      }
    </motion.div>
  );
}

export function LiveBadge() {
  return (
    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 border border-red-500/60 rounded-full px-3 py-1">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
      <span className="text-red-400 text-xs font-black tracking-widest uppercase">Live Counting</span>
    </motion.span>
  );
}
