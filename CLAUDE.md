# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Install

```bash
export NODE_AUTH_TOKEN=ghp_xxx  # GitHub Packages token for @muzammil328/* scoped packages
pnpm install
```

## Path aliases (backend)

TypeScript-only aliases resolved at runtime via `module-alias`. Source of truth: `backend/tsconfig.json`.

| Alias | Maps to |
|---|---|
| `@/` | `./src/*` |
| `@config/` | `./src/config/*` |
| `@database/` | `./src/database/*` |
| `@middleware/` | `./src/middleware/*` |
| `@models/` | `./src/database/models/*` |
| `@modules/` | `./src/database/modules/*` |

Frontend only has `@/` → `./src/*`.

Jest config uses `moduleNameMapper` with `^@/(.*)$` → `<rootDir>/src/$1`.

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

### Reference docs (`Implement/`)
See `Implement/` for detailed API docs on `@muzammil328/db` and `@muzammil328/services`:
- `README_Redis.md` — caching, rate limiting
- `README_Mongoose.md` — `BaseRepository`, `PipelineBuilder`, ObjectId utils, errors
- `README_Auth.md` — JWT, password hashing, OTP, CSRF
- `README_Email.md`, 
- `README_Media.md`, 
- `README_Logger.md`, 
- `README_Error.md`, 
- `README_Server.md`, 
- `README_Socket.md`, 
- `README_Trpc.md`, 
- `README_Types.md`
- `README_Code_Style.md`

### Academic content hierarchy
Class → Book → Chapter → Heading → SubHeading → MCQ. Each level references its parent by ID. Content is organized by board (e.g., FBISE, BISE) and service type.
