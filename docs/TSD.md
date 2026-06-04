# Growlearnhub - Technical Specification Document (TSD)

Growlearnhub is a web-based, learning-focused exam practice platform built around structured MCQ workflows, role-based access, analytics, adaptive recommendations, gamification, and offline-capable user experiences.

The system is designed to support multiple user roles, including students, teachers, and administrators, while maintaining a shared architecture and reusable platform services.

At a high level, the platform must support:

- secure authentication and authorization,
- hierarchical academic content management,
- quiz attempt lifecycle management,
- learner progress tracking,
- adaptive practice recommendations,
- PDF/resource delivery,
- gamification signals,
- and PWA-based offline support for key student flows.

---

## 1. Technical Goals

The architecture and implementation should aim to achieve the following:

- Deliver a stable MVP with clean modular boundaries.
- Support future growth in users, content volume, and analytics complexity.
- Minimize coupling between core modules such as auth, content, quiz, and analytics.
- Enable low-latency quiz-taking and reliable attempt submission.
- Support offline-first behavior for targeted student use cases.
- Provide clear observability, testability, and maintainability from the start.
- Leave room for future AI-driven explanations, recommendations, and content generation.

---

## 2. Technology Stack

### 2.1 Backend

- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- ODM: Mongoose

#### Rationale

This stack offers fast MVP iteration, strong ecosystem support, and flexibility for modular API design. TypeScript adds type safety and improves maintainability across services, controllers, DTOs, and shared utilities.

### 4.2 Frontend

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Framework: Shadcn UI
- PWA Support: service worker, manifest, offline caching strategy

#### Rationale

Next.js provides strong routing, layout composition, and optimization for a web-first product. Tailwind CSS supports rapid UI implementation aligned with a reusable design system.

### 4.3 Database and Storage

- Primary Database: MongoDB Atlas
- Caching / fast-access computed data: Redis
- File Storage: Cloudflare R2

#### Rationale

MongoDB works well with hierarchical and content-rich structures, flexible MCQ schemas, and evolving analytics payloads. Redis supports performance-sensitive reads such as leaderboard data, cached analytics summaries, and session-adjacent temporary computations.

### 4.4 Authentication and Security

- Access Tokens: JWT
- Refresh Tokens: rotating refresh token strategy
- Password Hashing: bcryptjs
- Authorization: role-based middleware and route guards

### 4.5 Testing and Quality

- Unit / Integration Testing: Jest
- API integration testing: Supertest or equivalent
- Frontend critical flow testing: React Testing Library / Playwright baseline
- Linting / Formatting: ESLint + Prettier

---

## 3. High-Level Architecture

Growlearnhub should follow a modular monolith architecture for the MVP. This provides a good balance between development speed and clear contracts separation, while preserving a future path toward service extraction if scale or complexity increases.

Core architectural principles

- modular contracts boundaries,
- centralized shared infrastructure,
- typed contracts between layers,
- clean separation between API, business logic, and persistence,
- event-ready design for future async workflows.

### 3.1 Backend Modules

The backend should be organized into contracts-driven modules:

- Auth Module
- Users and Roles Module
- Content Module
- Quiz Module
- Analytics Module
- Gamification Module
- Resource Module
- Adaptive Recommendation Module

Shared backend concerns

- config
- database connection
- middleware
- request validation
- error handling
- logging
- auth utilities
- response formatting
- constants and enums

### 3.2 Frontend Areas

The frontend should be organized by product contractss and route groups:

- public landing and informational pages
- authentication flows
- student dashboard and quiz experience
- teacher/admin content management panels
- analytics and progress screens
- shared app shell, navigation, and UI primitives

Frontend architectural principles

- route-driven composition,
- reusable UI primitives,
- feature-based state separation,
- contracts types aligned with backend contracts,
- offline-aware quiz handling for student workflows.

## 4. Backend Project Structure

- Each module should encapsulate routes, controllers, services, repository access, DTOs, and schema definitions.
- Shared logic should not become a dumping ground; keep contracts-specific logic inside the relevant module.
- Repository abstraction is recommended even when using Mongoose directly.

## 5 Frontend Project Structure

- components/ui should hold generic design-system primitives.
- components/contracts should hold reusable product-level components such as quiz card, progress card, question block, or resource item.
- features/\* should contain stateful and contracts-specific logic.

## 6. System contracts Model

### 6.1 Core Business contractss

Growlearnhub's technical model revolves around the following contractss:

- identity and access
- academic content hierarchy
- quiz authoring and delivery
- learner attempts and performance tracking
- progress aggregation
- adaptive recommendations
- badges and gamification
- downloadable resources
- offline synchronization

Each contracts should expose clear interfaces and avoid leaking persistence-specific structures across layers.

## 7. Data Model (Logical)

### 7.1 Core Entities

#### User

Represents any authenticated platform user.

Fields

- id
- role (student | teacher | admin)
- name
- email
- passwordHash
- status
- createdAt
- updatedAt
- lastLoginAt?

#### Class

Represents a class level, exam category, or curriculum bucket depending on content strategy.

Fields

- id
- name
- board
- year
- status

#### Chapter

Represents a chapter under a class/subject structure.

Fields

- id
- classId
- subjectId?
- title
- order
- status

#### Heading

Represents a heading under a chapter.

Fields

- id
- chapterId
- title
- order

#### Subheading

Represents the smallest structured topic unit for tracking mastery.

Fields

- id
- headingId
- title
- order

#### MCQ

Represents an individual multiple-choice question.

Fields

- id
- subHeadingId
- question
- options
- correctOption
- difficulty
- explanation
- tags
- createdBy
- status
- sourceRef?

#### Quiz

Represents a quiz definition or assembled question set.

Fields

- id
- title
- scope
- questionIds
- durationSec
- mode
- createdBy
- published
- createdAt

#### QuizAttempt

Represents a learner's attempt on a quiz.

Fields

- id
- quizId
- userId
- answers
- score
- accuracy
- startedAt
- submittedAt
- durationSec
- attemptState
- syncSource?

#### UserProgress

Represents aggregated performance per user per subHeading.

Fields

- id
- userId
- subHeadingId
- attempts
- correct
- incorrect
- averageTimeSec
- masteryScore
- lastAttemptAt

#### Badge

Represents a badge definition.

Fields

- id
- code
- title
- criteria
- icon?

#### UserBadge

Represents a badge earned by a user.

Fields

- id
- userId
- badgeId
- earnedAt

#### Resource

Represents uploaded books, PDFs, or notes.

Fields

- id
- type
- title
- topicRefs
- fileUrl
- accessLevel
- uploadedBy
- createdAt

#### Subject

Your current model jumps from class to chapter. In practice, a separate Subject entity is usually needed.

Fields

- id
- classId
- title
- code?
- order
- status

#### RefreshToken / Session

For token rotation and secure session handling, a session store is recommended.

Fields

- id
- userId
- tokenHash
- deviceInfo?
- ipAddress?
- expiresAt
- revokedAt?

#### RecommendationSnapshot

Optional but useful for debugging recommendation logic.

Fields

- id
- userId
- generatedAt
- inputs
- recommendedSubheadingIds
- strategyVersion

#### OfflineSyncEvent

Helpful for sync traceability.

Fields

- id
- userId
- clientEventId
- eventType
- payloadHash
- receivedAt
- status

### 7.2 Indexing Strategy

Suggested indexes:

- User.email -> unique index
- Subject.classId + order
- Chapter.classId + order
- Heading.chapterId + order
- Subheading.headingId + order
- MCQ.subHeadingId + difficulty
- Quiz.createdBy + createdAt
- QuizAttempt.userId + submittedAt
- QuizAttempt.quizId + userId
- UserProgress.userId + subHeadingId -> unique index
- Resource.topicRefs
- RefreshToken.userId + expiresAt

Indexing note

Analytics-heavy queries may later justify pre-aggregated collections or scheduled materialized summaries rather than overloading operational indexes.

## 8. Persistence and Data Integrity Rules

- All primary entities should include createdAt and updatedAt.
- Soft delete should be preferred for content records where auditability matters.
- MCQs, quizzes, and resources should have publish/archive status fields.
- Attempt records should be immutable after final submission, except for sync-resolution metadata.
- Progress records should be derived from attempts and should remain recalculable if aggregation logic changes.
- Recommendation outputs should be versioned where possible to support future algorithm tuning.

## 9. API Design Standards

The API should be REST-based for the MVP, with predictable naming, validation, and response conventions.

General API principles

- version endpoints where appropriate, such as /api/v1/...
- validate all request bodies, params, and query strings
- use consistent success and error envelopes
- prefer explicit contracts endpoints over overgeneralized catch-all handlers
- return pagination metadata for list endpoints
- enforce authorization at route and service level

### 10.1 Response Convention

#### Success

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

#### Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

API response rules

- data must always reflect a stable contract.
- meta should be used for pagination, filters, totals, or version information.
- details should be safe for client use and should not expose internal secrets or stack traces.

## 11. Representative API Specification

### 11.1 Auth Endpoints

- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/refresh
- POST /api/v1/auth/logout
- POST /api/v1/auth/forgot-password
- POST /api/v1/auth/reset-password

Auth notes

- Refresh flow should rotate refresh tokens.
- Logout should revoke the active refresh token or session.
- Sensitive endpoints should be rate limited.

### 11.2 Content Endpoints

- GET /api/v1/classes
- GET /api/v1/subjects?classId=
- GET /api/v1/chapters?subjectId=
- GET /api/v1/headings?chapterId=
- GET /api/v1/subHeadings?headingId=
- GET /api/v1/mcqs
- POST /api/v1/mcqs
- PATCH /api/v1/mcqs/:id
- DELETE /api/v1/mcqs/:id

Content notes

- MCQ CRUD must be role-protected.
- List endpoints should support pagination, filtering, and status selection where relevant.

### 11.3 Quiz Lifecycle Endpoints

- POST /api/v1/quizzes/:id/start
- POST /api/v1/quizzes/:id/submit
- GET /api/v1/quizzes/:id/result/:attemptId
- GET /api/v1/users/me/attempts
- GET /api/v1/users/me/attempts/:attemptId

Quiz notes

- Start endpoint should validate quiz availability and access rights.
- Submit endpoint should support idempotency for offline sync.
- Result endpoint should expose score, accuracy, timing, and topic-level breakdown.

### 11.4 Progress and Recommendation Endpoints

- GET /api/v1/users/me/progress
- GET /api/v1/users/me/recommendations
- GET /api/v1/users/me/weak-topics
- GET /api/v1/analytics/overview

Notes

- Student-facing progress should be scoped to the authenticated user.
- Teacher/admin analytics should require role checks and optionally class filters.

### 11.5 Resource Endpoints

- GET /api/v1/resources
- POST /api/v1/resources/upload
- GET /api/v1/resources/:id
- DELETE /api/v1/resources/:id

Notes

- Resource access should honor access level and role rules.
- Upload flow may require signed URL support depending on storage strategy.

## 12. Request/Response Contract Guidance

### Example: Start Quiz Response

```json
{
  "success": true,
  "data": {
    "attemptId": "att_123",
    "quizId": "quiz_456",
    "startedAt": "2026-03-12T10:00:00Z",
    "durationSec": 1800,
    "questions": [
      {
        "id": "mcq_1",
        "question": "What is photosynthesis?",
        "options": ["A", "B", "C", "D"],
        "difficulty": "easy"
      }
    ]
  }
}
```

### Example: Submit Quiz Request

```json
{
  "attemptId": "att_123",
  "answers": [
    {
      "questionId": "mcq_1",
      "selectedOption": 2,
      "answeredAt": "2026-03-12T10:15:00Z"
    }
  ],
  "idempotencyKey": "client-submit-uuid"
}
```

### Example: Submit Quiz Response

```json
{
  "success": true,
  "data": {
    "attemptId": "att_123",
    "score": 18,
    "accuracy": 0.9,
    "durationSec": 740,
    "correct": 18,
    "incorrect": 2,
    "skipped": 0,
    "weakTopics": ["Cell Structure"],
    "recommendations": ["Plant Tissues", "Cell Division"]
  }
}
```

## 13. Backend Module Responsibilities

### 13.1 Auth Module

Responsible for:

- registration
- login
- password hashing and verification
- token issuance
- refresh token rotation
- logout/session revocation
- role claims attachment

### 13.2 Users Module

Responsible for:

- user profiles
- role management
- account status
- profile retrieval and updates

### 13.3 Content Module

Responsible for:

- subject hierarchy
- chapter/heading/subHeading management
- MCQ authoring and validation
- publishing/archive rules
- content retrieval for quiz assembly

### 13.4 Quiz Module

Responsible for:

- quiz creation
- quiz start validation
- attempt lifecycle management
- submission logic
- answer evaluation
- result payload construction

### 13.5 Analytics Module

Responsible for:

- progress aggregation
- score trends
- topic-wise summaries
- admin/teacher overview metrics
- computed reporting read models

### 13.6 Gamification Module

Responsible for:

- streak tracking
- badge rules
- badge awarding
- milestone status computation

### 13.7 Resource Module

Responsible for:

- metadata storage
- file upload coordination
- topic linkage
- access control
- download metadata

### 13.8 Adaptive Module

Responsible for:

- mastery score calculation
- weak-topic detection
- recommendation generation
- adaptive difficulty rules
- versioned recommendation strategy logic

## 14. Adaptive Learning Specification

The initial adaptive system should remain rules-based for simplicity, auditability, and quick iteration.

### 14.1 Inputs

- last N attempts per subHeading
- recent accuracy
- average response time
- difficulty exposure history
- retry frequency
- recency of incorrect answers

### 14.2 Mastery Formula Example

A sample weighted formula:

masteryScore =
(accuracyWeight _ recentAccuracy) +
(speedWeight _ speedScore) +
(consistencyWeight \* streakScore)

Suggested interpretation

- recentAccuracy measures correctness in recent attempts
- speedScore normalizes answer speed relative to expected complexity
- streakScore rewards consistent correct performance

### 14.3 Recommendation Rules

- Low mastery: serve foundational and easier questions
- Medium mastery: serve mixed reinforcement questions
- High mastery: serve advanced, mixed-topic, or timed challenge sets
- Recency boost: recently failed subHeadings should be elevated in priority
- Difficulty guardrail: do not escalate too quickly after one strong result

### 14.4 Practical Recommendation Output

Each recommendation payload should include:

- recommended subHeading or topic
- reason code
- suggested difficulty band
- recommended quiz length or action type

Example reason codes:

- LOW_ACCURACY
- RECENT_FAILURE
- SLOW_RESPONSE_TIME
- READY_FOR_ADVANCEMENT

## 15. Offline and Sync Strategy

Offline support is a critical differentiator and should be deliberately constrained to stable, high-value user journeys.

### 15.1 PWA Fundamentals

- register service worker
- cache app shell and static assets
- support installability through manifest
- cache selected read-heavy endpoints using stale-while-revalidate

### 15.2 Offline Quiz Strategy

When the user has previously loaded eligible content:

- allow quiz start from cached metadata and question sets
- store answer events locally in IndexedDB
- track local attempt state separately from server attempt state
- queue submission payload until connectivity returns

### 15.3 Sync Rules

- flush queued submissions in timestamp order
- attach idempotency keys for safe replays
- validate server-side attempt status before accepting sync
- reject duplicate or invalid finalized attempts safely
- preserve user-visible sync status when conflicts occur

### 15.4 Recommended Client Storage

Use:

- IndexedDB for queued attempt payloads and cached quiz data
- local storage only for lightweight preferences and flags

## 16. Security and Compliance Requirements

The MVP must implement baseline security standards appropriate for educational user accounts and protected content.

Authentication and session security

- secure adaptive password hashing
- access token expiration
- refresh token rotation
- session/token revocation
- device/session awareness if feasible

API protection

- RBAC enforcement on protected routes
- input validation at the API boundary
- request sanitization
- rate limiting on auth and upload endpoints
- secure CORS configuration
- signed file access where required

Data handling

- avoid storing plaintext secrets
- minimize sensitive payload logging
- redact tokens and hashes from logs
- validate ownership and access before serving protected resources

## 17. Performance Requirements

Core performance goals should prioritize learner-facing experience.

Key expectations

- quiz start and question render should feel fast on average mobile networks
- submission should complete reliably with low latency
- dashboards should use cached summaries where possible
- analytics endpoints should not block critical quiz workflows

Recommended measures

- selective Redis caching
- pagination on heavy list endpoints
- projection-only queries where full documents are not needed
- background recalculation for non-critical aggregates
- CDN-backed static asset and PDF delivery

## 18. Observability and Operational Readiness

The system should be observable from day one.

Logging

Use structured logs for:

- auth events
- quiz start/submit
- upload events
- sync events
- recommendation generation failures
- authorization failures

Monitoring metrics

Track:

- API latency
- quiz submission success rate
- offline sync failure rate
- login failure rate
- content upload error rate
- recommendation generation latency

Error tracking

- capture server exceptions centrally
- alert on repeated submission failures
- alert on token refresh anomalies
- trace failed sync queues where possible

## 19. Testing Strategy

Testing should focus first on correctness of core learning flows.

### 19.1 Unit Tests

Cover:

- auth services
- scoring logic
- mastery score calculations
- recommendation rules
- badge qualification logic
- validation helpers

### 19.2 Integration Tests

Cover:

- register/login/refresh/logout flows
- MCQ CRUD permissions
- quiz start/submit/result lifecycle
- progress aggregation
- resource upload metadata flow

### 19.3 Frontend Flow Tests

Cover:

- login flow
- starting a quiz
- answering questions
- submitting a quiz
- viewing results
- dashboard progress visibility

### 19.4 Offline and PWA Tests

Cover:

- service worker registration
- shell caching
- cached quiz start behavior
- queued submission replay
- duplicate submission prevention

## 20. Delivery Plan

### Sprint 1: Foundation

- auth module
- user roles
- content hierarchy
- subject/chapter/heading/subHeading models
- MCQ CRUD
- shared API patterns

### Sprint 2: Core Quiz Engine

- quiz creation and retrieval
- attempt lifecycle
- scoring and result summaries
- initial student dashboard metrics

### Sprint 3: Intelligence and Engagement

- user progress aggregation
- adaptive recommendation basics
- streaks and badges
- analytics overview endpoints

### Sprint 4: Offline and Hardening

- PWA support
- offline attempt queue
- sync pipeline
- rate limiting
- performance tuning
- release readiness checks

## 21. Engineering Decisions and Recommendations

To strengthen the current specification, these decisions are recommended:

- Add Subject as a first-class entity

Without it, future curriculum organization may become awkward.

- Use a modular monolith first

This is the best tradeoff for MVP speed and maintainability.

- Make quiz attempts append-only after submission

This protects analytics consistency and reduces edge-case complexity.

- Use idempotency keys for all submission-like endpoints

Especially important for offline sync reliability.

- Treat adaptive recommendations as versioned outputs

This will help when the recommendation logic evolves.

- Prefer IndexedDB over localStorage for offline quiz data

It is safer and more scalable for structured queued payloads.

## 22. Risks and Technical Mitigation

- Risk: analytics queries become expensive

Mitigation: pre-aggregation, cache hot summaries, add reporting-specific read models.

- Risk: offline sync creates duplicate or invalid submissions

Mitigation: idempotency keys, attempt state validation, sync event logging.

- Risk: content hierarchy becomes rigid

Mitigation: keep schema flexible and introduce Subject early.

- Risk: recommendation logic becomes opaque

Mitigation: use reason codes, store strategy version, keep initial rules explicit.

- Risk: teacher/admin screens become overloaded

Mitigation: paginate aggressively and separate operational vs analytical views.

## 23. One-Line Summary

Growlearnhub's technical architecture should be modular, secure, offline-aware, and analytics-ready, with a strong emphasis on reliable quiz workflows and future extensibility.
