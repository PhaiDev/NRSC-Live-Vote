"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { PartyData, SpecialVote, Settings, Booth } from "@/types/election";
import { getPct, containerVariants, itemVariants } from "@/lib/utils";

import HeroHeader from "@/components/HeroHeader";
import BattleSection from "@/components/BattleSection";
import PartyCard from "@/components/PartyCard";
import ScoreboardSection from "@/components/ScoreboardSection";
import FeedbackForm from "@/components/FeedbackForm";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800;900&display=swap');
    *, *::before, *::after { font-family: 'Sarabun', system-ui, sans-serif; box-sizing: border-box; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0c0a09; }
    ::-webkit-scrollbar-thumb { background: #3a2e10; border-radius: 9999px; }

    @keyframes shimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(250%); }
    }
    .shimmer-bar::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%);
      animation: shimmer 2s ease-in-out infinite;
    }

    @keyframes breathe {
      0%, 100% { transform: translateY(0px) scale(1); }
      50%       { transform: translateY(-8px) scale(1.01); }
    }
    .floating { animation: breathe 4s ease-in-out infinite; }

    .glass-card {
      background: rgba(28, 20, 9, 0.55);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.07);
    }
    .glass-card-gold {
      background: rgba(42, 26, 8, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(212,160,23,0.22);
      box-shadow: 0 8px 40px rgba(212,160,23,0.05);
    }
    .glass-card-red {
      background: rgba(42, 10, 10, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(192,57,43,0.22);
      box-shadow: 0 8px 40px rgba(192,57,43,0.05);
    }
  `}</style>
);

export default function ElectionApp() {
  const [parties, setParties] = useState<PartyData[]>([]);
  const [specialVotes, setSpecialVotes] = useState<SpecialVote[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetchData();

    // Reatltime Subscriptions
    const channel = supabase.channel('dashboard_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'parties' }, payload => {
        setParties(prev => {
          const updated = payload.new as PartyData;
          return prev.map(p => p.id === updated.id ? updated : p);
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'special_votes' }, payload => {
        setSpecialVotes(prev => {
          const updated = payload.new as SpecialVote;
          return prev.map(s => s.id === updated.id ? updated : s);
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'election_settings' }, payload => {
        setSettings(payload.new as Settings);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'booths' }, payload => {
        setBooths(prev => {
          const updated = payload.new as Booth;
          return prev.map(b => b.id === updated.id ? updated : b);
        });
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchData() {
    const [resS, resP, resV, resB] = await Promise.all([
      supabase.from("election_settings").select("*").single(),
      supabase.from("parties").select("*").order("number"),
      supabase.from("special_votes").select("*"),
      supabase.from("booths").select("*").order("id")
    ]);
    if (resS.data) setSettings(resS.data);
    if (resP.data) setParties(resP.data);
    if (resV.data) setSpecialVotes(resV.data);
    if (resB.data) setBooths(resB.data);
    setIsConnected(true);
  }

  if (!settings) return <div className="min-h-screen flex items-center justify-center bg-[#0c0a09]"><p className="text-yellow-500 font-bold"><FontStyle />Loading Live Dashboard...</p></div>;

  const validVotes = parties.reduce((sum, p) => sum + p.votes, 0);
  const invalidVotesCount = specialVotes.reduce((sum, s) => sum + s.votes, 0);
  const total = validVotes + invalidVotesCount;
  const turnout = getPct(total, settings.total_voters);
  const sorted = [...parties].sort((a, b) => b.votes - a.votes);

  const allRowsForScoreboard = [
    ...sorted.map(p => ({ id: String(p.id), label: `${p.name} (เบอร์ ${p.number})`, votes: p.votes, color: p.color_hex })),
    ...specialVotes
  ];

  return (
    <div className="min-h-screen text-white bg-[#0c0a09]" style={{ background: "radial-gradient(ellipse at top, #1a0c02 0%, #0c0a09 60%)" }}>
      <FontStyle />
      <HeroHeader settings={settings} total={total} turnout={turnout} isConnected={isConnected} />

      <motion.main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16 flex flex-col gap-10 md:gap-20"
        variants={containerVariants} initial="hidden" animate="visible">

        <section><BattleSection parties={parties} total={total} /></section>

        <section className="flex flex-col gap-6 md:gap-12">
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-yellow-400 text-sm md:text-2xl font-black uppercase tracking-[0.2em]">CANDIDATES · รายละเอียดผู้สมัคร</span>
            <div className="flex-1 h-px bg-gradient-to-r from-yellow-800/40 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            {sorted.map((p, i) => <PartyCard key={p.id} party={p} total={total} rank={i + 1} />)}
          </div>
        </section>

        <ScoreboardSection 
          allRowsForScoreboard={allRowsForScoreboard} 
          total={total} 
          settings={settings} 
          totalVotes={validVotes} 
          invalidVotes={specialVotes} 
        />

        <motion.footer variants={itemVariants} className="mt-10 text-center text-stone-700 text-xs pb-6">
          ข้อมูลแสดงผลการเลือกตั้งสภานักเรียน · {settings.school_name} · ปีการศึกษา {settings.school_year}
        </motion.footer>
      </motion.main>

      {/* Floating Webform for Feedback */}
      <FeedbackForm />
    </div>
  );
}
