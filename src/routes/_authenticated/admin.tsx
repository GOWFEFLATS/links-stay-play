import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type Signup = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  group_size: number | null;
  preferred_month: string | null;
  notes: string | null;
  created_at: string;
};

type Admin = { user_id: string; email: string; created_at: string };

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Priority Signups | Gowfe Flats" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Signup[] | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [meId, setMeId] = useState<string | null>(null);
  const [meEmail, setMeEmail] = useState<string | null>(null);
  const [adminCount, setAdminCount] = useState<number | null>(null);
  const [promoteEmail, setPromoteEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    setErr(null);
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id ?? null;
    const email = userData.user?.email ?? null;
    setMeId(uid);
    setMeEmail(email);
    if (!uid) return;

    const { count } = await supabase
      .from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin");
    setAdminCount(count ?? 0);

    const { data: roleRows } = await supabase
      .from("user_roles").select("role").eq("user_id", uid).eq("role", "admin");
    const admin = !!roleRows && roleRows.length > 0;
    setIsAdmin(admin);
    if (!admin) return;

    const [{ data: signups, error: sErr }, { data: adminList }] = await Promise.all([
      supabase.from("priority_signups").select("*").order("created_at", { ascending: false }),
      supabase.rpc("list_admins"),
    ]);
    if (sErr) setErr(sErr.message);
    else setRows((signups ?? []) as Signup[]);
    setAdmins((adminList ?? []) as Admin[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function claimAdmin() {
    setBusy(true); setErr(null);
    const { data, error } = await supabase.rpc("claim_first_admin");
    setBusy(false);
    if (error) { setErr(error.message); return; }
    if (data) { setToast("You are now an admin."); await load(); }
    else setErr("Admin already exists. Ask an existing admin to grant you access.");
  }

  async function promote(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await supabase.rpc("promote_admin_by_email", { _email: promoteEmail.trim() });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setToast(`Granted admin to ${promoteEmail}.`);
    setPromoteEmail("");
    await load();
  }

  async function revoke(userId: string, email: string) {
    if (!confirm(`Revoke admin access from ${email}?`)) return;
    setBusy(true); setErr(null);
    const { error } = await supabase.rpc("revoke_admin", { _user_id: userId });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setToast(`Revoked admin from ${email}.`);
    await load();
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  function exportCsv() {
    if (!rows || rows.length === 0) return;
    const headers = ["Date","Name","Email","Phone","Group size","Preferred month","Notes"];
    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [
      headers.join(","),
      ...rows.map((r) => [
        new Date(r.created_at).toISOString(),
        r.name, r.email, r.phone ?? "",
        r.group_size ?? "", r.preferred_month ?? "", r.notes ?? "",
      ].map(escape).join(",")),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `priority-signups-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Not admin: show claim flow if no admins exist yet, otherwise show "ask admin"
  if (isAdmin === false) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-background">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-serif text-3xl">Admin access</h1>
          {adminCount === 0 ? (
            <>
              <p className="text-foreground/60 text-sm">
                No admin exists yet. Claim admin access for <strong>{meEmail}</strong> to bootstrap the dashboard.
              </p>
              {err && <p className="text-red-600 text-sm">{err}</p>}
              <button
                onClick={claimAdmin} disabled={busy}
                className="px-6 py-3 rounded-full bg-ink text-sand text-sm disabled:opacity-60"
              >
                {busy ? "Working…" : "Claim admin access"}
              </button>
            </>
          ) : (
            <p className="text-foreground/60 text-sm">
              Your account is signed in but is not an admin. Ask an existing admin to grant
              access to <strong>{meEmail}</strong>.
            </p>
          )}
          <button onClick={signOut} className="block mx-auto text-xs text-foreground/50 hover:text-foreground">Sign out</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl">Priority Signups</h1>
            <p className="text-sm text-foreground/60 mt-1">{rows?.length ?? 0} total</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              disabled={!rows || rows.length === 0}
              className="px-4 py-2 rounded-full bg-ink text-sand text-xs font-medium disabled:opacity-40"
            >
              Export CSV
            </button>
            <button onClick={signOut} className="px-4 py-2 rounded-full border border-foreground/15 text-xs">Sign out</button>
          </div>
        </header>

        {toast && <div className="rounded-lg bg-green-50 text-green-800 text-sm px-4 py-2">{toast}</div>}
        {err && <p className="text-red-600 text-sm">{err}</p>}

        {/* Admin management */}
        <section className="border border-foreground/10 rounded-2xl p-6 space-y-4 bg-muted/20">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">Admins</h2>
            <span className="text-xs text-foreground/50">{admins.length} total</span>
          </div>
          <form onSubmit={promote} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email" required value={promoteEmail}
              onChange={(e) => setPromoteEmail(e.target.value)}
              placeholder="user@example.com (must have signed up at /auth first)"
              className="flex-1 px-4 py-2 rounded-lg border border-foreground/15 bg-background text-sm"
            />
            <button
              type="submit" disabled={busy}
              className="px-5 py-2 rounded-full bg-ink text-sand text-xs font-medium disabled:opacity-60"
            >
              {busy ? "Working…" : "Grant admin"}
            </button>
          </form>
          <ul className="divide-y divide-foreground/5">
            {admins.map((a) => (
              <li key={a.user_id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <div className="font-medium">{a.email}{a.user_id === meId && <span className="ml-2 text-xs text-foreground/50">(you)</span>}</div>
                  <div className="text-xs text-foreground/40">since {new Date(a.created_at).toLocaleDateString()}</div>
                </div>
                {a.user_id !== meId && (
                  <button
                    onClick={() => revoke(a.user_id, a.email)} disabled={busy}
                    className="text-xs text-red-600 hover:underline disabled:opacity-50"
                  >Revoke</button>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Signups table */}
        {rows === null && !err && <p className="text-foreground/60">Loading…</p>}
        {rows && rows.length === 0 && (
          <div className="border border-dashed border-foreground/15 rounded-2xl p-16 text-center text-foreground/50">
            No signups yet.
          </div>
        )}
        {rows && rows.length > 0 && (
          <div className="overflow-x-auto border border-foreground/10 rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-[10px] uppercase tracking-widest text-foreground/60">
                <tr>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">Group</th>
                  <th className="text-left px-4 py-3">Month</th>
                  <th className="text-left px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-foreground/5">
                    <td className="px-4 py-3 text-foreground/60 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3"><a className="hover:underline" href={`mailto:${r.email}`}>{r.email}</a></td>
                    <td className="px-4 py-3">{r.phone ?? "—"}</td>
                    <td className="px-4 py-3">{r.group_size ?? "—"}</td>
                    <td className="px-4 py-3">{r.preferred_month ?? "—"}</td>
                    <td className="px-4 py-3 max-w-xs truncate" title={r.notes ?? ""}>{r.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
