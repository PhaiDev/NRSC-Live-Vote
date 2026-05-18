"use client";
import { motion } from "framer-motion";
import { Settings } from "@/types/election";
import { containerVariants, itemVariants, slideLeft } from "@/lib/utils";
import { LiveBadge } from "./SharedComponents";

export default function HeroHeader({ settings, total, turnout, isConnected }: { settings: Settings; total: number; turnout: string; isConnected: boolean }) {
  return (
    <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
      className="relative w-full z-10 pt-4 pb-2"
    >
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-8">
          <motion.div className="flex flex-row items-center gap-3 sm:gap-4 text-left" variants={slideLeft} initial="hidden" animate="visible">
            <motion.div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shrink-0 bg-stone-900 border border-yellow-500/20"
              style={{ boxShadow: "0 0 0 2px rgba(212,160,23,0.3)" }}>
              {settings.school_logo_url ? <img src={settings.school_logo_url} className="w-full h-full object-cover" alt="" />
                : <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-red-700 flex items-center justify-center"><span className="text-white font-black text-xl">น</span></div>}
            </motion.div>
            <div>
              <h1 className="text-stone-900 font-black text-lg sm:text-2xl lg:text-4xl leading-tight drop-shadow-sm">
                เลือกตั้งสภานักเรียน <br className="hidden sm:block lg:hidden" /> ปี {settings.school_year}
              </h1>
              <p className="text-yellow-600 text-[10px] sm:text-sm lg:text-lg font-bold tracking-wide">{settings.school_name} · {settings.school_subtitle}</p>
              {settings.is_live && <div className="mt-1.5"><LiveBadge /></div>}
            </div>
          </motion.div>
          <motion.div className="w-full lg:w-auto grid grid-cols-3 lg:flex items-stretch gap-1.5 sm:gap-3 lg:gap-4 mt-2 lg:mt-0" variants={containerVariants} initial="hidden" animate="visible">
            {[
              { value: total, label: "คะแนนรวม", cls: "text-yellow-600" },
              { value: null, label: "ผู้ใช้สิทธิ์", display: `${turnout}%`, cls: "text-green-600" },
            ].map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col justify-center items-center glass-card rounded-xl sm:rounded-2xl p-2 sm:px-5 sm:py-3 text-center bg-white/60 backdrop-blur-md border border-stone-200 shadow-sm">
                <span className={`text-base sm:text-2xl lg:text-3xl font-black tabular-nums leading-none ${s.cls}`}>
                  {s.value !== null ? s.value.toLocaleString() : s.display}
                </span>
                <span className="text-[9px] sm:text-xs text-stone-500 font-bold mt-1">{s.label}</span>
              </motion.div>
            ))}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 h-full sm:h-[68px] p-2 sm:px-6 rounded-xl sm:rounded-2xl font-bold bg-white/60 backdrop-blur-md border border-stone-200 shadow-sm relative text-center">
              <span className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-stone-500 text-[8px] sm:text-sm leading-tight">
                <span className="sm:hidden">{isConnected ? 'Live' : 'Offline'}</span>
                <span className="hidden sm:inline">{isConnected ? 'Realtime Connected' : 'Disconnected'}</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
