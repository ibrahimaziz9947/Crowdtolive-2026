import { clientEnv } from "@/config/env";
import { featureModules } from "@/lib/feature-modules";

export function AppShell() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-6 py-12 sm:px-10 lg:px-12">
      <section className="rounded-3xl border border-surface-border bg-surface p-8 shadow-2xl shadow-sky-950/20 backdrop-blur md:p-10">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
            Scaffold Ready
          </span>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              CrowdToLive full-stack foundation for Next.js 15 and NestJS.
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              This workspace is intentionally business-logic free. It prepares route groups,
              feature folders, shared types, backend modules, MongoDB configuration, and
              developer tooling so implementation can begin without restructuring the core.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-3">
            <article className="rounded-2xl border border-surface-border bg-white/4 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Frontend</p>
              <p className="mt-2 font-medium text-white">Next.js 15 App Router</p>
            </article>
            <article className="rounded-2xl border border-surface-border bg-white/4 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Backend</p>
              <p className="mt-2 font-medium text-white">NestJS + Mongoose API</p>
            </article>
            <article className="rounded-2xl border border-surface-border bg-white/4 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">API Base URL</p>
              <p className="mt-2 font-medium text-white">{clientEnv.NEXT_PUBLIC_API_BASE_URL}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featureModules.map((module) => (
          <article
            key={module.key}
            className="rounded-2xl border border-surface-border bg-surface p-6 shadow-lg shadow-slate-950/10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{module.key}</p>
            <h2 className="mt-3 text-xl font-semibold text-white">{module.label}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{module.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
