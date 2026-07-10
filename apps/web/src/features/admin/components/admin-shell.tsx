"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clientEnv } from "@/config/env";
import type { AdminSession } from "../lib/auth-shared";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    badge: "Live",
  },
  {
    label: "Registrations",
    href: "/admin/dashboard",
    badge: "Live",
  },
  {
    label: "Customers",
    href: "#",
    badge: "Soon",
  },
  {
    label: "Reporting",
    href: "#",
    badge: "Soon",
  },
  {
    label: "Settings",
    href: "#",
    badge: "Soon",
  },
];

export function AdminShell({
  session,
  title,
  subtitle,
  children,
}: {
  session: AdminSession;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials = useMemo(() => session.email.slice(0, 2).toUpperCase(), [session.email]);

  async function onLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/session", {
        method: "DELETE",
        credentials: "include",
      });

      await fetch(`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-white/10 bg-slate-950/90 px-6 py-6 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
              CrowdToLive
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Admin Console</h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage operations, monitor performance, and oversee growth.
            </p>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive =
                item.href !== "#" && (pathname === item.href || pathname.startsWith(`${item.href}/`));

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.href !== "#") {
                      router.push(item.href);
                    }
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                    isActive
                      ? "bg-emerald-400 text-slate-950"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-70">{item.badge}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Admin Dashboard</p>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-left transition hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 font-semibold text-slate-950">
                  {initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{session.email}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {session.role.replaceAll("_", " ")}
                  </div>
                </div>
              </button>

              {isMenuOpen ? (
                <div className="absolute right-0 z-10 mt-3 w-64 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl shadow-slate-950/60">
                  <div className="rounded-2xl bg-white/5 p-3">
                    <div className="text-sm font-medium">{session.email}</div>
                    <div className="mt-1 text-xs text-slate-400">{session.role}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void onLogout()}
                    className="mt-3 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                  >
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              ) : null}
            </div>
          </header>

          <main className="space-y-8 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
