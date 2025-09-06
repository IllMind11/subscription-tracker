# Personal React Template

Modern **React + Vite + TypeScript** starter with **TanStack Router**, **TanStack Query**, **Tailwind v4**, **shadcn/ui**.

## Features

- Vite + React 19 + TS 5
- TanStack Router & Query
- Tailwind v4 + shadcn/ui
- ESLint (antfu, Tailwind, TanStack, RYMNAE)
- Pre-commit: type-check + eslint

## Scripts

```bash
pnpm dev     # Dev
pnpm build   # Prod build + type-check
pnpm start   # Serve build
pnpm lint    # Lint
```

## Structure

```
src/
  routes/   # Routes (pages)
  shared/   # UI, styles, libs, utils
# Other FSD layers (features, entities, widgets, app) can be added later
```

## Setup

```bash
pnpm install
pnpm dev
```
