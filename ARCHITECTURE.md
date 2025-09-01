Project scaffold and rationale

Overview
========

This document explains the initial folder structure and placeholder files added to support upcoming features: user authentication, viewing polls, and creating a new poll. The goal is to provide a lightweight, easy-to-extend scaffold that follows Next.js and Shadcn component conventions.

What I added
============

- `components/auth/AuthProvider.tsx` — small client-side auth provider and `useAuth` hook (placeholder).
- `components/auth/LoginForm.tsx`, `components/auth/RegisterForm.tsx` — form placeholders.
- `components/polls/PollList.tsx`, `components/polls/PollCreate.tsx` — poll UI placeholders.
- `components/ui/Modal.tsx` — simple modal scaffold using Tailwind classes.
- `hooks/usePolls.ts` — tiny local hook to manage a polls array in memory.

Recommended structure and rationale
=================================

1) High-level layout

- `components/` holds reusable UI and feature components. I organized into subfolders `auth`, `polls`, and `ui` so related pieces live near each other.

Rationale: Grouping by feature keeps the code discoverable and makes it easier to move a feature to its own package later (monorepo or separate micro-frontends).

2) Flat vs nested

- I used a shallow nested structure (feature folders under `components/`). This is a tradeoff between a flat root `components/` and deeply nested colocated structure.

Tradeoffs:
- Flat (all components in one folder): easier to scan when project is tiny, but grows chaotic once you add more features.
- Nested (feature folders): slightly more files to navigate, but scales better and makes refactoring/ownership clearer.

3) Colocated components

- For now, components that are tightly coupled to a route or feature (e.g., `PollCreate` used only by create-poll page) are inside `components/polls`. This avoids repeating logic and keeps feature internals together.

When to colocate vs. extract:
- Colocate while the component is only used by one feature and likely to change fast.
- Extract to `components/ui` or `lib/` when it's stable and used across features.

4) Shared state strategy

- Short-term: local state and small hooks (like `usePolls`) for development and prototyping.
- Mid-term: `AuthProvider` for auth state that wraps the app (client-side). Keep server session handling in Next.js API routes or middleware.
- Long-term: if real-time updates or cross-tab sync are needed, migrate to a central store (e.g., Zustand, React Context + reducer, or SWR/React Query for server state). For collaborative polls, use WebSockets or server-sent events.

5) Shadcn components

- The placeholder components import `../ui/button` to mirror typical Shadcn usage — replace that with your actual Shadcn button export.

Next steps
==========

1. Wire `AuthProvider` at the top-level `app/layout.tsx` to provide `useAuth` to pages.
2. Replace placeholder API stubs in `AuthProvider` and `usePolls` with calls to your API (`app/api/*` routes exist) using `fetch` or a fetching library.
3. Add types in `types/index.ts` for Poll and User shapes and export them for consistency.
4. Add tests for the hooks and critical components.

If you want, I can:
- wire AuthProvider into `app/layout.tsx` now,
- create `types/index.ts` and update the components to use those types,
- or replace the `Button` imports with a real Shadcn `Button` implementation if you confirm the path.
