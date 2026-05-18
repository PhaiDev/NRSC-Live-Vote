"use client";
import { motion } from "framer-motion";
import { getPct, itemVariants } from "@/lib/utils";
import { ShimmerBar } from "./SharedComponents";
import { Settings, SpecialVote } from "@/types/election";

interface ScoreboardProps {
  allRowsForScoreboard: { id: string; label: string; votes: number; color: string }[];
  total: number;
  settings: Settings;
  totalVotes: number;
  invalidVotes: SpecialVote[];
}

export default function ScoreboardSection({ allRowsForScoreboard, total, settings, totalVotes, invalidVotes }: ScoreboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
      {/* Scoreboard */}
      <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden glass-card h-fit">
        <div className="px-5 py-4 border-b border-stone-100"><p className="text-stone-600 text-sm font-bold uppercase tracking-wider">ผลคะแนนทั้งหมด</p></div>
        <div className="divide-y divide-stone-100">
          {allRowsForScoreboard.map((row, i: number) => (
            <div key={row.id} className="flex items-center gap-3 px-5 py-3.5">
              <span className="text-stone-400 font-bold text-sm w-5 shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-stone-800 truncate mb-1.5">{row.label}</p>
                <ShimmerBar pct={parseFloat(getPct(row.votes, total))} color={row.color} />
              </div>
              <div className="shrink-0 text-right ml-3">
                <p className="text-lg font-black tabular-nums" style={{ color: row.color }}>{row.votes.toLocaleString()}</p>
                <p className="text-xs font-bold" style={{ color: `${row.color}99` }}>{getPct(row.votes, total)}%</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col gap-8">
        {/* Info Card */}
        <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden glass-card">
          <div className="px-5 py-4 border-b border-stone-100"><p className="text-stone-600 text-sm font-bold uppercase tracking-wider">ภาพรวมผู้ใช้สิทธิ์</p></div>
          <div className="p-6">
            <p className="text-stone-500 text-sm mb-1 font-semibold">ผู้มาใช้สิทธิ์ทั้งหมด / ผู้มีสิทธิ์</p>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-black text-stone-900 tabular-nums">{total.toLocaleString("th-TH")} <span className="text-xl text-stone-400 font-bold">/ {settings.total_voters.toLocaleString("th-TH")}</span></span>
              <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-md mb-1 border border-emerald-100">{getPct(total, settings.total_voters)}% Turnout</span>
            </div>
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex justify-between items-center text-sm"><span className="text-stone-500 font-medium">บัตรดี (Valid)</span><span className="font-bold text-stone-800">{totalVotes.toLocaleString("th-TH")}</span></div>
              {invalidVotes.map((v) => <div key={v.id} className="flex justify-between items-center text-sm"><span className="text-stone-500 font-medium">{v.label}</span><span className="font-bold text-stone-800">{v.votes.toLocaleString("th-TH")}</span></div>)}
              <div className="flex justify-between items-center text-sm pt-2 border-t border-stone-100"><span className="text-stone-500 font-medium">คูหาที่นับแล้ว</span><span className="font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100">{settings.booths_counted} / {settings.booths_total}</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
