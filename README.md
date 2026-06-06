# GrowLearnHub

> A comprehensive educational platform for Pakistani students in classes 9–12 and Virtual University — featuring books, notes, MCQs, past papers, online tests, and pairing schemes.

## What is in this repo?

This workspace is organized as a `pnpm` monorepo with:

- `frontend` — Next.js App Router web app
- `backend` — Express + tRPC API
- `packages` — shared Zod schemas, enums, and TypeScript types

## Tech Stack

### Frontend

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- TanStack Query + tRPC React hooks
- React Hook Form, Zod
- Recharts, next-themes, Sonner
- socket.io-client
- Sentry for error monitoring

### Backend

- Express.js, TypeScript
- tRPC server
- MongoDB + Mongoose
- JWT authentication (access + refresh tokens)
- bcryptjs, cookie-parser, CORS, Helmet
- Nodemailer for email delivery
- Swagger UI / swagger-jsdoc

### Shared / Monorepo

- pnpm workspaces
- `packages/` (`@muzammil328/education-packages`) — shared schemas, types, config
- superjson for rich API serialization

## Product Areas

- Authentication and role-based access (student, admin)
- Academic content hierarchy: Class → Book → Chapter → Heading → SubHeading → MCQ
- Quiz/MCQ practice with timed and untimed modes
- Online test engine with attempt tracking
- Past papers, pairing schemes, date sheets, results
- PDF book / resource management
- Board-wise content organization
- Virtual University (VU) resources
- Student progress and analytics
- Feedback module
