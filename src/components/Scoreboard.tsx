"use client";

import { Candidate, CandidateCard } from "./CandidateCard";
import { Users, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";

const INITIAL_CANDIDATES: Candidate[] = [
    { id: "1", name: "Alex Thompson", party: "Progressive Reform", votes: 42351, percentage: 38.5, imageColor: "blue", trend: "up" },
    { id: "2", name: "Sarah Jenkins", party: "Conservative Union", votes: 38192, percentage: 34.7, imageColor: "red", trend: "stable" },
    { id: "3", name: "Marcus Webb", party: "Green Future Alliance", votes: 15408, percentage: 14.0, imageColor: "green", trend: "up" },
    { id: "4", name: "Elena Rodriguez", party: "Independent", votes: 9845, percentage: 8.9, imageColor: "purple", trend: "down" },
    { id: "5", name: "David Chen", party: "Tech Innovation", votes: 4204, percentage: 3.9, imageColor: "orange", trend: "down" },
];

export function Scoreboard() {
    const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
    const [totalVotes, setTotalVotes] = useState(110000);

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            setCandidates(prev => {
                let newTotal = totalVotes;
                const updated = prev.map(c => {
                    const increase = Math.floor(Math.random() * 50);
                    newTotal += increase;
                    return { ...c, votes: c.votes + increase };
                });

                // Recalculate percentages
                const sorted = updated.sort((a, b) => b.votes - a.votes);
                setTotalVotes(newTotal);
                return sorted.map(c => ({
                    ...c,
                    percentage: (c.votes / newTotal) * 100
                }));
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [totalVotes]);

    return (
        <section className="relative w-full pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <Award className="w-8 h-8 text-indigo-400" />
                        Live Leaderboard
                    </h2>
                    <p className="text-zinc-400">Watch the results update in real-time as ballots are counted.</p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10 shrink-0">
                    <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">Total Votes</p>
                        <p className="text-2xl font-bold text-white flex items-center gap-2">
                            {totalVotes.toLocaleString()}
                            <span className="text-xs font-normal text-emerald-400 flex items-center bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                <TrendingUp className="w-3 h-3 mr-1" /> Live
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {candidates.map((candidate, index) => (
                    <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        rank={index + 1}
                    />
                ))}
            </div>

            {/* Progress Bar overall visual */}
            <div className="mt-12 bg-white/5 rounded-full h-4 w-full overflow-hidden flex border border-white/10">
                {candidates.map((candidate) => {
                    const bgColorMap: Record<string, string> = {
                        blue: "bg-blue-500", red: "bg-red-500", green: "bg-emerald-500", purple: "bg-purple-500", orange: "bg-orange-500"
                    };
                    return (
                        <div
                            key={candidate.id}
                            className={`h-full ${bgColorMap[candidate.imageColor] || "bg-zinc-500"} transition-all duration-1000 ease-in-out hover:brightness-110 cursor-pointer`}
                            style={{ width: `${candidate.percentage}%` }}
                            title={`${candidate.name}: ${candidate.percentage.toFixed(1)}%`}
                        />
                    );
                })}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-zinc-500">
                    Last updated: Just now • Represents 84% of reporting precincts
                </p>
            </div>
        </section>
    );
}
