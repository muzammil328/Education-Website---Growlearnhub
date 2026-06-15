# Growlearnhub — Implementation Plan

Last updated: 2026-06-10

---

## Current State Summary

### ✅ Done
- Auth (register, login, OTP, forgot/reset password, refresh token)
- Content hierarchy CRUD + public APIs: Board → Class → Book/Subject → Chapter → Heading → SubHeading → MCQ
- Public browsing pages: Class 9–12 (MCQs, online tests, books, notes, past papers, pairing schemes, date sheets, results), VU (handouts, mid/final MCQs, mark calculator), blogs, explore topics
- MCQ detail page (`McqDetailClient`, fetched by slug)
- Admin dashboard: full content management (boards, class, book, chapter, heading, sub-heading, MCQs add/list, service, students, feedback, comments, bug reports, feature requests, contact-us, share-stories)
- CSV bulk import for MCQs (validation, review UI, dropdowns for class/book/chapter/heading/difficulty)
- Comment functionality (create, delete, list) + 'share-story' feedback type
- Sitemap generation via tRPC endpoints
- MCQ attempt submit (server-side correctness check), attempt history, accuracy stats
- Basic student dashboard (stats cards + attempt history)
- Leaderboard (institution-scoped)
- Models defined: `McqAttempt`, `UserProgress`, `AdaptiveRecommendation`, `Analytics`, `Payment`, `Institution`

### ❌ Not Started
- Confidence tagging per answer + outcomeType classification wired into attempt flow
- UserProgress updates on every attempt (masteryScore, masteryBand, openLoopCount, spacedRepetitionInterval)
- Recovery Queue (cross-session spaced repetition)
- Focused Drill auto-generation
- Open Loop tracking + dashboard widget
- Adaptive difficulty serving (questions selected by mastery band)
- Cognitive diagnosis summary after sessions
- Examiner's Note display after wrong answer
- Teacher dashboard (class struggle report, distractor intelligence)
- Parent dashboard (weekly digest)
- Gamification (badges, streaks, progress rings)
- Exam Countdown Readiness Score
- Notifications
- Monetization / premium subscriptions

### 🗑️ Removed
- PWA / offline support (service worker, manifest, offline queue) — removed in `dceb36c`

---

## Phase 1 — Adaptive Core (Backend) 🔴 Priority

The models are all defined. This phase wires them up with real business logic.

### 1.1 Confidence Tagging in Attempt Submission
**File:** `backend/src/routers/mcqAttempt.router.ts` → `submit` procedure  
**What to do:**
- Add `confidenceTag` (`sure | guessed | no_idea`) as optional input field
- The `McqAttempt` model already computes `outcomeType` in `pre('save')` — just pass the tag through
- Return `outcomeType` in the submit response so the frontend can display it immediately

### 1.2 UserProgress Update on Every Attempt
**New file:** `backend/src/services/userProgress.service.ts`  
**What to do:**
- After each attempt, upsert a `UserProgress` record keyed by `(userId, subHeadingId)` (and optionally headingId, chapterId)
- Update fields: `correct`, `incorrect`, `totalAttempts`, `lastAttempt`, `retryCount`, `confidentMistakeCount`, `openLoopCount`
- Recompute `masteryScore = (correct / totalAttempts) * 100`
- Set `masteryBand`: 0–39 → `weak`, 40–69 → `developing`, 70–100 → `strong`
- Set `currentDifficultyBand` to match `masteryBand`: weak→easy, developing→medium, strong→hard
- SM-2 spaced repetition: on correct answer increase `spacedRepetitionInterval` (×2.5, cap 30 days); on wrong reset to 1 day; set `nextReviewAt = now + interval`
- On `confidentMistake`: increment `confidentMistakeCount`, increment `openLoopCount`
- If `masteryBand === 'weak'` and 3+ wrong in subHeading: set `openLoopCount++` (triggers Focused Drill)
- Wire this service into `mcqAttempt.router.ts → submit` (call after `McqAttempt.create`)

### 1.3 UserProgress Router (Student API)
**New file:** `backend/src/routers/userProgress.router.ts`  
**Procedures:**
- `myProgress` — list all UserProgress records for current user, grouped by subHeading
- `subHeadingProgress` — single subHeading progress (for drill/session start)
- `weakSubHeadings` — return subHeadings where `masteryBand === 'weak'`, sorted by `openLoopCount desc`
- `dueForReview` — subHeadings where `nextReviewAt <= now`

### 1.4 Adaptive MCQ Serving
**New file:** `backend/src/routers/adaptiveMcq.router.ts`  
**Procedure: `getNextBatch`** input: `{ subHeadingId, sessionId, mode, limit }`  
**Logic:**
1. Get student's `currentDifficultyBand` from `UserProgress`
2. Fetch MCQs matching `subHeadingId + difficultyLevel` that student has NOT answered correctly recently (join with `McqAttempt`)
3. Prioritize: recovery queue items first (wrong in last session), then spaced repetition due items, then new questions
4. Return shuffled batch of `limit` MCQs (default 10)

### 1.5 Recovery Queue
**New file:** `backend/src/routers/recoveryQueue.router.ts`  
**Procedures:**
- `getQueue` — MCQs the user got wrong, ordered by `nextReviewAt asc`, limited to due items
- `getOpenLoops` — UserProgress records with `openLoopCount > 0`, for dashboard counter
- `dismissLoop` — decrement `openLoopCount` after Focused Drill completion

---

## Phase 2 — Quiz Session System 🔴 Priority

Currently attempts are submitted one at a time with no session concept. Need a session wrapper to enable post-quiz summaries, in-session repetition, and mode tracking.

### 2.1 Session Model (lightweight, no new collection needed)
Use `sessionId` (UUID, generated client-side or on session start) already on `McqAttempt`.

### 2.2 Session Summary Endpoint
**Add to `mcqAttempt.router.ts`:**  
Procedure `sessionSummary` input: `{ sessionId }`  
Returns:
- total, correct, incorrect, skipped
- accuracy percentage
- time taken (sum of `timeTakenMs`)
- per-subHeading breakdown (group by subHeading via MCQ lookup)
- confident mistakes in this session
- list of wrong MCQ IDs (for in-session repetition)
- outcomeType distribution: true_knowledge / lucky_guess / confident_mistake / known_weakness

### 2.3 In-Session Wrong Answer Repetition (Frontend)
Handle entirely on the client: after finishing a quiz session, filter attempts where `isCorrect === false` and re-queue those MCQ IDs before showing the summary screen.

---

## Phase 3 — Student Dashboard Enhancements 🟡

**File:** `frontend/src/features/DashboardPage/Dashboards/StudentDashboardView.tsx`

### 3.1 Open Loop Counter Widget
- Query `recoveryQueue.getOpenLoops`
- Show counter: "You have N open loops"
- Link to Focused Drill flow

### 3.2 SubHeading Heat Map
- Query `userProgress.myProgress`
- Render a grid: green (strong), yellow (developing), red (weak) per subHeading
- Group by book/chapter for readability

### 3.3 Due for Review Widget
- Query `userProgress.dueForReview`
- Show list of subHeadings with spaced repetition due today

### 3.4 Confident Mistakes Widget
- From `mcqAttempt.myStats` (extend to include `confidentMistakeCount`)
- Show count with link to practice those specific MCQs

---

## Phase 4 — Focused Drill & Quiz Modes 🟡

### 4.1 Focused Drill Page
**New page:** `frontend/src/app/(main)/drill/[subHeadingId]/page.tsx`  
- Fetches `adaptiveMcq.getNextBatch` with `mode: 'focused_drill'`
- Standard quiz UI (same as online-test)
- On completion: call `recoveryQueue.dismissLoop`
- Show post-drill summary with improvement delta

### 4.2 Micro Burst Mode
**New page:** `frontend/src/app/(main)/burst/page.tsx`  
- Fetches 5 MCQs: 2 from weakest subHeading + 2 due for spaced repetition + 1 new
- Timer display (target: under 5 min)
- Maintains daily burst streak (store last burst date in `UserProgress` or separate field on `User`)

### 4.3 Revision Mode
- Filter `adaptiveMcq.getNextBatch` to exclude questions attempted in last 7 days

### 4.4 Speed Round
- Standard quiz but client-enforces 30s per question timer, auto-submits on timeout

---

## Phase 5 — Examiner Mode 🟡

### 5.1 Examiner's Note Field
- MCQ model already has `examinersNote` field (verify in schema)
- Ensure admin MCQ form (`dashboard/mcqs/add`) has the field — check current form
- Frontend: after wrong answer, display `examinersNote` in the result/explanation section

### 5.2 Distractor Intelligence (Admin Dashboard)
**New admin page:** `dashboard/analytics/distractor`  
Backend aggregation:
```
McqAttempt.aggregate([
  { $match: { isCorrect: false } },
  { $group: { _id: { mcqId, selectedOption }, count: $sum: 1 } },
  { $sort: { count: -1 } }
])
```
Display top wrong-answer patterns per MCQ.

---

## Phase 6 — Teacher Dashboard 🟠

**New page group:** `frontend/src/app/(dashboard)/dashboard/teacher/`

### 6.1 Class Struggle Report
- Top 5 MCQs with highest wrong-answer rates in teacher's class/institution
- Which distractor option was chosen most frequently

### 6.2 Student Confident Mistake Alerts
- Students with 3+ confident mistakes in any single topic this week
- One-click assign Focused Drill to student or whole class

### 6.3 Student Progress Overview
- Table: student → mastery band per subject → accurate count → open loops

Backend: extend `mcqAttempt.router.ts` with teacher-scoped aggregation procedures behind institution/role guard.

---

## Phase 7 — Gamification 🟠

### 7.1 Badges
**New model field on User** or separate `Badge` collection.  
Triggers (computed server-side after each attempt session):
- `conquer_it` — subHeading reaches `strong` band
- `open_loop_closer` — closed 5 open loops in one week
- `confident_mistake_zero` — 7 days no confident mistakes in a subject
- `burst_streak` — N consecutive days of Micro Burst completion
- `exam_ready` — Readiness Score > 80%

### 7.2 Streak Tracking
Add `lastBurstDate` + `burstStreakCount` to `User` model or `UserProgress`.  
Update on each Micro Burst completion.

### 7.3 Progress Rings (Frontend)
Visual ring per subject: fills as subHeadings move from weak → strong.  
Data: `userProgress.myProgress` grouped by book.

---

## Phase 8 — Analytics Service 🟠

**New file:** `backend/src/services/analytics.service.ts`  
Write to `Analytics` collection after each session summary:
- session score, correct, incorrect, timeTaken
- subHeading-level breakdown
- topicWeaknessScore per subHeading (derived from masteryScore delta)

**New admin endpoint:** `analyticsRouter.platformStats`  
- DAU, WAU, total attempts, accuracy trends
- Content quality signals: MCQs with error rate > 60%
- Teacher onboarding + activity count

---

## Phase 9 — Exam Countdown Readiness Score 🟠

### 9.1 Exam Target (User Profile)
Add `examTarget` + `examDate` fields to `User` model.  
Admin/student profile page: select target exam and date.

### 9.2 Readiness Score Computation
`readinessScore = (strongSubHeadings / totalSubHeadings) * 100`  
Recomputed daily (or on demand) per user.  
Stored in `UserProgress` aggregate or new lightweight field on `User`.

### 9.3 Countdown Widget (Student Dashboard)
- Days remaining to exam
- Readiness Score progress bar
- Suggested SubHeadings to prioritize today

---

## Phase 10 — Notifications 🔵

### 10.1 In-App Notifications
Lightweight: store notification records in DB, poll on dashboard load.  
Triggers: new confident mistake alert, open loop count crosses threshold, spaced repetition due.

### 10.2 Email Notifications
Use existing email service from `@muzammil328/services`.  
Weekly digest: quizzes attempted, strongest/weakest subject, open loop count.

---

## Phase 11 — Offline / PWA ✅ DONE

### 11.1 Service Worker Setup
Next.js `next-pwa` or custom service worker.  
Cache strategy: network-first for API, cache-first for static assets.

### 11.2 Offline Quiz Pack Download
On WiFi: auto-fetch next 3 recommended quiz batches and store in IndexedDB.  
Prioritize Recovery Queue drills and weak-topic MCQs.

### 11.3 Sync on Reconnect
Queue `McqAttempt` submissions in IndexedDB when offline.  
On reconnect, flush queue to server with idempotency key (sessionId + mcqId).

---

## Phase 12 — Monetization 🔵

### 12.1 Premium Subscription
`Payment` model already defined.  
Integrate payment gateway (Stripe or local PK gateway).  
Gate features: advanced analytics, adaptive recommendations, AI explanations, offline packs.

### 12.2 Institution Plans
`Institution` model exists + `institution.router.ts` exists.  
Add institution subscription plan management.  
B2B admin dashboard: bulk learner management, institution-level content, reporting.

### 12.3 Bulk MCQ Import
Admin page: CSV/Excel upload → parse → auto-map to hierarchy → preview → confirm import.  
Backend: parse with `xlsx` or `csv-parse`, validate against hierarchy IDs, batch insert.

---

## Execution Order (Recommended)

```
Phase 1  →  Phase 2  →  Phase 3  →  Phase 4  →  Phase 5
  ↓
Phase 6  →  Phase 7  →  Phase 8  →  Phase 9
  ↓
Phase 10  →  Phase 11  →  Phase 12
```

**Start with Phase 1 (UserProgress updates + adaptive serving)** — everything else depends on having accurate mastery data flowing on every attempt. Without it, the dashboard, drills, and recommendations are all empty.

---

## File Checklist

### Backend — New Files
- [x] `backend/src/services/userProgress.service.ts`
- [x] `backend/src/routers/userProgress.router.ts`
- [x] `backend/src/routers/adaptiveMcq.router.ts`
- [ ] `backend/src/routers/recoveryQueue.router.ts`
- [x] `backend/src/services/gamification.service.ts`
- [ ] `backend/src/services/analytics.service.ts`

### Backend — Modified Files
- [x] `backend/src/routers/mcqAttempt.router.ts` — add `confidenceTag` to submit, call userProgress service, add `sessionSummary` procedure
- [x] `backend/src/routers/index.ts` — register new routers
- [ ] `backend/src/models/user.model.ts` — add `examTarget`, `examDate`, `lastBurstDate`, `burstStreakCount`

### Backend — New Files (Phase 6 / 8 / 12)
- [x] `backend/src/routers/analytics.router.ts` — distractorIntelligence, classProgressOverview, confidentMistakeAlerts, platformStats
- [x] `backend/src/routers/payment.router.ts` — initSubscription, confirmPayment, myHistory, adminList, revenueSummary, plans
- [x] `backend/src/routers/bulkImport.router.ts` — importMcqs (super-admin up to 500), importMcqsTeacher (up to 100)

### Frontend — New Files
- [x] `frontend/src/app/(main)/drill/[subHeadingId]/page.tsx` + `FocusedDrillClient.tsx`
- [x] `frontend/src/app/(main)/burst/page.tsx` + `BurstClient.tsx`
- [x] `frontend/src/app/(dashboard)/dashboard/teacher/page.tsx`
- [x] `frontend/src/app/(dashboard)/dashboard/(super-admin)/analytics/page.tsx`

### Frontend — Modified Files
- [x] `frontend/src/features/DashboardPage/Dashboards/StudentDashboardView.tsx` — open loops (clickable → drill), due-for-review, confident mistakes, weak topics, Burst quick action
- [x] `frontend/src/features/LivePreviewOnlineTest/OnlineTestDrawer.tsx` — confidence tag UI, sessionId, examinersNote in review, confident mistakes in results
- [x] `frontend/src/features/DashboardMcqPage/McqForm.tsx` — examinersNote field
- [x] `frontend/src/features/LivePreviewMcqs/index.tsx` — examinersNote on McqItem interface
- [x] `frontend/src/features/DashboardPage/DashboardLayoutPage/Sidebar/helpers.ts` — Teacher Dashboard, Analytics, Micro Burst, Bulk Import, Payments links
- [x] `frontend/src/app/(dashboard)/dashboard/(super-admin)/payments/page.tsx` — admin payment list, revenue summary, confirm pending
- [x] `frontend/src/app/(dashboard)/dashboard/(super-admin)/bulk-import/page.tsx` — CSV upload, dry-run validation, insert
- [x] `frontend/src/app/(main)/pricing/page.tsx` — public pricing page with plan cards
- [x] `backend/src/models/user.model.ts` — examTarget, examDate, lastBurstDate, burstStreakCount
- [x] `backend/src/routers/mcqAttempt.router.ts` — completeBurstSession, checkAndAwardBadges wired
- [x] `backend/src/routers/user.router.ts` — myBadges query
- [x] `frontend/src/app/(main)/burst/BurstClient.tsx` — completeBurstSession on finish
- [x] `frontend/src/app/(dashboard)/dashboard/profile/page.tsx` — badges display
- [x] `frontend/src/features/DashboardPage/Dashboards/StudentDashboardView.tsx` — progress rings + badges sections
