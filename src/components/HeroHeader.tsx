"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Settings } from "@/types/election";
import { containerVariants, itemVariants, slideLeft } from "@/lib/utils";
import { LiveBadge } from "./SharedComponents";

export default function HeroHeader({ settings, total, turnout, isConnected }: { settings: Settings; total: number; turnout: string; isConnected: boolean }) {
  return (
    <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
      className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#5a1010 0%,#2a1200 30%,#0c0a09 100%)" }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="d" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M12 0 L24 12 L12 24 L0 12 Z" fill="none" stroke="#eab308" strokeWidth="0.8" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#d)" />
      </svg>
      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-12 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <motion.div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 text-center sm:text-left" variants={slideLeft} initial="hidden" animate="visible">
            <motion.div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shrink-0 bg-stone-900 border border-yellow-500/20"
              style={{ boxShadow: "0 0 0 3px rgba(212,160,23,0.3)" }}>
              {settings.school_logo_url ? <img src={settings.school_logo_url} className="w-full h-full object-cover" alt="" />
                : <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-red-700 flex items-center justify-center"><span className="text-white font-black text-xl">น</span></div>}
            </motion.div>
            <div>
              <h1 className="text-white font-black text-2xl lg:text-4xl leading-tight drop-shadow-lg">
                เลือกตั้งสภานักเรียน <br className="sm:hidden" /> ปี {settings.school_year}
              </h1>
              <p className="text-yellow-700 text-sm lg:text-lg font-medium">{settings.school_name} · {settings.school_subtitle}</p>
              {settings.is_live && <div className="mt-2"><LiveBadge /></div>}
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:flex items-center gap-3 lg:gap-4" variants={containerVariants} initial="hidden" animate="visible">
            {[
              { value: total, label: "คะแนนรวม", cls: "text-yellow-400" },
              { value: null, label: "คูหานับแล้ว", display: `${settings.booths_counted}/${settings.booths_total}`, cls: "text-yellow-400" },
              { value: null, label: "ผู้ใช้สิทธิ์", display: `${turnout}%`, cls: "text-green-400" },
            ].map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col items-center glass-card rounded-2xl px-5 py-3">
                <span className={`text-2xl lg:text-3xl font-black tabular-nums ${s.cls}`}>
                  {s.value !== null ? <CountUp end={s.value} duration={2} separator="," /> : s.display}
                </span>
                <span className="text-xs text-stone-500 mt-0.5">{s.label}</span>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 h-[68px] px-6 rounded-2xl font-bold bg-stone-900/50 border border-white/5 relative">
              <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'} shadow-[0_0_8px_currentColor]`} />
              <span className="text-stone-400 text-sm">{isConnected ? 'Realtime Connected' : 'Disconnected'}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
