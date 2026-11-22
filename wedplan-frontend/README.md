# WedPlan

WedPlan is a wedding planning marketplace where customers browse vendors and request bookings, vendors manage service listings and booking requests, and admins review marketplace activity.

## Features

- Browse and search approved wedding services by name, category, and location; sort by price.
- Review service details and submit booking requests with an event date and location.
- Customer, vendor, and admin dashboards with role-specific access.
- Vendor service submissions, admin moderation, and Premium subscriptions through Stripe Checkout.
- Responsive layouts, loading and empty states, notifications, and reduced-motion-aware homepage transitions.

## Technology

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 and shadcn/ui
- Better Auth with MongoDB
- Express 5, MongoDB, JWT verification
- Stripe Checkout and verified webhooks
- ImgBB image hosting through a server-side upload route
- Motion for homepage section transitions

## Repositories and deployment

- Frontend: [WedPlan-A9-Frontend](https://github.com/mdraju116/WedPlan-A9-Frontend)
- Backend: [WedPlan-A9-Backend](https://github.com/mdraju116/WedPlan-A9-Backend)
- Live site: add the deployed frontend URL before submission.

## Requirements

- Node.js 20 or later and npm
- A MongoDB connection string
- Google OAuth credentials (and GitHub OAuth credentials if enabling GitHub sign-in)
- Stripe test-mode secret key, Premium price ID, and webhook secret
- ImgBB API key

## Environment variables

Copy `.env.example` to `.env.local` and set values locally. Never commit `.env`, `.env.local`, or real credentials.

The backend also needs its own `.env` based on `../WedPlan-A9-Backend/.env.example`. Configure its `FRONTEND_URL_LOCAL`, `FRONTEND_URL_VERCEL`, `MONGODB_URI`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `STRIPE_PREMIUM_PRICE_ID` values as applicable.

## Run locally

1. Start the backend from `../WedPlan-A9-Backend`:

   ```bash
   npm install
   npm run dev
   ```

2. In this frontend directory, create `.env.local` from `.env.example`, set the required values, then install and start Next.js:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000). The backend defaults to port `5000`.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Stripe webhook

Configure Stripe to send subscription events to the backend webhook endpoint at `/api/payments/webhook`. Premium access is changed only after the backend verifies the webhook signature. Use Stripe test mode for local development.
