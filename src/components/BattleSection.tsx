"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { PartyData } from "@/types/election";
import { getPct, fmtNum, itemVariants, slideLeft, slideRight } from "@/lib/utils";
import { FloatingLogo } from "./SharedComponents";

export default function BattleSection({ parties, total }: { parties: PartyData[]; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  if (parties.length < 2) return null;
  const sorted = [...parties].sort((a, b) => b.votes - a.votes);
  const [p1, p2] = sorted;
  const lead = p1.votes - p2.votes;

  return (
    <motion.div ref={ref} variants={itemVariants} className="rounded-3xl overflow-hidden glass-card">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div className="relative flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden"
          style={{ background: "linear-gradient(145deg,#2a1800 0%,#1a1000 100%)" }}
          initial={slideLeft.hidden} animate={inView ? slideLeft.visible : slideLeft.hidden}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300" />
          <motion.span className="text-xs md:text-sm font-black px-4 py-1.5 rounded-full mb-6 bg-yellow-500 text-stone-950" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
            RANKING #1
          </motion.span>
          <FloatingLogo party={p1} size="xl" />
          <h2 className="text-yellow-400 font-black text-2xl md:text-4xl mt-6 uppercase tracking-wider">{p1.name}</h2>
          <p className="text-stone-500 text-sm md:text-base font-bold mb-4">พรรคที่ {p1.number}</p>
          <p className="text-5xl md:text-7xl font-black tabular-nums text-yellow-400 tracking-tighter">
            {inView ? <CountUp end={p1.votes} duration={2} separator="," preserveValue /> : "0"}
          </p>
          <p className="text-yellow-600 text-lg md:text-2xl font-black mt-2">{getPct(p1.votes, total)}%</p>
        </motion.div>

        <motion.div className="relative flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden"
          style={{ background: "linear-gradient(145deg,#2a0a0a 0%,#180808 100%)" }}
          initial={slideRight.hidden} animate={inView ? slideRight.visible : slideRight.hidden}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 to-red-400" />
          <span className="text-xs md:text-sm font-black px-4 py-1.5 rounded-full mb-6 bg-red-600 text-white">RANKING #2</span>
          <FloatingLogo party={p2} size="xl" />
          <h2 className="text-red-400 font-black text-2xl md:text-4xl mt-6 uppercase tracking-wider">{p2.name}</h2>
          <p className="text-stone-500 text-sm md:text-base font-bold mb-4">พรรคที่ {p2.number}</p>
          <p className="text-5xl md:text-7xl font-black tabular-nums text-red-400 tracking-tighter">
            {inView ? <CountUp end={p2.votes} duration={2} separator="," preserveValue /> : "0"}
          </p>
          <p className="text-red-700 text-lg md:text-2xl font-black mt-2">{getPct(p2.votes, total)}%</p>
        </motion.div>
      </div>

      <div className="px-6 py-4 border-t border-white/5">
        <div className="flex justify-between text-xs font-bold mb-2">
          <span className="text-yellow-400">{getPct(p1.votes, total)}% · {p1.name}</span>
          <span className="text-red-400">{p2.name} · {getPct(p2.votes, total)}%</span>
        </div>
        <div className="h-4 rounded-full overflow-hidden flex bg-stone-900/60 border border-white/10">
          <motion.div className="bg-gradient-to-r from-yellow-500 to-yellow-300 h-full relative overflow-hidden shimmer-bar transition-all duration-1000 ease-in-out"
            initial={{ width: 0 }} animate={inView ? { width: `${getPct(p1.votes, total)}%` } : { width: 0 }} />
          <motion.div className="bg-gradient-to-l from-red-600 to-red-400 h-full transition-all duration-1000 ease-in-out"
            initial={{ width: 0 }} animate={inView ? { width: `${getPct(p2.votes, total)}%` } : { width: 0 }} />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-yellow-500 font-bold">นำอยู๋ +<CountUp end={lead} duration={2} separator="," preserveValue /> คะแนน</span>
          <span className="text-stone-500">รวม {fmtNum(total)} คะแนน</span>
        </div>
      </div>
    </motion.div>
  );
}
