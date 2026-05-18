export function getPct(v: number, t: number) { return t ? ((v / t) * 100).toFixed(1) : "0.0"; }
export function fmtNum(n: number) { return n.toLocaleString("th-TH"); }

export const C: Record<string, Record<string, string>> = {
  gold: { text: "text-yellow-600", dim: "text-yellow-700", bg: "bg-yellow-50", solid: "bg-yellow-500", bar: "from-yellow-400 to-yellow-300", border: "border-yellow-300", badge: "bg-yellow-100 text-yellow-800", insta: "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100", glow: "rgba(212,160,23,0.3)" },
  red: { text: "text-red-600", dim: "text-red-700", bg: "bg-red-50", solid: "bg-red-500", bar: "from-red-500 to-red-400", border: "border-red-300", badge: "bg-red-100 text-red-800", insta: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100", glow: "rgba(192,57,43,0.3)" },
};

export const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
export const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } } };
export const slideLeft = { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
export const slideRight = { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };
