export interface Candidate {
    id: string;
    name: string;
    party: string;
    votes: number;
    percentage: number;
    imageColor: string;
    trend: "up" | "down" | "stable";
}

interface CandidateCardProps {
    candidate: Candidate;
    rank: number;
}

export function CandidateCard({ candidate, rank }: CandidateCardProps) {
    const bgColorMap: Record<string, string> = {
        blue: "bg-blue-500",
        red: "bg-red-500",
        green: "bg-emerald-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
    };

    const bgColor = bgColorMap[candidate.imageColor] || "bg-zinc-600";

    return (
        <div className="group relative flex items-center gap-4 rounded-2xl bg-white/5 p-4 border border-white/10 hover:bg-white/10 transition-all hover:border-indigo-500/30 w-full overflow-hidden">
            {/* Rank Indicator */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/40 text-lg font-bold text-white border border-white/5 shadow-inner">
                #{rank}
            </div>

            {/* Profile Placeholder */}
            <div className={`h-14 w-14 shrink-0 rounded-full ${bgColor} ring-2 ring-background`} />

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="truncate text-lg font-semibold text-white">
                    {candidate.name}
                </h3>
                <p className="truncate text-sm text-zinc-400">{candidate.party}</p>
            </div>

            {/* Stats */}
            <div className="flex flex-col items-end gap-1">
                <div className="text-xl font-bold text-white tracking-tight">
                    {candidate.percentage.toFixed(1)}%
                </div>
                <div className="text-sm font-medium text-zinc-500">
                    {candidate.votes.toLocaleString()} votes
                </div>
            </div>

            {/* Highlight effect on hover */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}
