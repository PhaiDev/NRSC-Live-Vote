"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export function ElectionHero() {
    return (
        <section className="relative pt-40 pb-20 px-4 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-float" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

            <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 bg-zinc-900 border border-white/10 rounded-3xl p-4 shadow-2xl mx-auto neon-border-blue">
                        <img
                            src="https://via.placeholder.com/80?text=LOGO"
                            alt="Parliament Logo"
                            className="w-full h-full object-contain opacity-80"
                        />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
                >
                    ELECTION 2026 <br />
                    <span className="text-2xl md:text-3xl font-bold text-indigo-400 mt-2 block">
                        LIVE RESULTS DASHBOARD
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-6 p-6 glass rounded-2xl border border-white/5"
                >
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-indigo-500/30 overflow-hidden flex items-center justify-center">
                            <User className="w-8 h-8 text-zinc-500" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#020617] animate-pulse shadow-[0_0_10px_#10b981]" />
                    </div>

                    <div className="text-left">
                        <h3 className="text-lg font-bold text-white">สมชาย แย้มแจ่มใส</h3>
                        <p className="text-zinc-400 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            กำลังดำเนินการนับคะแนน (84% รายงานแล้ว)
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
