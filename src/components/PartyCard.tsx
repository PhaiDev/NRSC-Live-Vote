"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { PartyData } from "@/types/election";
import { getPct, C, itemVariants } from "@/lib/utils";
import { FloatingLogo, ShimmerBar } from "./SharedComponents";

export default function PartyCard({ party, total, rank }: { party: PartyData; total: number; rank: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const c = C[party.color_theme] || C.gold;
  const pct = parseFloat(getPct(party.votes, total));

  return (
    <motion.div ref={ref} variants={itemVariants} className={`relative rounded-2xl overflow-hidden glass-card-${party.color_theme}`} whileHover={{ y: -3 }}>
      <motion.div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${c.bar}`} initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} />
      <div className="p-4">
        <div className="flex gap-3 items-start">
          <FloatingLogo party={party} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${c.badge}`}>เบอร์ {party.number}</span>
              {rank === 1 && (
                <motion.span className="text-yellow-400 text-sm font-bold flex items-center gap-1"
                  animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  นำอยู่
                </motion.span>
              )}
            </div>
            <h3 className={`text-xl font-black ${c.text} leading-tight`}>{party.name}</h3>
            <p className="text-sm text-stone-400 mt-1 line-clamp-2">{party.slogan}</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-baseline gap-3 mb-2">
            <span className={`text-4xl font-black tabular-nums ${c.text}`}>
              {inView ? <CountUp end={party.votes} duration={2} separator="," preserveValue /> : "0"}
            </span>
            <span className={`text-base font-bold ${c.dim}`}>{pct.toFixed(1)}%</span>
          </div>
          <ShimmerBar pct={pct} color={party.color_hex} />
        </div>
        {party.instagram_url && (
          <motion.a href={party.instagram_url} target="_blank" className={`mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold border transition-colors ${c.insta}`}>
            IG: {party.name}
          </motion.a>
        )}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 md:gap-4">
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full shrink-0 border-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] ${c.border} overflow-hidden bg-stone-900 flex items-center justify-center text-xl`}>
            {party.president_photo_url ? <img src={party.president_photo_url} className="w-full h-full object-cover" alt="" /> : "👤"}
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-stone-500">ประธานนักเรียน</p>
            <p className="text-base md:text-lg font-bold text-white truncate">{party.president_name}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
