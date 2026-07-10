"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clientEnv } from "@/config/env";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationError = useMemo(() => {
    if (!email.trim() && !password.trim()) return "";
    if (!email.trim()) return "Please enter your email address.";
    if (!isEmail(email)) return "Please enter a valid email address.";
    if (!password.trim()) return "Please enter your password.";
    if (password.trim().length < 8) return "Password must be at least 8 characters.";
    return "";
  }, [email, password]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const json = (await response.json()) as
        | {
            success: true;
            data: {
              accessToken: string;
            };
          }
        | {
            success: false;
            message?: string;
          };

      if (!response.ok || json.success === false) {
        const message =
          "message" in json && typeof json.message === "string"
            ? json.message
            : "We could not sign you in. Please try again.";
        setSubmitError(message);
        return;
      }

      await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          accessToken: json.data.accessToken,
        }),
      });

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setSubmitError("We could not sign you in. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
      <div className="mb-8 space-y-3 text-white">
        <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
          Admin Portal
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-slate-300">
          Sign in securely to access the CrowdToLive administration dashboard.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
        <div className="space-y-2">
          <label htmlFor="admin-email" className="text-sm font-medium text-slate-200">
            Email address
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
            placeholder="admin@crowdtolive.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="admin-password" className="text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
            placeholder="Enter your password"
          />
        </div>

        {submitError ? (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {submitError}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
