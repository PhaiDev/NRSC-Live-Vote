"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { PartyData } from "@/types/election";
import { getPct, fmtNum, itemVariants, slideLeft, slideRight, C } from "@/lib/utils";

export default function BattleSection({ parties, total }: { parties: PartyData[]; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  if (parties.length < 2) return null;
  const sorted = [...parties].sort((a, b) => b.votes - a.votes);
  const [p1, p2] = sorted;
  const lead = p1.votes - p2.votes;

  const CandidateDisplay = ({ party, rank, align }: { party: PartyData; rank: number; align: "left" | "right" }) => {
    const isGold = party.color_theme === "gold";
    const c = C[party.color_theme] || C.gold;
    const variants = align === "left" ? slideLeft : slideRight;
    const gradient = isGold
      ? "linear-gradient(to bottom, rgba(66, 46, 12, 0.4) 0%, rgba(28, 25, 23, 0.6) 100%)"
      : "linear-gradient(to bottom, rgba(66, 12, 12, 0.4) 0%, rgba(28, 25, 23, 0.6) 100%)";
    const barColor = isGold ? "from-yellow-500 to-yellow-300" : "from-red-700 to-red-400";

    return (
      <motion.div className="relative flex flex-col items-center justify-end overflow-hidden h-[450px] md:h-[600px]"
        style={{ background: gradient }}
        initial={variants.hidden} animate={inView ? variants.visible : variants.hidden}>

        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${barColor}`} />

        {/* Party Logo in the Left Corner of each section */}
        <motion.div
          className={`absolute top-6 left-6 w-16 h-16 md:w-24 md:h-24 rounded-2xl border-2 ${isGold ? 'border-yellow-400' : 'border-red-400'} bg-stone-950/40 backdrop-blur-md shadow-2xl z-20 overflow-hidden flex items-center justify-center`}
          animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {party.logo_url ? (
            <img src={party.logo_url} className="w-full h-full object-cover" alt="Logo" />
          ) : (
            <span className={`font-black text-2xl ${c.text}`}>{party.number}</span>
          )}
        </motion.div>

        {/* Ranking Badge Top Right */}
        <motion.span className={`absolute top-6 right-6 text-[10px] md:text-xs font-black px-3 py-1 rounded-full z-10 ${isGold ? 'bg-yellow-500 text-stone-950' : 'bg-red-600 text-white'}`}
          animate={{ scale: rank === 1 ? [1, 1.05, 1] : 1 }} transition={{ duration: 2.5, repeat: Infinity }}>
          RANKING #{rank}
        </motion.span>

        {/* President Photo - Centered Large Image */}
        <div className="absolute inset-0 flex items-center justify-center pt-10 pointer-events-none">
          <motion.div
            className="h-full w-full flex items-end justify-center"
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {party.president_photo_url ? (
              <img
                src={party.president_photo_url}
                className="h-[100%] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                alt={party.president_name}
              />
            ) : (
              <div className="w-44 h-44 rounded-full bg-stone-800/50 flex items-center justify-center text-7xl mb-20 border-4 border-white/5">👤</div>
            )}
          </motion.div>
        </div>

        {/* Stats & Info Overlay */}
        <div className="relative z-10 w-full p-6 md:p-8 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent">
          <div className="flex flex-col items-center text-center">
            <h2 className={`${isGold ? 'text-yellow-400' : 'text-red-400'} font-black text-2xl md:text-4xl uppercase tracking-tighter mb-1`}>{party.name}</h2>
            <p className="text-stone-300 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4">{party.president_name}</p>

            <div className="flex items-center gap-4">
              <p className={`text-5xl md:text-7xl font-black tabular-nums tracking-tighter ${isGold ? 'text-yellow-400' : 'text-red-400'}`}>
                {inView ? <CountUp end={party.votes} duration={2} separator="," preserveValue /> : "0"}
              </p>
              <div className="flex flex-col items-start leading-none">
                <span className={`text-xl md:text-2xl font-black ${isGold ? 'text-yellow-600' : 'text-red-700'}`}>{getPct(party.votes, total)}%</span>
                <span className="text-[10px] text-stone-500 font-bold">VOTES</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div ref={ref} variants={itemVariants} className="rounded-[2.5rem] overflow-hidden glass-card border-white/10 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <CandidateDisplay party={p1} rank={1} align="left" />
        <CandidateDisplay party={p2} rank={2} align="right" />
      </div>

      <div className="px-8 py-8 bg-stone-950/50 border-t border-white/10">
        <div className="flex justify-between text-[10px] font-black mb-4 uppercase tracking-[0.2em]">
          <span className="text-yellow-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" /> {p1.name}
          </span>
          <span className="text-red-500 flex items-center gap-2">
            {p2.name} <span className="w-2 h-2 rounded-full bg-red-500" />
          </span>
        </div>
        <div className="h-6 rounded-full overflow-hidden flex bg-stone-900 border border-white/5 p-1.5 shadow-inner">
          <motion.div className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 h-full rounded-full relative overflow-hidden shimmer-bar transition-all duration-1000 ease-in-out"
            initial={{ width: 0 }} animate={inView ? { width: `${getPct(p1.votes, total)}%` } : { width: 0 }} />
          <motion.div className="bg-gradient-to-l from-red-800 via-red-600 to-red-400 h-full rounded-full transition-all duration-1000 ease-in-out ml-auto"
            initial={{ width: 0 }} animate={inView ? { width: `${getPct(p2.votes, total)}%` } : { width: 0 }} />
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-500 text-stone-950 px-3 py-1 rounded-lg text-xs font-black tracking-tight">
              LEAD +<CountUp end={lead} duration={2} separator="," preserveValue />
            </span>
          </div>
          <span className="text-stone-500 text-[10px] font-black tracking-[0.2em] uppercase">Processed {fmtNum(total)} Ballots</span>
        </div>
      </div>
    </motion.div>
  );
}
