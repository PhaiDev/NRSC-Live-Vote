export function getPct(v: number, t: number) { return t ? ((v / t) * 100).toFixed(1) : "0.0"; }
export function fmtNum(n: number) { return n.toLocaleString("th-TH"); }

export const C: Record<string, Record<string, string>> = {
  gold: { text: "text-yellow-400", dim: "text-yellow-600", bg: "bg-yellow-500/10", solid: "bg-yellow-500", bar: "from-yellow-500 to-yellow-300", border: "border-yellow-500/40", badge: "bg-yellow-500 text-stone-950", insta: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20", glow: "rgba(212,160,23,0.6)" },
  red: { text: "text-red-400", dim: "text-red-700", bg: "bg-red-500/10", solid: "bg-red-600", bar: "from-red-600 to-red-400", border: "border-red-500/40", badge: "bg-red-600 text-white", insta: "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20", glow: "rgba(192,57,43,0.6)" },
};

export const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
export const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } } };
export const slideLeft = { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
export const slideRight = { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
