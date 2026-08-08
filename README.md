# Blog Turborepo

Blog Turborepo is a full-stack blog project organized as a monorepo. It contains a Next.js frontend in `apps/front` and a NestJS GraphQL backend in `apps/api`, orchestrated with Turborepo.

## Tech Stack

### Monorepo

- Turborepo for running, building, and linting multiple workspaces.
- npm workspaces with the `apps/*` structure.
- TypeScript across both frontend and backend.

### Frontend

- Next.js 16 with the App Router.
- React 19 and React DOM 19.
- Tailwind CSS 4 for styling.
- shadcn/ui, Base UI, Heroicons, and Lucide React for components and icons.
- TanStack React Query for client-side data handling.
- Zod for form validation.
- jose for creating and verifying JWT sessions in cookies.
- Supabase SSR and Supabase Storage for thumbnail image uploads.

### Backend

- NestJS 11.
- GraphQL with Apollo Server and `@nestjs/graphql`.
- Prisma ORM 7.
- SQLite for the local database.
- Passport JWT and Passport Google OAuth2 for authentication.
- Argon2 for password verification.
- Jest and Supertest for unit and e2e testing.

## Main Features

- Public blog post listing with pagination.
- Blog post detail pages by slug/id.
- Email and password sign-up/sign-in.
- Google OAuth sign-in.
- Session management with HTTP-only cookies.
- Create, update, and delete user posts.
- Upload post thumbnails to Supabase Storage.
- Add tags to posts.
- Comment on posts.
- Like and unlike posts, including like counts.
- User-only post management area.
- GraphQL API for user, auth, post, tag, comment, and like domains.

## Project Structure

```text
.
|-- apps
|   |-- api      # NestJS backend, GraphQL, Prisma
|   `-- front    # Next.js frontend
|-- package.json # Scripts and npm workspaces
|-- turbo.json   # Turborepo configuration
`-- README.md
```

## Requirements

- Node.js version compatible with the current Next.js/NestJS setup.
- npm.
- A Supabase account if you want to use image uploads.
- Google OAuth credentials if you want to use Google sign-in.

## Environment Variables

The backend in `apps/api` needs:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:8000/auth/google/callback"
PORT=8000
```

The frontend in `apps/front` needs:

```env
SESSION_SECRET_KEY="your-session-secret"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
```

## Installation

Run from the repository root:

```bash
npm install
```

## Running the Project

Run both frontend and backend through Turborepo:

```bash
npm run dev
```

By default:

- Frontend runs at `http://localhost:3000`.
- Backend runs at `http://localhost:8000`.

You can also run each app separately:

```bash
npm run dev -w front
npm run dev -w api
```

## Database

The Prisma schema is located at `apps/api/prisma/schema.prisma`. The local database uses SQLite by default.

Seed sample data:

```bash
npm run db:seed -w api
```

## Build and Checks

Build the whole project:

```bash
npm run build
```

Lint the monorepo:

```bash
npm run lint
```

Run backend tests:

```bash
npm run test -w api
npm run test:e2e -w api
```

## Development Notes

- The frontend calls the GraphQL backend through `BACKEND_URL`, currently set to `http://localhost:8000` in `apps/front/lib/constants.ts`.
- The backend generates the GraphQL schema at `apps/api/src/graphql/schema.gql`.
- The Supabase Storage bucket currently used by the upload helper is named `images`.
