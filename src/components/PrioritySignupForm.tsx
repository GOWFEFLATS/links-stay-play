import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export function PrioritySignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [preferredMonth, setPreferredMonth] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr(null);
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || trimmedName.length > 120) { setErr("Please enter a valid name."); setStatus("error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 255) {
      setErr("Please enter a valid email."); setStatus("error"); return;
    }
    const size = groupSize ? Number(groupSize) : null;
    const { error } = await supabase.from("priority_signups").insert({
      name: trimmedName,
      email: trimmedEmail,
      phone: phone.trim() || null,
      group_size: size,
      preferred_month: preferredMonth || null,
      notes: notes.trim().slice(0, 1000) || null,
    });
    if (error) { setErr(error.message); setStatus("error"); return; }
    setStatus("success");
    setName(""); setEmail(""); setPhone(""); setGroupSize(""); setPreferredMonth(""); setNotes("");
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-sand/10 border border-sand/20 rounded-2xl p-10 text-center"
      >
        <p className="font-serif italic text-3xl mb-3">You're on the list.</p>
        <p className="text-sand/70 text-sm max-w-md mx-auto">
          We'll be in touch as 2027 weekends are released in limited phases.
        </p>
      </motion.div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 rounded-lg bg-sand/5 border border-sand/15 text-sand placeholder:text-sand/40 focus:outline-none focus:border-gold transition";

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4 text-left">
      <input className={inputCls} placeholder="Full name *" value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
      <input className={inputCls} placeholder="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
      <input className={inputCls} placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={40} />
      <input className={inputCls} placeholder="Group size (4–8)" type="number" min={1} max={20} value={groupSize} onChange={(e) => setGroupSize(e.target.value)} />
      <select className={inputCls + " sm:col-span-2"} value={preferredMonth} onChange={(e) => setPreferredMonth(e.target.value)}>
        <option value="">Preferred 2027 month (optional)</option>
        {["May","June","July","August","September","October"].map((m) => (
          <option key={m} value={m}>{m} 2027</option>
        ))}
      </select>
      <textarea
        className={inputCls + " sm:col-span-2 min-h-[100px]"}
        placeholder="Anything we should know? (optional)"
        value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1000}
      />
      {err && <p className="sm:col-span-2 text-sm text-red-400">{err}</p>}
      <button
        type="submit" disabled={status === "loading"}
        className="sm:col-span-2 px-10 py-4 bg-gold text-ink rounded-full text-sm font-semibold hover:bg-gold/90 transition-all active:scale-95 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Join Priority List"}
      </button>
    </form>
  );
}
