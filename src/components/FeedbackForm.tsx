"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Star, Send } from "lucide-react";

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [wouldUse, setWouldUse] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("กรุณาให้คะแนน (1-5 ดาว)");
      return;
    }
    if (!wouldUse) {
      alert("กรุณาเลือกตัดสินใจ ว่าจะใช้ระบบนี้ไหม");
      return;
    }

    setIsSubmitting(true);

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) {
        console.warn("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not defined. Demo mode active.");
        setTimeout(() => setIsSuccess(true), 1000);
      } else {
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name || "Anonymous",
            rating: rating,
            wouldUse: wouldUse,
            message: message || "-",
            timestamp: new Date().toISOString()
          }),
        });
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setIsSuccess(false);
          setName("");
          setRating(0);
          setWouldUse("");
          setMessage("");
        }, 500); // clear state after modal has closed
      }, 1500);

    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล โปรดลองอีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-400 text-[#0c0a09] shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all"
        whileHover={{ rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-md p-6 overflow-hidden rounded-2xl glass-card-gold shadow-2xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-4xl font-bold text-yellow-500 animate-pulse">ขอบคุณ 🙏</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm font-medium text-stone-600 uppercase tracking-widest text-xs">👤 ชื่อ (optional)</label>
                    <input
                      id="name"
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ไม่ต้องระบุก็ได้..."
                      className="w-full px-4 py-3 bg-white/80 border border-yellow-300 focus:border-yellow-500 rounded-lg text-stone-900 placeholder-stone-400 outline-none transition-colors disabled:opacity-50 text-sm shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-stone-600 uppercase tracking-widest text-xs">⭐ ใช้งานง่ายไหม? (1-5) <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 md:w-10 md:h-10 ${star <= rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-stone-200 fill-stone-100"
                              } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-stone-600 uppercase tracking-widest text-xs">🏫 ถ้าโรงเรียนคุณมีระบบนี้ จะใช้ไหม? <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      {["Yes", "No", "Maybe"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setWouldUse(opt)}
                          className={`flex-1 py-2.5 rounded-lg border transition-all text-sm font-bold shadow-sm ${wouldUse === opt
                            ? "bg-yellow-500 border-yellow-500 text-black shadow-md"
                            : "bg-white/80 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="message" className="text-sm font-medium text-stone-600 uppercase tracking-widest text-xs">📝 ติดตรงไหนบ้าง? (optional)</label>
                    <textarea
                      id="message"
                      disabled={isSubmitting}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="ข้อเสนอแนะเพิ่มเติม..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/80 border border-yellow-300 focus:border-yellow-500 rounded-lg text-stone-900 placeholder-stone-400 outline-none transition-colors resize-none disabled:opacity-50 text-sm shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 w-full py-3 rounded-lg bg-gradient-to-r from-yellow-700 to-yellow-500 hover:from-yellow-600 hover:to-yellow-400 text-[#0c0a09] font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#0c0a09]/30 border-t-[#0c0a09] rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        ส่งข้อมูล
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
