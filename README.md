# WedPlan

WedPlan is a wedding planning marketplace where customers discover wedding professionals and request bookings. Vendors manage service listings and booking requests, while administrators manage users, services, bookings, and subscription transactions.

**Live site:** [wed-plan-a9.vercel.app](https://wed-plan-a9.vercel.app)

## Features

- Browse and search wedding services by category, location, and price.
- View service galleries, vendor details, pricing, and locations.
- Request bookings with event details and track their status in the customer dashboard.
- Manage services, respond to booking requests, and view subscription status in the vendor dashboard.
- Manage users, moderate services, review bookings, and view all customer and vendor transactions in the admin dashboard.
- Customer and vendor Premium subscriptions through Stripe Checkout, with subscription status verification, webhook handling, and a read-only billing details portal.
- Upload profile and service images through a server-side ImgBB integration.
- Responsive pages with loading, empty, and error states.

## Technology

- **Frontend:** Next.js 16 App Router, React 19, TypeScript
- **UI:** Tailwind CSS 4, shadcn/ui, Lucide and React Icons
- **Authentication:** Better Auth, MongoDB, and JWT-based backend authorization
- **Backend:** Express 5, TypeScript, MongoDB
- **Payments:** Stripe Checkout, Billing Portal, and webhooks
- **Image hosting:** ImgBB

## Repositories

- [Frontend](https://github.com/mdraju116/WedPlan-A9-Frontend)
- [Backend](https://github.com/mdraju116/WedPlan-A9-Backend)

The frontend expects the backend repository to run as a separate service.
## Project layout

```text
WedPlan-A9-Frontend/
├── public/
│   ├── assets/                     Logos and other static assets
│   └── *.svg                      Static icons
├── src/
│   ├── app/                        Next.js App Router
│   │   ├── (auth)/                 Sign-in and sign-up pages
│   │   ├── api/
│   │   │   ├── auth/[...all]/      Better Auth handler
│   │   │   ├── checkout_sessions/  Stripe Checkout session creation
│   │   │   └── upload/image/       Server-side ImgBB image upload
│   │   ├── checkout/               Checkout and subscription success pages
│   │   ├── dashboard/
│   │   │   ├── admin/              Admin pages and management tools
│   │   │   ├── customer/           Customer profile, bookings, and subscription
│   │   │   └── vendor/             Vendor profile, services, and bookings
│   │   ├── services/               Service listing and [id] detail pages
│   │   ├── globals.css             Tailwind theme and global styles
│   │   ├── layout.tsx              Root layout and shared site chrome
│   │   ├── loading.tsx              Global loading UI
│   │   ├── not-found.tsx            Not-found UI
│   │   └── page.tsx                 Homepage
│   ├── components/
│   │   ├── auth/                   Authentication UI
│   │   ├── dashboard/              Dashboard forms, sidebars, and tools
│   │   ├── home/                   Homepage sections
│   │   ├── services/               Service browsing, booking, and image gallery
│   │   ├── shared/                 Navbar and footer
│   │   └── ui/                     Reusable shadcn/ui components
│   ├── hooks/                      Shared React hooks
│   ├── lib/                        Auth, tokens, uploads, Stripe, and helpers
│   └── proxy.ts                    Request-time optimistic redirects
├── .env.example                    Frontend environment variable template
├── next.config.ts                  Next.js and remote image configuration
├── package.json                    Frontend scripts and dependencies
└── tsconfig.json                   TypeScript and import alias configuration
```

The Express API is maintained and deployed from the separate sibling repository:

```text
WedPlan-A9-Backend/
└── src/
    ├── app.ts                      Express app, CORS, and route mounting
    ├── server.ts                   Local server startup and database connection
    ├── config/                     MongoDB and Stripe configuration
    ├── middlewares/                Authentication, role checks, and errors
    ├── modules/
    │   ├── booking/                Booking routes, controllers, and services
    │   ├── dashboard/              Role-specific dashboard endpoints
    │   ├── payment/                Stripe checkout, subscriptions, and webhooks
    │   ├── service/                 Service listings and moderation
    │   └── user/                   User profiles and administration
    └── types/                      Express type extensions
```
## Local setup

### Requirements

- Node.js 20 or later and npm
- MongoDB
- Stripe credentials to use Premium subscriptions
- Google and GitHub OAuth credentials to enable those sign-in options
- An ImgBB API key for image uploads

Clone both repositories as sibling folders and install their dependencies:

```bash
git clone https://github.com/mdraju116/WedPlan-A9-Frontend.git
git clone https://github.com/mdraju116/WedPlan-A9-Backend.git

cd WedPlan-A9-Frontend
npm install

cd ../WedPlan-A9-Backend
npm install
```

Create local environment files from each repository's example file (`.env.example`). For example, in PowerShell:

```powershell
Copy-Item WedPlan-A9-Frontend/.env.example WedPlan-A9-Frontend/.env.local
Copy-Item WedPlan-A9-Backend/.env.example WedPlan-A9-Backend/.env
```

Set the required values locally. Do not commit real credentials. The frontend example includes:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SERVER_BASE_URL` | Base URL of the Express backend |
| `BETTER_AUTH_URL` | Frontend origin used by Better Auth |
| `BETTER_AUTH_SECRET` | Better Auth signing secret |
| `MONGODB_URI` | MongoDB connection string |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in credentials |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub sign-in credentials |
| `STRIPE_SECRET_KEY` | Server-side Stripe API key |
| `STRIPE_PREMIUM_PRICE_ID` | Stripe recurring Premium price |
| `IMGBB_API_KEY` | Server-side image upload key |

Configure the backend using its own `.env.example`. For local development, the frontend typically runs at `http://localhost:3000` and the backend at `http://localhost:5000`; set the frontend backend URL and backend frontend-origin settings to match. Keep Stripe keys and webhook secrets private and use matching Stripe test or live mode configuration across the app.

Start the backend in one terminal and the frontend in another:

```bash
# Backend
cd WedPlan-A9-Backend
npm run dev
```

```bash
# Frontend
cd WedPlan-A9-Frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To test local subscription webhooks, use Stripe CLI to forward the required subscription events to the backend's `/api/payments/webhook` endpoint, then set the resulting signing secret in the backend environment.

## Frontend commands

Run from `WedPlan-A9-Frontend`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |


