"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

// ─── Styles ────────────────────────────────────────────────────────────────
const FontStyle = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800;900&display=swap');
    *, *::before, *::after { font-family: 'Sarabun', system-ui, sans-serif; box-sizing: border-box; }
    body { background-color: #0c0a09; color: white; }
    input, select { background: #1c1917; border: 1px solid #292524; color: white; border-radius: 8px; padding: 8px 12px; width: 100%; outline: none; }
    input:focus, select:focus { border-color: #d4a017; }
    .glass-panel { background: #1c1409; border: 1px solid rgba(212,160,23,0.1); border-radius: 16px; padding: 24px; }
  `}</style>
);

export default function AdminPage() {
    const [authPin, setAuthPin] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Data States
    const [settings, setSettings] = useState<any>(null);
    const [parties, setParties] = useState<any[]>([]);
    const [specialVotes, setSpecialVotes] = useState<any[]>([]);
    const [booths, setBooths] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [savingMsg, setSavingMsg] = useState("");

    const PIN = "2569"; // Simple pin for easy access (configurable)

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    async function fetchData() {
        setLoading(true);
        const [resSettings, resParties, resSpecial, resBooths] = await Promise.all([
            supabase.from("election_settings").select("*").single(),
            supabase.from("parties").select("*").order("number"),
            supabase.from("special_votes").select("*"),
            supabase.from("booths").select("*").order("id"),
        ]);

        if (resSettings.data) setSettings(resSettings.data);
        if (resParties.data) setParties(resParties.data);
        if (resSpecial.data) setSpecialVotes(resSpecial.data);
        if (resBooths.data) setBooths(resBooths.data);
        setLoading(false);
    }

    // ─── Actions ─────────────────────────────────────────────────────────────

    const handleSaveSettings = async (field: string, value: any) => {
        setSettings({ ...settings, [field]: value });
        setSavingMsg("Saving setting...");
        await supabase.from("election_settings").update({ [field]: value }).eq("id", 1);
        setSavingMsg("Saved");
        setTimeout(() => setSavingMsg(""), 2000);
    };

    const handleUpdateParty = async (id: number, field: string, value: any) => {
        setParties(parties.map(p => p.id === id ? { ...p, [field]: value } : p));
        setSavingMsg("Saving party...");
        await supabase.from("parties").update({ [field]: value }).eq("id", id);
        setSavingMsg("Saved");
        setTimeout(() => setSavingMsg(""), 2000);
    };

    const handleUpdateSpecial = async (id: string, votes: number) => {
        setSpecialVotes(specialVotes.map(s => s.id === id ? { ...s, votes } : s));
        setSavingMsg("Saving special vote...");
        await supabase.from("special_votes").update({ votes }).eq("id", id);
        setSavingMsg("Saved");
        setTimeout(() => setSavingMsg(""), 2000);
    };

    const handleUpdateBooth = async (id: number, winner: string | null) => {
        setBooths(booths.map(b => b.id === id ? { ...b, winner } : b));
        setSavingMsg("Saving booth...");
        await supabase.from("booths").update({ winner }).eq("id", id);
        // Auto calculate booths_counted
        const counted = booths.filter(b => b.id === id ? winner !== null : b.winner !== null).length;
        await handleSaveSettings("booths_counted", counted);
        setSavingMsg("Saved");
        setTimeout(() => setSavingMsg(""), 2000);
    };

    const handleUploadImage = async (file: File, type: 'logo' | 'president', partyId: number) => {
        setSavingMsg("Uploading image...");
        const ext = file.name.split('.').pop();
        const filename = `${type}_party${partyId}_${Date.now()}.${ext}`;

        const { data, error } = await supabase.storage
            .from("election_assets")
            .upload(filename, file, { cacheControl: '3600', upsert: true });

        if (error) {
            alert("Upload failed: " + error.message);
            setSavingMsg("");
            return;
        }

        const { data: publicUrlData } = supabase.storage.from("election_assets").getPublicUrl(filename);
        const url = publicUrlData.publicUrl;

        if (type === 'logo') {
            await handleUpdateParty(partyId, 'logo_url', url);
        } else {
            await handleUpdateParty(partyId, 'president_photo_url', url);
        }
        setSavingMsg("Image Uploaded");
        setTimeout(() => setSavingMsg(""), 2000);
    };

    // ─── Render ──────────────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <FontStyle />
                <div className="glass-panel w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-yellow-500 mb-4 text-center">Admin Login</h1>
                    <OTPInput value={authPin} onChange={setAuthPin} onComplete={(v) => {
                        if (v === PIN) setIsAuthenticated(true);
                        else { alert("Incorrect PIN"); setAuthPin(""); }
                    }} />
                    <p className="text-xs text-stone-500 text-center mt-4">Demo PIN: 2569</p>
                </div>
            </div>
        );
    }

    if (loading) return <div className="p-10 text-center"><FontStyle />Loading Admin...</div>;

    return (
        <div className="min-h-screen p-4 md:p-8">
            <FontStyle />

            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                <div className="flex items-center justify-between glass-panel !py-4">
                    <h1 className="text-2xl font-black text-yellow-500">Election Dashboard Admin</h1>
                    {savingMsg && <span className="text-green-400 font-bold text-sm bg-green-500/20 px-3 py-1 rounded-md">{savingMsg}...</span>}
                </div>

                {/* --- Settings --- */}
                <section className="glass-panel">
                    <h2 className="text-xl font-bold mb-4 border-b border-stone-800 pb-2">⚙️ ตั้งค่าระบบ (Settings)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm text-stone-400 block mb-1">สถานะ Live</label>
                            <select value={settings?.is_live ? "true" : "false"} onChange={e => handleSaveSettings("is_live", e.target.value === "true")}>
                                <option value="true">🟢 เปิด Live Counting</option>
                                <option value="false">🔴 ปิด</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-stone-400 block mb-1">จำนวนผู้มีสิทธิ์ (Total Voters)</label>
                            <input type="number" value={settings?.total_voters || 0} onChange={e => handleSaveSettings("total_voters", parseInt(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="text-sm text-stone-400 block mb-1">จำนวนคูหาทั้งหมด</label>
                            <input type="number" value={settings?.booths_total || 0} onChange={e => handleSaveSettings("booths_total", parseInt(e.target.value) || 0)} />
                        </div>
                    </div>
                </section>

                {/* --- Parties / Scores --- */}
                <section className="glass-panel">
                    <h2 className="text-xl font-bold mb-4 border-b border-stone-800 pb-2">🗳️ คะแนนผู้สมัคร (Parties)</h2>
                    <div className="flex flex-col gap-6">
                        {parties.map(p => (
                            <div key={p.id} className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                {/* Images */}
                                <div className="flex flex-col gap-3">
                                    <span className="font-bold text-lg text-yellow-500">เบอร์ {p.number} : {p.name}</span>
                                    <div className="flex items-center gap-2">
                                        <img src={p.logo_url || 'https://via.placeholder.com/50'} className="w-12 h-12 object-cover rounded-md border border-stone-700" alt="Logo" />
                                        <label className="text-xs bg-stone-800 hover:bg-stone-700 px-2 py-1 rounded cursor-pointer">
                                            เปลี่ยนโลโก้
                                            <input type="file" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'logo', p.id)} />
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img src={p.president_photo_url || 'https://via.placeholder.com/50'} className="w-12 h-12 object-cover rounded-md border border-stone-700" alt="President" />
                                        <label className="text-xs bg-stone-800 hover:bg-stone-700 px-2 py-1 rounded cursor-pointer">
                                            รูปประธาน
                                            <input type="file" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'president', p.id)} />
                                        </label>
                                    </div>
                                </div>

                                {/* Info Input */}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label className="text-xs text-stone-400">ชื่อพรรค</label>
                                            <input type="text" value={p.name} onChange={e => handleUpdateParty(p.id, "name", e.target.value)} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs text-stone-400">ชื่อประธาน</label>
                                            <input type="text" value={p.president_name} onChange={e => handleUpdateParty(p.id, "president_name", e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-stone-400">Instagram URL</label>
                                        <input type="text" value={p.instagram_url} onChange={e => handleUpdateParty(p.id, "instagram_url", e.target.value)} />
                                    </div>
                                </div>

                                {/* Score Input */}
                                <div className="bg-stone-950 p-4 rounded-xl text-center border border-yellow-500/20 shadow-[0_0_15px_rgba(212,160,23,0.1)]">
                                    <label className="text-sm font-black text-stone-400 block mb-2">คะแนนปัจจุบัน</label>
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="w-10 h-10 bg-stone-800 rounded-lg font-bold text-xl hover:bg-stone-700" onClick={() => handleUpdateParty(p.id, "votes", Math.max(0, p.votes - 1))}>-</button>
                                        <input type="number" className="text-center font-black text-3xl max-w-[120px] bg-transparent border-none focus:ring-0 text-white" value={p.votes} onChange={e => handleUpdateParty(p.id, "votes", parseInt(e.target.value) || 0)} />
                                        <button className="w-10 h-10 bg-stone-800 rounded-lg font-bold text-xl hover:bg-stone-700" onClick={() => handleUpdateParty(p.id, "votes", p.votes + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Special Votes & Booths --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="glass-panel">
                        <h2 className="text-xl font-bold mb-4 border-b border-stone-800 pb-2">📦 บัตรเสีย / งดออกเสียง</h2>
                        <div className="flex flex-col gap-4">
                            {specialVotes.map(s => (
                                <div key={s.id} className="flex items-center justify-between p-3 bg-stone-900/50 rounded-lg border border-stone-800">
                                    <span className="font-bold">{s.label}</span>
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 flex items-center justify-center bg-stone-800 rounded hover:bg-stone-700" onClick={() => handleUpdateSpecial(s.id, Math.max(0, s.votes - 1))}>-</button>
                                        <input type="number" className="text-center w-20 bg-transparent font-bold text-xl" value={s.votes} onChange={e => handleUpdateSpecial(s.id, parseInt(e.target.value) || 0)} />
                                        <button className="w-8 h-8 flex items-center justify-center bg-stone-800 rounded hover:bg-stone-700" onClick={() => handleUpdateSpecial(s.id, s.votes + 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="glass-panel">
                        <h2 className="text-xl font-bold mb-4 border-b border-stone-800 pb-2">⛺ สถานะคูหาทีละหน่วย</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {booths.map(b => (
                                <div key={b.id} className="p-3 bg-stone-900/50 rounded-lg border border-stone-800 flex flex-col gap-2">
                                    <span className="text-sm text-stone-400 font-bold">คูหา {b.id}</span>
                                    <select className="text-sm py-1" value={b.winner || ""} onChange={e => handleUpdateBooth(b.id, e.target.value || null)}>
                                        <option value="">⏳ กำลังนับ / ยังไม่เริ่ม</option>
                                        <option value="party1">✅ เบอร์ 1 ชนะ</option>
                                        <option value="party2">✅ เบอร์ 2 ชนะ</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}

// ─── Utility Components ────────────────────────────────────────────────────
function OTPInput({ value, onChange, onComplete }: { value: string, onChange: (v: string) => void, onComplete: (v: string) => void }) {
    return (
        <input
            type="password"
            placeholder="Enter PIN..."
            className="text-center text-xl tracking-widest font-black p-4"
            value={value}
            onChange={e => {
                onChange(e.target.value);
                if (e.target.value.length === 4) onComplete(e.target.value);
            }}
            maxLength={4}
        />
    );
}