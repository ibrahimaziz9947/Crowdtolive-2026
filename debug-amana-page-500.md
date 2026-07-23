# Debug Session: amana-page-500

- Status: OPEN
- Symptom: `GET /landing/amana-home-deposit-builder` returns `500 Internal Server Error` locally.

## Hypotheses

1. The Amana page has a runtime render error introduced by the recent navbar/logo/proof-strip edits.
2. The page compiles, but a client-side module import or component export is invalid at runtime.
3. The local Next dev server is serving stale build output from `.next`, causing the route to fail despite valid source code.
4. The error is caused by a CSS module/classname issue referenced by the Amana component during render.
5. A recent route-level metadata or page module problem is affecting only this page’s local render path.

## Evidence Plan

- Reproduce the 500 against the local route.
- Inspect the active Next dev server logs for the exact stack trace.
- Check diagnostics for the Amana files.
- Only after evidence identifies the root cause, apply the smallest possible fix.
