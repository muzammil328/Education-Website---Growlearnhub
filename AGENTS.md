# AGENTS.md

## Install

```bash
export NODE_AUTH_TOKEN=ghp_xxx  # GitHub Packages token for @muzammil328/* scoped packages
pnpm install
```

`@muzammil328:*` packages (except `@muzammil328/education-packages`) are external npm packages hosted on GitHub Packages. The workspace-local `packages/` directory is `@muzammil328/education-packages`.

## Commands

Run from repo root:

| Command | What it does |
|---|---|
| `pnpm dev` | starts frontend + backend concurrently |
| `pnpm build` | builds all workspaces |
| `pnpm typecheck` | runs `tsc --noEmit` in all workspaces |
| `pnpm --filter @muzammil/education-backend add <pkg>` | add dep to backend workspace (use full name, not `backend`) |
| `pnpm --filter @muzammil/education-backend <script>` | run script in backend workspace |

### Backend (`@muzammil/education-backend`)

| Command | What it does |
|---|---|
| `pnpm dev` | `nodemon --exec tsx src/server.ts` (hot reload) |
| `pnpm test` | jest (ESM mode, ts-jest) |
| `pnpm lint` | eslint src |
| `pnpm typecheck` | `tsc --noEmit` |

### Frontend (`@muzammil/education-frontend`)

| Command | What it does |
|---|---|
| `pnpm dev` | `next dev` |
| `pnpm lint` | eslint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | jest |

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

## DB Config (`@/config/db.config`)

Central re-export hub for `@muzammil328/db` mongoose utilities. Import from here, not from `@muzammil328/db` directly:

```ts
import { BaseRepository, DocumentId, toObjectId } from '@/config/db.config';
// or
import { connectMongo, disconnectMongo, isConnected, getConnectionState } from '@/config/db.config';
```

- `connectMongo({ uri })` — auto-connects with retry (3 attempts, 500ms backoff). No separate init function needed.
- `BaseRepository<TDoc>` — generic CRUD repository wrapping a Mongoose model. Methods: `findById`, `findAll`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`, `aggregate`, `aggregatePaginate`, `count`, `exists`, `upsert`, etc.
- `DocumentId` — type alias `string | Types.ObjectId`
- `toObjectId(id)` — converts string → `Types.ObjectId`, throws on invalid

All repository files import `BaseRepository` from `@/config/db.config`.

## Redis Config (`@/config/redis.config`)

Default export with all redis operations:

```ts
import redis from '@/config/redis.config';
// or import { cacheSet, cacheGet, cacheDelete, checkRateLimit } from '@/config/redis.config';

await redis.cacheSet('key', value, ttlSeconds?);     // JSON-serialized SET EX
const val = await redis.cacheGet<Type>('key');        // returns parsed JSON or null
await redis.cacheDelete('key');
const { allowed, current, remaining } = await redis.checkRateLimit(key, limit, windowSec);
```

- `initRedis()` is called automatically during app startup in `on-startup.ts`
- If Redis is down, init silently fails and the app continues without it
- Requires `REDIS_URL` env var (default `redis://localhost:6379`)

## Env config

`backend/src/config/env.config.ts`: Zod-validated with sensible defaults. Key vars:

| Var | Default |
|---|---|
| `REDIS_URL` | `redis://localhost:6379` |
| `MONGODB_URI` | `mongodb://localhost:27017/education` |
| `PORT` | `7000` |
| `NODE_ENV` | `development` |

## Notable

- Mongoose v8 is used (not v9) — `@muzammil328/db` expects `mongoose>=9` as peer, producing an unmet peer dep warning. This is expected.
- TypeScript 6.x on backend, 6.x on frontend.
- The frontend uses both `@tanstack/react-query` v5 and legacy `react-query` v3 (migration in progress). New code should use `@tanstack/react-query`.
- Backend packages source lives at `packages/src/` — changing it affects both frontend and backend.
