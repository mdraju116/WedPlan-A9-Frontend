# WedPlan

WedPlan is a wedding planning marketplace that helps couples discover wedding professionals and request bookings. Vendors can manage services and booking requests, while administrators review listings, manage users, and monitor subscriptions and payments.

## Live Website Link

[https://wed-plan-a9.vercel.app](https://wed-plan-a9.vercel.app)

## Important Features

- Browse wedding services across six categories, with search, location filters, and price sorting.
- View service galleries, vendor details, prices, and locations.
- Request bookings with event dates and locations; customers can track their requests.
- Vendor dashboard for service listings, booking requests, and subscription management.
- Admin tools for service moderation, user management, bookings, and payment transactions.
- Stripe Premium subscriptions, verified webhook handling, invoice recording, and subscription portal access.
- Server-side image upload handling through ImgBB.
- Responsive layouts, loading and empty states, notifications, and reduced-motion-aware homepage transitions.

## Technology Stack

- **Frontend:** Next.js 16 App Router, React 19, TypeScript
- **UI:** Tailwind CSS 4, shadcn/ui, Lucide icons
- **Authentication:** Better Auth with MongoDB
- **Backend:** Express 5, TypeScript, MongoDB, JWT verification
- **Payments:** Stripe Checkout, Billing Portal, and webhooks
- **Image hosting:** ImgBB
- **Animation:** Motion

## Project Structure

```text
WedPlan-A9-Frontend/
├── public/                     # Static assets
├── src/
│   ├── app/                    # App Router pages, layouts, and API routes
│   │   ├── (auth)/              # Sign-in and sign-up pages
│   │   ├── api/                 # Better Auth and image upload handlers
│   │   ├── checkout/            # Stripe checkout and success pages
│   │   ├── dashboard/           # Customer, vendor, and admin dashboards
│   │   └── services/            # Service browsing and detail pages
│   ├── components/
│   │   ├── dashboard/           # Dashboard forms, lists, and controls
│   │   ├── home/                # Homepage banner and sections
│   │   ├── services/            # Service browser and booking UI
│   │   ├── shared/              # Navbar and footer
│   │   └── ui/                  # Shared UI components
│   ├── hooks/                   # React hooks
│   └── lib/                     # Auth, Stripe, tokens, and shared helpers
├── .env.example                 # Frontend environment variable template
└── package.json

WedPlan-A9-Backend/
├── src/
│   ├── config/                  # MongoDB and Stripe setup
│   ├── middlewares/             # Authentication, authorization, and errors
│   └── modules/                 # User, service, booking, dashboard, payment APIs
├── .env.example                 # Backend environment variable template
└── package.json
```
## Client and Server Repository Links

- **Client (frontend):** [WedPlan-A9-Frontend](https://github.com/mdraju116/WedPlan-A9-Frontend)
- **Server (backend):** [WedPlan-A9-Backend](https://github.com/mdraju116/WedPlan-A9-Backend)

## Installation Instructions

Requirements: Node.js 20 or later, npm, MongoDB, and Stripe credentials for subscription features. Google and GitHub OAuth credentials are needed only for the enabled social sign-in providers.

Clone both repositories into sibling directories:

```bash
git clone https://github.com/mdraju116/WedPlan-A9-Frontend.git
git clone https://github.com/mdraju116/WedPlan-A9-Backend.git
```

Install dependencies in each project:

```bash
cd WedPlan-A9-Frontend
npm install

cd ../WedPlan-A9-Backend
npm install
```

Create local environment files from the examples:

```bash
# Frontend
cp WedPlan-A9-Frontend/.env.example WedPlan-A9-Frontend/.env.local

# Backend
cp WedPlan-A9-Backend/.env.example WedPlan-A9-Backend/.env
```

Set the placeholder values in both files. Keep real credentials private and out of version control.

## How to Run the Project Locally

1. Configure the frontend `.env.local` with `NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:5000`, `BETTER_AUTH_URL=http://localhost:3000`, `BETTER_AUTH_SECRET`, `MONGODB_URI`, and the required OAuth, Stripe, and ImgBB values.
2. Configure the backend `.env` with `PORT=5000`, `FRONTEND_URL_LOCAL=http://localhost:3000`, `MONGODB_URI`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET`. Use the same Stripe mode and secret API key in both projects. Set `FRONTEND_URL_VERCEL` for the deployed frontend.
3. Start the backend in one terminal:

   ```bash
   cd WedPlan-A9-Backend
   npm run dev
   ```

4. Start the frontend in a second terminal:

   ```bash
   cd WedPlan-A9-Frontend
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

For local subscription webhooks, configure Stripe or Stripe CLI to forward events to the backend endpoint `/api/payments/webhook`. Use the signing secret for that specific endpoint as `STRIPE_WEBHOOK_SECRET`.





