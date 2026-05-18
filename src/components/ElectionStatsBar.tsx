"use client";

import { motion } from "framer-motion";
import { Settings } from "@/types/election";
import { fmtNum } from "@/lib/utils";

interface ElectionStatsBarProps {
  settings: Settings;
  totalVotes: number;
  turnout: string;
  isConnected: boolean;
}

export default function ElectionStatsBar({ settings, totalVotes, turnout, isConnected }: ElectionStatsBarProps) {
  const boothPct = settings.booths_total > 0
    ? Math.round((settings.booths_counted / settings.booths_total) * 100)
    : 0;

  return (
    <header className="w-full glass-header sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">

        {/* Left: Branding */}
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start gap-3 sm:gap-4 min-w-0">
          {settings.school_logo_url ? (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shadow-md p-1 border border-stone-100 shrink-0">
              <img src={settings.school_logo_url} alt="Logo" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-base sm:text-xl shadow-lg shrink-0">ร</div>
          )}
          <div className="min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="text-stone-800 font-black text-sm sm:text-xl leading-tight truncate tracking-tight w-full">{settings.school_name}</p>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
              <span className="text-[9px] sm:text-[10px] font-black text-stone-400 uppercase tracking-widest bg-stone-100 px-2 py-0.5 rounded-md">Election {settings.school_year}</span>
              {settings.is_live && (
                <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 bg-red-600 rounded-full shadow-lg shadow-red-500/20">
                  <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-white animate-pulse" : "bg-stone-300"}`} />
                  <span className="text-white text-[8px] sm:text-[9px] font-black uppercase tracking-widest">LIVE BROADCAST</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Stat Pills */}
        <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-6 w-full sm:w-auto bg-stone-50/50 sm:bg-transparent rounded-xl sm:rounded-none px-2 py-1.5 sm:p-0 border border-stone-100 sm:border-none">
          <StatStat label="Votes Counted" value={fmtNum(totalVotes)} color="text-red-600" />
          <div className="w-px h-6 sm:h-10 bg-stone-200 block" />
          <StatStat label="Total Turnout" value={`${turnout}%`} color="text-stone-900" />
          <div className="w-px h-6 sm:h-10 bg-stone-200 block" />
          <StatStat label="Polling Units" value={`${settings.booths_counted}/${settings.booths_total}`} color="text-yellow-600" />
        </div>

        {/* Right: Connection status */}
        <div className="hidden lg:flex flex-col items-end">
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 transition-colors ${isConnected ? 'border-green-100 bg-green-50' : 'border-stone-100 bg-stone-50'}`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-stone-300'}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${isConnected ? 'text-green-600' : 'text-stone-400'}`}>
              {isConnected ? 'Connection Stable' : 'Connecting...'}
            </span>
          </div>
        </div>

      </div>
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-yellow-500 to-red-600" />
    </header>
  );
}

function StatStat({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex-1 sm:flex-none flex flex-col items-center sm:items-start px-1 sm:px-0">
      <span className={`text-[13px] sm:text-2xl font-black tabular-nums leading-none ${color}`}>{value}</span>
      <span className="text-stone-400 text-[8px] sm:text-[10px] font-black uppercase tracking-widest mt-1 sm:mt-1.5">{label}</span>
    </div>
  )
}
