# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Root (run all workspaces in parallel)
```bash
pnpm dev        # start frontend + backend concurrently
pnpm build      # build all workspaces
pnpm typecheck  # typecheck all workspaces
```

### Frontend (`cd frontend`)
```bash
pnpm dev          # next dev
pnpm build        # next build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm test         # jest
pnpm test:watch   # jest --watch
```

### Backend (`cd backend`)
```bash
pnpm dev          # nodemon + tsx (hot reload)
pnpm build        # tsc → dist/
pnpm start        # node dist/index.js
pnpm lint         # eslint src
pnpm typecheck    # tsc --noEmit
pnpm test         # jest
```

## Architecture

### Monorepo layout
- `frontend/` — Next.js 16 App Router (React 19, Tailwind CSS v4)
- `backend/` — Express + tRPC server (ESM, Node 20)
- `packages/` — `@muzammil328/education-packages`: shared Zod schemas, enums, TypeScript types consumed by both sides

### tRPC contract
The backend defines the full API type in `backend/src/trpc/router.ts` (`AppRouter`). The frontend imports the `AppRouter` type (via `@muzammil/education-backend` workspace dep) to get end-to-end type safety. The tRPC client is set up in `frontend/src/lib/trpc.tsx`.

Backend modules live under `backend/src/modules/{domain}/` and each export a tRPC router. Domains: `auth`, `class`, `book`, `chapter`, `heading`, `subHeading`, `service`, `board`, `sitemap`, `mcqs`, `mcqAttempt`, `institution`, `feedback`, `student`.

### Frontend routing (App Router)
- `app/(auth)/` — public auth pages (signin, signup, forgot-password)
- `app/(dashboard)/dashboard/` — protected admin dashboard
- `app/(dashboard)/dashboard/class/` — class management
- `app/(dashboard)/dashboard/book/` — book management
- `app/(dashboard)/dashboard/chapter/` — chapter management
- `app/(dashboard)/dashboard/heading/` — heading management
- `app/(dashboard)/dashboard/subHeading/` — sub-heading management
- `app/(dashboard)/dashboard/mcqs/` — MCQ management
- `app/(dashboard)/dashboard/service/` — service management
- `app/(dashboard)/dashboard/board/` — board management
- `app/` — public pages (home, books, MCQs, online tests, past papers, pairing schemes, date sheets, results)

UI is feature-sliced under `frontend/src/features/`: one directory per page/feature that owns its components, hooks, and data-fetching logic.

### Auth
JWT-based. The backend issues access tokens (Bearer header or cookie). `backend/src/trpc/trpc.ts` extracts and verifies the token on every request to populate `TRPCContext.user`. Protected tRPC procedures use the `protectedProcedure` helper.

### Shared packages
`@muzammil328/education-packages` (this repo's `packages/`) exports schemas, enums, types, helpers, and constants. Both `frontend` and `backend` import from it. Changes here affect both sides simultaneously.

External shared UI/form libraries (`@muzammil328/ui`, `@muzammil328/form`, `@muzammil328/core`, `@muzammil328/foundation`, `@muzammil328/icon`) are published npm packages, not local source.

### Data layer
- MongoDB via Mongoose (backend)
- TanStack Query + tRPC React hooks (frontend)
- Zod is the single source of truth for validation schemas; schemas live in `packages/src/schemas/`

### Academic content hierarchy
Class → Book → Chapter → Heading → SubHeading → MCQ. Each level references its parent by ID. Content is organized by board (e.g., FBISE, BISE) and service type.

### Real-time
Socket.io is used for live updates. The backend exposes a Socket.io server alongside Express; the frontend connects via `socket.io-client`.

## Code Style

### Imports
- Always import types at the top of the file with a regular `import` statement. Never use inline `import()` type expressions like `export type Foo = import('module').Bar;`. Instead, do a top-level `import type { Bar } from 'module';` and reference `Bar` directly.
