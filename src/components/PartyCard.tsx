"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PartyData } from "@/types/election";
import { getPct, C, itemVariants } from "@/lib/utils";
import { ShimmerBar } from "./SharedComponents";
import { X, Instagram, User, Award, Quote, Image as ImageIcon } from "lucide-react";

export default function PartyCard({ party, total, rank }: { party: PartyData; total: number; rank: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const c = C[party.color_theme] || C.gold;
  const pct = parseFloat(getPct(party.votes, total));

  const galleryImages = [party.president_photo_url, party.logo_url].filter(Boolean) as string[];
  const backgroundImage = party.logo_url || party.president_photo_url;

  return (
    <>
      <motion.div
        ref={ref}
        variants={itemVariants}
        onClick={() => setIsOpen(true)}
        className={`relative group cursor-pointer rounded-2xl overflow-hidden glass-card-${party.color_theme} transition-all hover:shadow-lg`}
        whileHover={{ y: -5, scale: 1.01 }}
      >
        <div className="p-4 flex items-center gap-4">
          {/* Small Avatar/Logo */}
          <div className="relative shrink-0">
            <div className={`w-16 h-16 rounded-full border-2 ${c.border} overflow-hidden bg-white`}>
              {party.president_photo_url ? (
                <img src={party.president_photo_url} className="w-full h-full object-cover" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl text-stone-400">👤</div>
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-lg border ${c.border} bg-white flex items-center justify-center overflow-hidden shadow-sm`}>
              {party.logo_url ? <img src={party.logo_url} className="w-full h-full object-cover" alt="" /> : <span className={`text-[10px] font-black ${c.text}`}>{party.number}</span>}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.badge}`}>เบอร์ {party.number}</span>
              {rank === 1 && <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">LEADING</span>}
            </div>
            <h3 className={`text-lg font-black ${c.text} truncate`}>{party.name}</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-black tabular-nums ${c.text}`}>
                {inView ? party.votes.toLocaleString() : "0"}
              </span>
              <span className={`text-xs font-bold ${c.dim}`}>{pct.toFixed(1)}%</span>
            </div>
          </div>

          <div className="hidden md:block">
            <motion.div
              className={`w-8 h-8 rounded-full border ${c.border} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              <Award size={14} className={c.text} />
            </motion.div>
          </div>
        </div>
        <div className="px-4 pb-3">
          <ShimmerBar pct={pct} color={party.color_hex} />
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-white/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl glass-card-${party.color_theme} border-stone-200`}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/50 text-stone-600 flex items-center justify-center hover:bg-white/80 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative">
                <div className="relative h-44">
                  {backgroundImage ? (
                    <img src={backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.bar} opacity-30`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/65 to-white/20" />
                </div>

                <div className="px-6 pb-8 -mt-10 relative z-10">
                  <div className="flex items-end justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-20 h-20 rounded-full border-4 ${c.border} overflow-hidden bg-stone-100 shadow-lg shrink-0`}>
                        {party.president_photo_url ? (
                          <img src={party.president_photo_url} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl text-stone-400">👤</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className={`inline-flex text-xs font-black px-3 py-1 rounded-full mb-2 ${c.badge}`}>เบอร์ {party.number}</span>
                        <h2 className={`text-2xl md:text-3xl font-black ${c.text} leading-tight truncate`}>{party.name}</h2>
                        <p className="text-stone-500 font-bold uppercase tracking-[0.16em] text-xs flex items-center gap-2">
                          <User size={13} /> {party.president_name}
                        </p>
                      </div>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl border-2 ${c.border} bg-white shadow-sm flex items-center justify-center overflow-hidden shrink-0`}>
                      {party.logo_url ? <img src={party.logo_url} className="w-full h-full object-cover" alt="" /> : <span className={`text-lg font-black ${c.text}`}>{party.number}</span>}
                    </div>
                  </div>

                  {galleryImages.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 mb-2 flex items-center gap-1.5">
                        <ImageIcon size={13} /> Photos
                      </p>
                      <div className="flex gap-2">
                        {galleryImages.map((image, idx) => (
                          <div key={`${image}-${idx}`} className="w-16 h-16 rounded-xl overflow-hidden border border-stone-200 bg-white/70">
                            <img src={image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/60 rounded-2xl p-4 border border-stone-200 shadow-sm">
                      <p className="text-stone-500 text-xs font-bold uppercase mb-1">Total Votes</p>
                      <p className={`text-3xl font-black ${c.text}`}>{party.votes.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/60 rounded-2xl p-4 border border-stone-200 shadow-sm">
                      <p className="text-stone-500 text-xs font-bold uppercase mb-1">Percentage</p>
                      <p className={`text-3xl font-black ${c.text}`}>{pct.toFixed(1)}%</p>
                    </div>
                  </div>

                  {party.slogan && (
                    <div className="mb-8 p-6 bg-white/40 rounded-2xl border border-stone-200 italic text-stone-600 relative shadow-sm">
                      <Quote className="absolute -top-3 -left-1 text-stone-300 opacity-50" size={32} />
                      <p className="text-lg">&ldquo;{party.slogan}&rdquo;</p>
                    </div>
                  )}

                  {party.instagram_url && (
                    <a
                      href={party.instagram_url}
                      target="_blank"
                      className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-base font-black transition-all hover:scale-[1.02] active:scale-[0.98] ${c.insta}`}
                    >
                      <Instagram size={20} /> FOLLOW ON INSTAGRAM
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
