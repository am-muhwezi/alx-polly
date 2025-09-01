# ALX Polly — Next.js polling app (scaffold)

Lightweight Next.js polling app scaffold prepared for features: authentication, viewing polls, and creating polls. This README explains the project layout, how to run it locally, what was scaffolded, and recommended next steps.

## Quick start

Install dependencies and run the dev server from the inner `alx-polly` folder:

```bash
cd alx-polly
npm install
npm run dev
```

Open http://localhost:3000 — the root redirects to `/polls` (App Router redirect).

Build for production:

```bash
npm run build
npm run start
```

Lint / types (if configured):

```bash
npm run lint
```

## What was scaffolded

Files and folders added or adjusted to prepare for auth/polls features (inside `alx-polly/`):

- `components/auth/AuthProvider.tsx` — client auth context + `useAuth` hook (placeholder signin/signout).
- `components/auth/LoginForm.tsx`, `components/auth/RegisterForm.tsx` — Shadcn-style form placeholders using `Card`, `Input`, and `Button`.
- `components/polls/PollList.tsx`, `components/polls/PollCreate.tsx` — poll UI placeholders.
- `components/ui/` — small UI primitives:
  - `button.tsx` (existing shadcn-style Button)
  - `Modal.tsx` (simple modal)
  - `Card.tsx`, `Input.tsx` (added primitives)
- `hooks/usePolls.ts` — small typed in-memory hook for polls.
- `components/index.ts` — barrel exports for convenience.
- `types/index.ts` — placeholder types for `User` and `Poll`.
- `app/polls/page.tsx` — polls index page (temporary mock data) to avoid 404.
- `app/polls/[id]/page.tsx` — simple poll detail placeholder.
- `ARCHITECTURE.md` — reasoning, structure choices, and tradeoffs.

## Project structure (high level)

- `alx-polly/app/` — Next.js App Router routes and pages.
- `alx-polly/components/` — UI and feature components (organized by feature: `auth`, `polls`, `ui`).
- `alx-polly/hooks/` — custom hooks (e.g., `usePolls`).
- `alx-polly/lib/` — server/client helpers (API, auth helpers).
- `alx-polly/types/` — shared TypeScript types.

## Shadcn & UI notes

- The project includes a Shadcn-style `Button` at `components/ui/button.tsx` which exports a named `Button` and `buttonVariants` (uses `class-variance-authority` and `@radix-ui/react-slot`). Install those packages if missing:

```bash
cd alx-polly
npm install @radix-ui/react-slot class-variance-authority
```

- I added `Card` and `Input` primitives to create a consistent UI. Extract or extend them as your design matures.

## Common issues & fixes

- Build/type errors complaining about missing packages (example: `class-variance-authority`, `@radix-ui/react-slot`) — install the packages in the inner project:

```bash
cd alx-polly
npm install @radix-ui/react-slot class-variance-authority
```

- If `/polls` returned 404: ensure `app/polls/page.tsx` exists — a simple index page with mock data was added.

## Recommended next steps

1. Wire `AuthProvider` in `app/layout.tsx` so `useAuth` is available globally.
2. Implement API route handlers in `app/api/polls` and `app/api/auth` and switch `usePolls` and `AuthProvider` to fetch real data (use `fetch`, SWR, or React Query).
3. Add navigation links from `PollList` to `/polls/[id]` and wire voting flows.
4. Add tests for `usePolls` and form components.

## Contributing

1. Create a branch: `git checkout -b feat/your-feature`
2. Commit early and often.
3. Open a PR with a clear description and testing notes.

## License

This scaffold contains no license file. Add one (for example MIT) to clarify reuse terms.

---

If you want, I can now:
- wire `AuthProvider` into `app/layout.tsx`,
- scaffold `app/api/polls` handlers and wire `Polls` to real endpoints, or
- add navigation and small E2E smoke pages.

Tell me which of those to do next and I'll implement it.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
