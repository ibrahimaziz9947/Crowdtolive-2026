"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clientEnv } from "@/config/env";
import type { AdminSession } from "../lib/auth-shared";
import type { AdminRegistration, RegistrationStatus } from "../types";
import { AdminShell } from "./admin-shell";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatBoolean(value: boolean) {
  return value ? "Yes" : "No";
}

export function RegistrationDetailsView({
  session,
  registrationId,
}: {
  session: AdminSession;
  registrationId: string;
}) {
  const router = useRouter();
  const [registration, setRegistration] = useState<AdminRegistration | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<RegistrationStatus>("NOT_QUALIFIED");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadRegistration() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/api/admin/registrations/${registrationId}`,
          {
            credentials: "include",
          },
        );

        const json = (await response.json()) as
          | {
              success: true;
              data: AdminRegistration;
            }
          | {
              success: false;
              message?: string;
            };

        if (!response.ok || json.success === false) {
          const message =
            "message" in json && typeof json.message === "string"
              ? json.message
              : "We could not load this registration.";
          throw new Error(message);
        }

        if (isActive) {
          setRegistration(json.data);
          setSelectedStatus(json.data.status);
        }
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError instanceof Error ? loadError.message : "We could not load this registration.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadRegistration();

    return () => {
      isActive = false;
    };
  }, [registrationId]);

  async function onSaveStatus() {
    setIsSaving(true);
    setSaveError("");

    try {
      const response = await fetch(
        `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/api/admin/registrations/${registrationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: selectedStatus,
          }),
        },
      );

      const json = (await response.json()) as
        | {
            success: true;
            data: {
              registration: AdminRegistration;
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
            : "We could not update the registration status.";
        throw new Error(message);
      }

      router.push(`/admin/dashboard?updated=${encodeURIComponent(selectedStatus)}`);
      router.refresh();
    } catch (updateError) {
      setSaveError(
        updateError instanceof Error
          ? updateError.message
          : "We could not update the registration status.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AdminShell
      session={session}
      title="Registration Details"
      subtitle="Review the full registration submission and update the qualification status."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">Registration ID</p>
          <h3 className="mt-1 break-all font-mono text-lg text-slate-100">{registrationId}</h3>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/dashboard")}
          className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/5"
        >
          Back to dashboard
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center text-slate-400">
          Loading registration details...
        </div>
      ) : null}

      {!isLoading && registration ? (
        <>
          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Submitted Information</p>
              <h4 className="mt-1 text-xl font-semibold">Application details</h4>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["Email", registration.email],
                  ["City", registration.city],
                  ["Property found", formatBoolean(registration.propertyFound)],
                  ["Joint application", formatBoolean(registration.jointApplication)],
                  ["Deposit", formatCurrency(registration.deposit)],
                  ["Property price", formatCurrency(registration.propertyPrice)],
                  ["Annual salary", formatCurrency(registration.annualSalary)],
                  ["Created", formatDate(registration.createdAt)],
                  ["Updated", formatDate(registration.updatedAt)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-4"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                      {label}
                    </div>
                    <div className="mt-2 text-sm text-slate-100">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Status Management</p>
              <h4 className="mt-1 text-xl font-semibold">Update qualification status</h4>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Current status
                  </div>
                  <div className="mt-2 text-sm text-slate-100">
                    {registration.status.replaceAll("_", " ")}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200" htmlFor="status">
                    New status
                  </label>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value as RegistrationStatus)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
                  >
                    <option value="NOT_QUALIFIED">Not qualified</option>
                    <option value="QUALIFIED">Qualified</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>

                {saveError ? (
                  <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                    {saveError}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => void onSaveStatus()}
                  disabled={isSaving}
                  className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? "Updating..." : "Update status"}
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </AdminShell>
  );
}
