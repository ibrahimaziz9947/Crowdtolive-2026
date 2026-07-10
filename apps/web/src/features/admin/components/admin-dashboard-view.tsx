"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientEnv } from "@/config/env";
import type { AdminRegistrationsResponse, RegistrationStatus } from "../types";
import type { AdminSession } from "../lib/auth-shared";
import { AdminShell } from "./admin-shell";

const PAGE_SIZE = 10;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getStatusClasses(status: RegistrationStatus) {
  if (status === "QUALIFIED") {
    return "bg-emerald-400/10 text-emerald-300";
  }

  if (status === "PENDING") {
    return "bg-amber-400/10 text-amber-300";
  }

  return "bg-rose-400/10 text-rose-200";
}

export function AdminDashboardView({ session }: { session: AdminSession }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RegistrationStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<AdminRegistrationsResponse | null>(null);

  const updatedStatus = searchParams.get("updated");
  const successMessage = useMemo(() => {
    if (!updatedStatus) return "";
    return `Registration status updated to ${updatedStatus.replaceAll("_", " ")} successfully.`;
  }, [updatedStatus]);

  useEffect(() => {
    let isActive = true;

    async function loadRegistrations() {
      setIsLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
        });

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (status !== "ALL") {
          params.set("status", status);
        }

        const response = await fetch(
          `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/api/admin/registrations?${params.toString()}`,
          {
            credentials: "include",
          },
        );

        const json = (await response.json()) as
          | {
              success: true;
              data: AdminRegistrationsResponse;
            }
          | {
              success: false;
              message?: string;
            };

        if (!response.ok || json.success === false) {
          const message =
            "message" in json && typeof json.message === "string"
              ? json.message
              : "We could not load registrations.";
          throw new Error(message);
        }

        if (isActive) {
          setData(json.data);
        }
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError instanceof Error ? loadError.message : "We could not load registrations.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadRegistrations();

    return () => {
      isActive = false;
    };
  }, [page, search, status]);

  const stats = useMemo(() => {
    return [
      {
        label: "Total registrations",
        value: String(data?.statistics.total ?? 0),
      },
      {
        label: "Qualified",
        value: String(data?.statistics.qualified ?? 0),
      },
      {
        label: "Pending",
        value: String(data?.statistics.pending ?? 0),
      },
      {
        label: "Not qualified",
        value: String(data?.statistics.notQualified ?? 0),
      },
    ];
  }, [data]);

  return (
    <AdminShell
      session={session}
      title="Registration Management"
      subtitle="Search, filter, review, and manage incoming registration records."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <div className="mt-4 text-3xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-slate-400">Registrations</p>
            <h3 className="mt-1 text-xl font-semibold">Manage submissions</h3>
          </div>

          <form
            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]"
            onSubmit={(event) => {
              event.preventDefault();
              setPage(1);
              setSearch(searchInput.trim());
            }}
          >
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by email or city"
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
            />

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value as RegistrationStatus | "ALL");
                setPage(1);
              }}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
            >
              <option value="ALL">All statuses</option>
              <option value="NOT_QUALIFIED">Not qualified</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="PENDING">Pending</option>
            </select>

            <button
              type="submit"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Search
            </button>
          </form>
        </div>

        {successMessage ? (
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            <span>{successMessage}</span>
            <button
              type="button"
              onClick={() => router.replace("/admin/dashboard")}
              className="rounded-full border border-emerald-300/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-200"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left">
              <thead className="bg-slate-900/70">
                <tr className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {[
                    "Registration ID",
                    "Email",
                    "City",
                    "Property Price",
                    "Annual Salary",
                    "Status",
                    "Created Date",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-4 font-medium">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/40 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                      Loading registrations...
                    </td>
                  </tr>
                ) : null}

                {!isLoading && data && data.items.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                      No registrations matched the current search or filter.
                    </td>
                  </tr>
                ) : null}

                {!isLoading && data
                  ? data.items.map((item) => (
                      <tr key={item.registrationId} className="hover:bg-white/5">
                        <td className="px-4 py-4 font-mono text-xs text-slate-300">
                          {item.registrationId}
                        </td>
                        <td className="px-4 py-4 text-slate-100">{item.email}</td>
                        <td className="px-4 py-4 text-slate-300">{item.city}</td>
                        <td className="px-4 py-4 text-slate-300">
                          {formatCurrency(item.propertyPrice)}
                        </td>
                        <td className="px-4 py-4 text-slate-300">
                          {formatCurrency(item.annualSalary)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(item.status)}`}
                          >
                            {item.status.replaceAll("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-300">{formatDate(item.createdAt)}</td>
                        <td className="px-4 py-4">
                          <Link
                            href={`/admin/dashboard/registrations/${item.registrationId}`}
                            className="inline-flex rounded-2xl border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {data
              ? `Showing page ${data.pagination.page} of ${data.pagination.totalPages} (${data.pagination.totalItems} total registrations)`
              : "No pagination data available."}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={!data?.pagination.hasPreviousPage || isLoading}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-2xl border border-white/10 px-4 py-2 text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!data?.pagination.hasNextPage || isLoading}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-2xl border border-white/10 px-4 py-2 text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
