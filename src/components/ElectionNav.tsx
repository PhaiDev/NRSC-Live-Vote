"use client";

import { motion } from "framer-motion";

export function ElectionNav() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
        >
            <div className="glass rounded-full px-8 py-4 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
                        S
                    </div>
                    <span className="font-bold tracking-wider text-sm sm:text-base hidden sm:block">
                        ระบบนับคะแนนเลือกตั้งอย่างเป็นทางการ
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
                        <a href="#" className="hover:text-white transition-colors">สรุปคะแนน</a>
                        <a href="#" className="hover:text-white transition-colors">รายพรรค</a>
                        <a href="#" className="hover:text-white transition-colors">แบ่งเขต</a>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-indigo-500/25">
                        Real-time
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
