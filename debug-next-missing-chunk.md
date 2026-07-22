# Debug Session: next-missing-chunk

- Status: OPEN
- Symptom: Next.js dev server fails with `Cannot find module './191.js'` from `apps/web/.next/server/webpack-runtime.js`, followed by multiple `/_next/static/... 404` responses.
- Scope: Local development runtime only.

## Hypotheses

1. The `apps/web/.next` build cache is stale or partially corrupted, so runtime references point to chunk files that no longer exist.
2. A previously running dev server kept old chunk references in memory while a new incremental compile emitted different chunk IDs.
3. Static assets under `/_next/static/...` are being requested from an outdated build state after route changes, causing chunk/runtime mismatch.
4. The issue is local cache/runtime state only and not a source-code compilation problem, because recent `lint`, `typecheck`, and `build` passed.
5. The missing chunk is caused by a genuine source-level import graph issue, which would reproduce immediately after a clean rebuild.

## Evidence Plan

- Inspect the current `apps/web/.next` state and confirm missing runtime chunk files.
- Stop any running dev server process.
- Remove the local Next build cache.
- Restart the web dev server and compare pre-fix vs post-fix runtime behavior.
