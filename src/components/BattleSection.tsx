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
      ? "linear-gradient(to bottom, rgba(255, 252, 245, 0.9) 0%, rgba(255, 255, 255, 1) 100%)"
      : "linear-gradient(to bottom, rgba(255, 248, 248, 0.9) 0%, rgba(255, 255, 255, 1) 100%)";
    const barColor = isGold ? "from-yellow-400 to-yellow-200" : "from-red-500 to-red-300";

    return (
      <motion.div className="relative flex flex-col items-center justify-end overflow-hidden h-[450px] md:h-[600px]"
        style={{ background: gradient }}
        initial={variants.hidden} animate={inView ? variants.visible : variants.hidden}>

        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${barColor}`} />

        {/* Party Logo in the Left Corner of each section */}
        <motion.div
          className={`absolute top-6 left-6 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 ${isGold ? 'border-yellow-200' : 'border-red-200'} bg-white/80 backdrop-blur-md shadow-lg z-20 overflow-hidden flex items-center justify-center`}
          animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {party.logo_url ? (
            <img src={party.logo_url} className="w-full h-full object-cover" alt="Logo" />
          ) : (
            <span className={`font-black text-2xl ${c.text}`}>{party.number}</span>
          )}
        </motion.div>

        {/* Ranking Badge Top Right */}
        <motion.span className={`absolute top-6 right-6 text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full z-10 shadow-sm border ${isGold ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}
          animate={{ scale: rank === 1 ? [1, 1.05, 1] : 1 }} transition={{ duration: 2.5, repeat: Infinity }}>
          อันดับ {rank}
        </motion.span>

        {/* President Photo - Centered Large Image */}
        <div className="absolute inset-0 flex items-center justify-center pt-8 pointer-events-none">
          <motion.div
            className="h-full w-full flex items-end justify-center pb-24 md:pb-28"
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {party.president_photo_url ? (
              <img
                src={party.president_photo_url}
                className="h-full w-auto object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                alt={party.president_name}
              />
            ) : (
              <div className="w-44 h-44 rounded-full bg-stone-200/50 flex items-center justify-center text-7xl mb-10 border border-white/50">👤</div>
            )}
          </motion.div>
        </div>

        {/* Stats & Info Overlay */}
        <div className="relative z-10 w-full p-5 md:p-8 bg-gradient-to-t from-white via-white/95 to-transparent">
          <div className="flex flex-col items-center text-center mt-8 md:mt-12">
            <h2 className={`${isGold ? 'text-yellow-600' : 'text-red-600'} font-black text-2xl md:text-4xl uppercase tracking-tight mb-1 drop-shadow-sm`}>{party.name}</h2>
            <p className="text-stone-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3">{party.president_name}</p>

            <div className="flex items-center gap-3 md:gap-4 bg-white/60 px-6 py-2 rounded-2xl shadow-sm border border-stone-100">
              <p className={`text-4xl md:text-6xl font-black tabular-nums tracking-tighter ${isGold ? 'text-yellow-500' : 'text-red-600'}`}>
                {inView ? <CountUp end={party.votes} duration={2} separator="," preserveValue /> : "0"}
              </p>
              <div className="flex flex-col items-start leading-none text-left">
                <span className={`text-lg md:text-2xl font-black ${isGold ? 'text-yellow-600' : 'text-red-600'}`}>{getPct(party.votes, total)}%</span>
                <span className="text-[10px] md:text-xs text-stone-400 font-bold uppercase tracking-widest mt-0.5">คะแนนโหวต</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div ref={ref} variants={itemVariants} className="rounded-[2.5rem] overflow-hidden bg-white/90 backdrop-blur-xl border border-stone-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
        <CandidateDisplay party={p1} rank={1} align="left" />
        <CandidateDisplay party={p2} rank={2} align="right" />
      </div>

      <div className="px-6 py-6 md:px-8 md:py-8 bg-stone-50/80 border-t border-stone-200">
        <div className="flex justify-between text-[10px] md:text-xs font-black mb-3 uppercase tracking-[0.1em]">
          <span className="text-yellow-600 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm" /> {p1.name}
          </span>
          <span className="text-red-600 flex items-center gap-2">
            {p2.name} <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
          </span>
        </div>
        <div className="h-6 md:h-8 rounded-full overflow-hidden flex bg-stone-200/80 border border-stone-300 p-1 shadow-inner">
          <motion.div className="bg-gradient-to-r from-yellow-500 to-yellow-300 h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-in-out shadow-sm"
            initial={{ width: 0 }} animate={inView ? { width: `${getPct(p1.votes, total)}%` } : { width: 0 }} />
          <motion.div className="bg-gradient-to-l from-red-600 to-red-400 h-full rounded-full transition-all duration-1000 ease-in-out ml-auto shadow-sm"
            initial={{ width: 0 }} animate={inView ? { width: `${getPct(p2.votes, total)}%` } : { width: 0 }} />
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold tracking-tight shadow-sm">
              นำอยู่ <span className="font-black">+{inView ? <CountUp end={lead} duration={2} separator="," preserveValue /> : 0}</span> เสียง
            </span>
          </div>
          <span className="text-stone-500 text-[10px] md:text-xs font-bold tracking-[0.1em]">นับแล้ว <span className="font-black text-stone-700">{fmtNum(total)}</span> เสียง</span>
        </div>
      </div>
    </motion.div>
  );
}
