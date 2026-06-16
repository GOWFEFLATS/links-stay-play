import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  const [err, setErr] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return;
      const { data: roleRows } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin");
      const admin = !!roleRows && roleRows.length > 0;
      setIsAdmin(admin);
      if (!admin) return;
      const { data, error } = await supabase
        .from("priority_signups")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setErr(error.message);
      else setRows(data as Signup[]);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === false) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-background">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-serif text-3xl">Not authorized</h1>
          <p className="text-foreground/60 text-sm">
            Your account is signed in but does not have admin access. Ask an existing admin to grant
            your account the <code>admin</code> role in the <code>user_roles</code> table.
          </p>
          <button onClick={signOut} className="px-5 py-2 rounded-full bg-ink text-sand text-sm">
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-4xl">Priority Signups</h1>
            <p className="text-sm text-foreground/60 mt-1">{rows?.length ?? 0} total</p>
          </div>
          <button
            onClick={signOut}
            className="px-5 py-2 rounded-full border border-foreground/15 text-sm"
          >
            Sign out
          </button>
        </header>

        {err && <p className="text-red-600 text-sm">{err}</p>}
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
                    <td className="px-4 py-3">
                      <a className="hover:underline" href={`mailto:${r.email}`}>
                        {r.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{r.phone ?? "—"}</td>
                    <td className="px-4 py-3">{r.group_size ?? "—"}</td>
                    <td className="px-4 py-3">{r.preferred_month ?? "—"}</td>
                    <td className="px-4 py-3 max-w-xs truncate" title={r.notes ?? ""}>
                      {r.notes ?? "—"}
                    </td>
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
