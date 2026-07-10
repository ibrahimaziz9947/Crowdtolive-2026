import { redirect } from "next/navigation";
import { AdminLoginForm, getAdminSession } from "@/features/admin";

export const metadata = {
  title: "Admin Login | CrowdToLive",
  description: "Secure administrator sign in for the CrowdToLive dashboard.",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 text-white shadow-2xl shadow-slate-950/40 lg:block">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              CrowdToLive Administration
            </p>
            <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight">
              Operate the platform with clarity, control, and secure access.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
              Review growth signals, monitor operational activity, and manage the internal
              platform through a dedicated admin workspace built for the CrowdToLive team.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                "JWT-based authentication",
                "Protected dashboard access",
                "MongoDB-backed administrator accounts",
                "Responsive operational workspace",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="flex items-center justify-center">
            <AdminLoginForm />
          </section>
        </div>
      </div>
    </main>
  );
}
