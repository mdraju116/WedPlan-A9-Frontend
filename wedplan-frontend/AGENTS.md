<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

- WedPlan is a wedding-service marketplace frontend built with Next.js 16.4, React 19, TypeScript, and the App Router.
- App code is under `src/`; route files live in `src/app/`, reusable UI in `src/components/`, shared browser/server helpers in `src/lib/`, and hooks in `src/hooks/`.
- `@/*` resolves to `src/*`. Keep imports consistent with this alias.
- The route tree includes public home and service pages, sign-in/sign-up, checkout, Better Auth handlers, and customer/vendor/admin dashboard sections.
- Keep the existing visual system: Tailwind CSS 4 with tokens in `src/app/globals.css`, shadcn components in `src/components/ui/`, and shared site chrome in `src/components/shared/`.

## Next.js and React conventions

- Before changing Next.js APIs, routing, rendering, caching, or configuration, read the relevant installed guide under `node_modules/next/dist/docs/01-app/`. Start with `01-getting-started/` and the API reference for the feature being changed; Next.js 16 renames Middleware to Proxy.
- App Router pages and layouts are Server Components by default. Add `"use client"` only to components that need state, effects, event handlers, browser APIs, or client-only libraries. Keep client boundaries as small as practical.
- In server components, use the existing server helpers for session and JWT access. Next request APIs such as `headers()` are asynchronous in this codebase; follow the installed version's docs.
- Data fetched from the backend is generally user-specific or changes frequently. Preserve explicit `cache: "no-store"` where currently used; check the current Next.js caching guide before changing fetch/cache behavior.
- Use `src/proxy.ts` for request-time optimistic redirects only. It is not the final authorization boundary; backend route authorization must remain authoritative.
- Keep route handlers in `src/app/**/route.ts` and use supported Next.js route handler conventions. Do not introduce Pages Router patterns.

## Authentication, authorization, and backend integration

- Better Auth is configured in `src/lib/auth.ts`, its browser client is `src/lib/auth-client.ts`, and the catch-all handler is `src/app/api/auth/[...all]/route.ts`. Preserve the configured user roles: `Customer`, `Vendor`, and `Admin`.
- `getCurrentUser()` and `getServerToken()` in `src/lib/` are server-only patterns; `getClientToken()` in `src/lib/access-jwt-at-client-component.ts` is for client components. Do not import server auth/database/secret-bearing modules into client code.
- The separate Express backend is configured by `NEXT_PUBLIC_SERVER_BASE_URL`. API calls send the Better Auth JWT as `Authorization: Bearer <token>` when an endpoint requires authentication. Preserve request methods, payloads, response handling, and role expectations defined by backend routes.
- Backend route source is in the sibling `../../WedPlan-A9-Backend/src/modules/` tree (when available): service, booking, user, dashboard, and payment modules. Backend auth middleware verifies JWTs and enforces role authorization. Inspect the matching backend route/controller before changing an API contract; do not treat frontend route guards as security.
- Public service listing/detail endpoints are unauthenticated; service creation/editing is vendor-only, moderation is admin-only; booking and dashboard endpoints have customer/vendor/admin-specific access. Confirm exact paths and methods from backend route files.
- When sending backend requests from server components, use `getServerToken()` and an Authorization header for protected routes. Client mutations should use the existing client token helper. Handle non-2xx responses and loading/error states consistently with adjacent components.
- Image uploads go through `src/app/api/upload/image/route.ts`, which uses the server-only `IMGBB_API_KEY`. Do not expose this key under `NEXT_PUBLIC_` or log credentials/tokens.

## Payments and secrets

- Stripe server logic belongs in server-only code (`src/lib/stripe.ts` and route handlers). Keep `STRIPE_SECRET_KEY` and `STRIPE_PREMIUM_PRICE_ID` private; never import secret-bearing Stripe code into a Client Component.
- Premium subscriptions are available to both `Customer` and `Vendor` accounts. Checkout success handling confirms completed sessions through the backend `/api/payments/confirm` endpoint; keep its session ownership and paid-status checks, and retain Stripe webhooks as the asynchronous fallback.
- Customer and vendor subscription pages refresh an inactive plan from `/api/payments/refresh-subscription`. Preserve authorization for both roles, `cache: "no-store"`, and the server JWT header when changing this flow.
- The `/api/payments/portal` route uses a read-only Stripe Billing Portal configuration. Preserve invoice history while keeping subscription cancellation, pausing, plan changes, customer updates, and payment-method edits disabled. The backend tags and reuses this configuration with `wedplan_read_only_portal` metadata.
- Admin transaction rows are paid subscription invoices and identify the account role by joining the transaction account ID/email with `/api/users`; do not assume the legacy `vendorId` transaction field means the account is a Vendor.
- Environment variables used by the frontend include `NEXT_PUBLIC_SERVER_BASE_URL`, `IMGBB_API_KEY`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `MONGODB_URI`, OAuth client credentials, and Stripe configuration. Read variable names from source/config only; never print, copy, or commit values from `.env` files.
- `.env` is local configuration and must remain untracked. Update a safe example file if environment requirements change; do not add real credentials.

## Project commands

- `npm run dev` starts the Next.js development server.
- `npm run build` creates a production build.
- `npm run lint` runs ESLint.
- `npm run start` serves a production build.

Use the narrowest relevant verification command after code changes, and report any command that could not be run. Do not modify generated files such as `.next/` or `next-env.d.ts` unless the task specifically requires it.

