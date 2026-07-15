# CrowdToLive Product and Engineering Roadmap

## Scope

This roadmap reflects the repository as inspected on 15 July 2026. It is a planning document only: it does not authorize implementation or change existing production behavior. Priorities should be revisited against incoming business requirements, compliance obligations, and production telemetry before work begins.

## 1. Completed features

### Core platform

- npm-workspaces monorepo with Next.js 15/React 19 frontend, NestJS 11 API, TypeScript, Mongoose, and MongoDB Atlas-compatible configuration.
- Vercel configuration that deploys Next.js and routes `/api/*` to the cached Nest serverless handler.
- Zod-backed backend environment validation, CORS configuration, global DTO transformation/whitelisting, error envelope, and success envelope.
- Health endpoint at `GET /api/health` including Mongoose connection state.
- Local developer scripts for concurrent development, build, lint, type checking, formatting, and initial admin seeding.

### Registration and qualification

- Responsive multi-step qualification interface collecting contact, property, deposit, location, price, joint-application, salary, and email inputs.
- Country-aware phone-number validation using `libphonenumber-js` and country data from `i18n-iso-countries`.
- `POST /api/register` with class-validator DTO checks and MongoDB persistence.
- `registrations` schema with creation/update timestamps and indexes for recency, status, email, and city.
- Not-qualified result page and client-side storage of registration id/status.

### Administration

- Mongo-backed administrator model, one-time seed command, bcrypt password verification, and JWT creation.
- HTTP-only admin session cookie hand-off between Nest and Next, server-rendered protected-page redirects, API guard, and logout flow.
- Admin dashboard with registration aggregate counts, pagination, email/city search, status filtering, and registration links.
- Registration detail page and protected status updates (`NOT_QUALIFIED`, `QUALIFIED`, `PENDING`).

### Marketing and landing pages

- CrowdToLive home page with responsive marketing sections, CTA, FAQs, social links, and hosted media.
- Generic static landing templates for startup, charity, academy/SEO, and case-study/testimonial variants.
- Dedicated Amana Home Deposit Builder marketing page.
- Dedicated Bayuti Finder page that verifies a contact with the external Finder API and displays returned submitted-property links.

## 2. Partially implemented features

| Area | What exists | Remaining work |
|---|---|---|
| Qualification workflow | Intake UI, persistence, admin status editing. | Define real qualification rules; persist the complete applicant profile; create distinct qualified/pending outcomes and follow-up workflow. |
| Registration lifecycle | Status enum and admin editing. | Add status-transition policy, assigned owner, internal notes/audit trail, notifications, and applicant-facing progress. |
| Admin authentication | JWT sign-in, cookie session, protected routes. | Add account lifecycle management, role/permission policy, revocation/rotation strategy, and operational security controls. |
| Bayuti Finder | Email check to third-party endpoint; displays saved URLs. | Integrate or formally define property search, access policy, error/retry behavior, data ownership, and privacy terms. |
| Amana landing | Complete visual page with CTA/forms/calculator presentation. | Define functional requirements and wire approved lead capture/calculator workflows to a backend or authorised provider. |
| Generic landing pages | Static content-driven pages and CTAs. | Connect any required form capture, analytics, conversion attribution, CMS/editorial workflow, and legal links. |
| Shared package | API envelope and feature types. | Expand only where a cross-application contract genuinely needs to be shared; avoid moving feature-local types prematurely. |

## 3. Explicit placeholders

### Admin Customers

The admin navigation labels Customers as “Soon” and routes it to `#`. There is no customer/user schema, controller, service, dashboard view, or authorization model. Before implementation, clarify whether a customer is an applicant, an account holder, or both; whether admins can edit data; and which PII/actions are permitted.

### Admin Reporting

Reporting is also a “Soon” navigation item with no route or backend aggregation endpoint. Establish the required KPI definitions, time zones, reporting periods, data freshness, export needs, and access policy before building it.

### Admin Settings

Settings is a “Soon” navigation item with no implementation. Define settings ownership, audit requirements, validation, rollback behavior, and whether values should be environment-managed, database-managed, or third-party managed. Do not expose deployment/security settings through the dashboard by default.

### Empty domain modules

The `UsersModule`, `PropertiesModule`, and `DocumentsModule` are currently empty placeholders. They should not be treated as partially implemented APIs. Their data model, permissions, storage policy, retention policy, and integration requirements need product approval first.

## 4. Technical debt

- Historical `.trae` PRD/architecture documents and the Next starter README describe an early scaffold rather than current implemented behavior. Keep authoritative documentation maintained when production scope changes.
- `MongoConnectionService` duplicates connection behavior but is not registered as a provider; the actual runtime connection is managed by `MongooseModule.forRootAsync`.
- Registration DTO validation is manually repeated in its controller after the global validation pipe; behavior should be consolidated only as part of a narrowly scoped, tested maintenance task.
- The registration response still says the frontend can consume the endpoint “in the next phase,” which no longer reflects the live client behavior.
- `autoIndex` is disabled. Schema indexes are declared but need an intentional production provisioning/migration process.
- User-facing copy contains character-encoding artefacts such as `â€™`/`Â®` in several components/content files.
- Next image optimization is disabled globally, while marketing surfaces depend on external media URLs. This creates availability and performance dependencies outside the repository.
- No automated tests (unit, integration, API contract, or end-to-end) are present in the repository.
- The dashboard’s client-side API-fetching and error parsing are feature-specific rather than using a deliberately shared API client; avoid introducing duplicate fetch/error logic as new screens are added.

## 5. Missing validation and data-quality controls

### Registration intake

- Contact fields collected by the wizard (first name, last name, country, phone number) are not persisted or sent to the API.
- Numeric values require presence and numeric type but lack explicit positivity, upper/lower bounds, currency precision, affordability rules, and cross-field validation (for example deposit relative to property price).
- City is arbitrary free text without normalization, supported-geography checks, or length constraints.
- Email is format-validated but not normalized/deduplicated; duplicate registrations are permitted.
- There is no consent capture/timestamp, privacy-policy version, marketing preference, or evidence of consent even though the UI communicates data collection.
- There is no server-side qualification decision calculation; every newly stored registration defaults to `NOT_QUALIFIED`.

### Admin workflow

- Status updates accept any enum value without a defined state-transition policy, reason, note, actor record, or notification consequence.
- There is no optimistic-concurrency/versioning control for two admins updating the same registration.
- Search and list limits are validated, but product-specific access boundaries and data-retention constraints are not modelled.

## 6. Security improvements

Prioritise these before expanding functionality that increases PII, administrative scope, or external integrations.

1. Require production-only secrets: remove reliance on default JWT/seed credentials in production configuration and enforce strong, separately rotated Vercel secrets.
2. Add rate limiting and abuse protection to admin login and public registration; consider IP/email controls and an approved bot-defense solution for public forms.
3. Introduce admin account management: password reset/change process, account disablement, forced logout/session revocation, and login/audit events.
4. Verify the JWT subject against an active admin record and authorisation policy on protected requests; do not rely solely on a self-contained token for future multi-role access.
5. Define secure cookie policy for the final production topology (same-origin vs. separate API origin), including `Secure`, `HttpOnly`, `SameSite`, CORS allow-list, and CSRF protection for cookie-authenticated mutations.
6. Add structured security logging without credentials/tokens/PII, alerting for repeated failed logins, and an audit log for status/administrative changes.
7. Establish PII protections: data minimisation, encryption/Atlas access controls, retention/deletion process, subject-access workflow, and compliance review appropriate to the operating jurisdiction.
8. Validate and constrain third-party responses/URLs displayed by Bayuti Finder, and document outage/failure behavior for that dependency.
9. Add dependency scanning, secret scanning, and a controlled dependency-update process in CI.

## 7. Performance and reliability improvements

1. Establish observability first: structured logs, error tracking, health/readiness monitoring, latency/error metrics, and deployment alerts.
2. Confirm Mongo Atlas indexes from the real query patterns and provision them via a controlled migration/index process. Monitor slow queries as registration volume grows.
3. Review the admin list query and status-count aggregation at production data volumes; cache/report aggregates only when measurements justify it.
4. Use explicit request timeouts, failure states, and user-safe retry behavior for the Bayuti Finder external request and other future third-party calls.
5. Optimise marketing media intentionally: assess external video/image sizes, caching/CDN strategy, and whether selective Next image optimization is appropriate.
6. Add pagination/search UX resilience—debouncing only if it matches the desired interaction—and preserve filter state in URLs when product requirements call for shareable/admin-returnable views.
7. Run load testing before opening public campaigns or high-volume integrations, particularly on Vercel serverless and Mongo connection-pool limits.

## 8. Production readiness checklist

### Release controls

- [ ] Pull request review and a protected `main` branch are configured before deployment-triggering pushes.
- [ ] CI runs typecheck, lint, build, and a test suite appropriate to the changed area.
- [ ] Deployment previews are reviewed for customer-facing changes; rollback procedure is documented and rehearsed.
- [ ] No secrets, credentials, access tokens, or Atlas URIs are committed.

### Configuration and infrastructure

- [ ] Vercel production environment has secure `JWT_SECRET`, `MONGODB_URI`, seed credential policy, cookie name, CORS origin, and public API base URL.
- [ ] Vercel routing is verified in production: `/api/health`, registration, admin login, and protected dashboard requests all use the intended origin/cookie behavior.
- [ ] MongoDB Atlas network access, least-privilege database user, backups, recovery objectives, and index provisioning are verified.
- [ ] Health monitoring, error tracking, logging/alerting, and third-party dependency monitoring are active.

### Security and compliance

- [ ] Login and registration abuse controls are deployed and tested.
- [ ] Cookie/CSRF/CORS controls are validated against the actual domain topology.
- [ ] Admin auditing, role policy, account disablement, and incident response are defined before more staff receive access.
- [ ] Privacy notice, consent capture, retention/deletion, and data-access processes have legal/compliance approval.

### Product quality

- [ ] Qualification rules, outcomes, and customer communications are approved and tested end to end.
- [ ] Registration fields, validation, duplicate policy, and data ownership are agreed.
- [ ] Placeholder forms/links are either implemented, labelled appropriately, or removed from production surfaces.
- [ ] Core flows are covered by automated tests and manual acceptance scenarios across desktop/mobile browsers.
- [ ] Text encoding, accessibility, error states, loading states, and analytics requirements are reviewed.

## 9. Recommended implementation order

### Phase 0 — Stabilise and protect the live core

1. Define the production environment/secret policy, validate Vercel routing and cookie behavior, and add baseline monitoring/error tracking.
2. Add a minimal automated quality gate: typecheck, lint, build, API integration coverage for registration/admin auth, and end-to-end coverage for the main registration/admin status path.
3. Implement rate limiting/abuse controls and admin audit logging; clarify the PII/compliance baseline before collecting more data.
4. Provision/verify Atlas indexes and recovery/operational procedures.

### Phase 1 — Complete the registration product journey

5. Obtain approved business rules for qualification, eligibility, status semantics, and customer messaging.
6. Extend the approved data model and endpoint contract to persist only the required contact/consent data, with validation and migration plans.
7. Implement server-side qualification/state transition behavior and distinct qualified, pending, and not-qualified experiences.
8. Add admin workflow essentials: status reasons/notes, audit history, concurrency policy, and notifications only where approved.

### Phase 2 — Build the next approved admin capability

9. Prioritise **Customer Management** if operations need applicant/account visibility and lifecycle actions; otherwise prioritise **Reporting** if decisions require trusted KPIs. Do not build both from assumptions.
10. Define and build the underlying roles, data contracts, audit, and API endpoints before dashboard presentation.
11. Add Settings only for clearly identified, non-secret, audited configuration that cannot remain environment-managed.

### Phase 3 — Expand product and conversion surfaces

12. Implement only business-approved landing pages and connect forms to an authorised lead/registration workflow.
13. Decide whether Amana lead capture/calculation and Bayuti Finder’s full search workflow belong in this product, an owned backend integration, or an external platform.
14. Add analytics and conversion measurement after consent, data ownership, and reporting definitions are approved.

### Continuous work

15. Address encoding/accessibility/media optimisations and selected code cleanup only when covered by tests and scoped separately from feature delivery.
16. Reassess the roadmap at each major business requirement, with security, performance, and deployment impact stated in the implementation plan.
