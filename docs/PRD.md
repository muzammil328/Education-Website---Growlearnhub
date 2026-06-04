{/* growlearnhub-prd.mdx */}

export const meta = {
  title: "Growlearnhub — Product Requirements Document",
  version: "2.0",
  status: "Draft",
  lastUpdated: "2025-06",
  authors: ["Product Team"],
};

# Growlearnhub
## Product Requirements Document (PRD) — v2.0

---

## 1. Purpose

This PRD defines the scope, priorities, user needs, feature enhancements, and success criteria for the Growlearnhub MVP and beyond. It aligns stakeholders around a focused delivery plan, reduces ambiguity during execution, prevents scope creep, and captures the unique differentiators that set Growlearnhub apart from existing exam preparation platforms.

---

## 2. Product Vision

Growlearnhub is a **learning-first, diagnostics-driven** exam preparation platform that helps students master concepts through structured MCQ practice, cognitive gap detection, closed-loop recovery, and personalized performance tracking.

The platform goes beyond simple test-taking by enabling learners to understand **why** they fail — not just **that** they failed — and by giving teachers and parents actionable insight into student thinking patterns.

---

## 3. Product Mission

To make high-quality, data-driven, and diagnostics-powered exam preparation accessible, engaging, and effective for learners in emerging markets — especially those with inconsistent connectivity and limited access to personalized academic support.

---

## 4. Market Gap Analysis

| Platform | What They Do | Where They Fail |
|---|---|---|
| Dogar / Ilmi (PK) | Static PDFs, MCQ books | No digital practice, no feedback loop |
| Quizlet | Flashcards, memorization | No exam structure, no analytics |
| Edvance / Sabaq (PK) | Video lectures | Passive learning, no practice loop |
| Khan Academy | Concept explanation | Not exam-pattern specific |
| TestGorilla | Corporate assessments | Not for curriculum students |
| Prepaway | Certification dumps | No adaptive logic, no learning system |

### Core Gaps Growlearnhub Addresses

| Gap | Description |
|---|---|
| **Gap 1** | Students know what to study but not **how** they are cognitively failing |
| **Gap 2** | No connection between a wrong answer and a recovery plan |
| **Gap 3** | Practice is passive repetition, not intelligent drilling |
| **Gap 4** | Teachers see grades, not thinking patterns |
| **Gap 5** | Platforms built for content delivery, not behavior change |
| **Gap 6** | Zero support for low-connectivity, mobile-first learners in PK/IN |

---

## 5. Unique Differentiators

| Feature | Growlearnhub | Competitors |
|---|---|---|
| Cognitive diagnosis (why you fail) | ✅ | ❌ |
| Closed-loop wrong answer recovery | ✅ Mandatory path | ❌ Ignored |
| Examiner Thinking Mode | ✅ Trap awareness | ❌ None |
| Confidence Tagging (metacognition) | ✅ | ❌ None |
| Parent triangulation (WhatsApp digest) | ✅ | ❌ None |
| Struggle Intelligence for teachers | ✅ Actionable insight | ❌ Raw data only |
| Exam Countdown Readiness Score | ✅ Personalized | ❌ Generic |
| Offline-first intelligent sync | ✅ Pakistan/India-first | ❌ Broken or absent |
| Question DNA fingerprinting | ✅ Rich tagging | ❌ Basic tags |
| Micro Burst Mode (5 min targeted) | ✅ | ❌ Random |

---

## 6. Objectives

The MVP focuses on the following core objectives:

- Deliver a stable, scalable MCQ-based practice platform built on a structured content hierarchy.
- Diagnose learner failure at the cognitive level — not just surface-level score reporting.
- Close the loop on wrong answers through mandatory recovery paths and spaced repetition.
- Enable teachers to act on class-wide misconceptions, not just view grades.
- Support learners in low-connectivity environments through offline-first experiences.
- Create a foundation for future monetization through premium subscriptions and B2B partnerships.

---

## 7. Target Audience

### Primary User Segments

#### Students
School and college students preparing for internal exams, board exams, and academic assessments. Need topic-wise practice, instant feedback, cognitive diagnosis, and progress visibility.

#### Competitive Exam Aspirants
Learners preparing for MDCAT, ECAT, entry tests, and other high-stakes assessments. Need mock tests, time-based quizzes, weak-topic detection, examiner strategy insights, and spaced repetition drills.

#### Teachers and Coaching Institutes
Educators who create MCQs, assign quizzes, and monitor learner thinking patterns. Need simple content creation workflows, examiner notes, class-struggle reports, and targeted remedial assignment tools.

#### Parents
Involved caregivers who want lightweight, mobile-friendly visibility into their child's progress. Need weekly digest summaries, not raw dashboards.

#### Lifelong Learners
Individuals building subject mastery, preparing for certifications, or reinforcing knowledge. Need flexible, self-paced experiences with clear mastery progression.

### Initial Launch Markets
- **Pakistan** — Large exam-prep demand, mobile-first, MDCAT/ECAT/Board focus
- **India** — Massive competitive exam culture, affordable digital learning need

---

## 8. Content Hierarchy

All MCQ content is organized through a strict academic hierarchy:

```
Class / Exam
  └── Subject
        └── Chapter
              └── Heading
                    └── SubHeading
                          └── MCQ
```

### Hierarchy Creation Rules

- Each level must be created before its child level can be assigned.
- Wizard-style step-by-step creation enforces top-down order.
- Bulk import via Excel/CSV supports auto-mapping to hierarchy levels.
- Drag-and-drop reordering within any hierarchy level.
- Clone/duplicate MCQs or entire chapters across classes.
- Every level supports Draft / Published / Archived states.

---

## 9. MCQ Management

### 9.1 Adding MCQs

When a teacher or admin adds an MCQ, they must specify:

| Field | Required | Notes |
|---|---|---|
| Class / Exam | ✅ | Top of hierarchy |
| Subject | ✅ | Under Class |
| Chapter | ✅ | Under Subject |
| Heading | ✅ | Under Chapter |
| SubHeading | ✅ | Determines adaptive grouping |
| Question Text | ✅ | Supports rich text and images |
| Options (A–D) | ✅ | One correct answer marked |
| Explanation | Recommended | Shown after wrong answer |
| Examiner's Note | Optional | Why the distractor is a trap |
| Difficulty Level | ✅ | Easy / Medium / Hard |
| Cognitive Level | ✅ | Recall / Understand / Apply / Analyze |
| Distractor Type | Optional | Similar-sounding / Partially correct / Opposite |
| Exam Source Tag | Optional | Past paper year, predicted, or original |

### 9.2 Question DNA Fingerprinting

Every MCQ carries a **DNA profile** — a rich metadata tag set that enables intelligent serving:

- **Concept node** — specific knowledge being tested
- **Common misconception** — what mistake the question targets
- **Cognitive operation** — Recall, Compare, Apply, Evaluate
- **Distractor strategy** — how wrong answers are designed to mislead
- **Historical difficulty** — % of students who answered incorrectly (live-updated)
- **Examiner source** — past paper reference or original authorship

This prevents accidentally serving two questions testing the same concept back-to-back and enables genuinely diverse quiz construction.

### 9.3 Fetching MCQs

MCQs are fetched dynamically based on:

- Selected Class → Subject → Chapter → Heading → SubHeading path
- Student's current mastery band (Easy / Medium / Hard) per SubHeading
- Recovery Queue priority (wrong-answer questions surface first)
- Spaced repetition schedule (due questions inserted into session)
- Confidence tagging history (Confident Mistakes are prioritized)

---

## 10. Core Feature: Wrong Answer Recovery System

This is the most critical differentiator in Growlearnhub. Every wrong answer opens a mandatory recovery path.

### 10.1 In-Session Repetition

- Wrong or skipped questions re-appear at the end of the same quiz session.
- Configurable by teacher per quiz (toggle on/off).
- Student sees: *"You got this wrong earlier — try it again."*

### 10.2 Cross-Session Recovery Queue

| Event | Action |
|---|---|
| Wrong answer | Enters personal Recovery Queue |
| 1st retry | Next session |
| Correct at retry | Interval extends (3 days → 7 days) |
| Wrong at retry | Interval resets, confidence weight increases |
| 3+ wrongs in same SubHeading | Triggers Focused Drill |

Spaced repetition follows SM-2 algorithm logic — intervals grow with successful recalls and reset on failure.

### 10.3 Focused Drill (SubHeading-Level)

When a student accumulates enough wrong answers under one SubHeading, the system auto-generates a **Focused Drill**:

- Contains only: previously wrong questions + similar-difficulty questions from the same SubHeading
- Pinned to the student's dashboard as an **Open Loop** until completed
- Cannot be dismissed — only resolved by completing the drill
- If drill is also failed → flagged as **Deep Weakness**, escalates to teacher alert

### 10.4 Open Loop Psychology

Open loops are shown prominently on the student dashboard:

- Counter: *"You have 7 open loops"*
- Visual ring fills as loops are closed
- Weekly goal: *"Close 5 open loops this week"*
- Closing loops awards XP, not just quiz completions

---

## 11. Cognitive Diagnosis Engine

Most platforms report: *"You scored 60%."*

Growlearnhub reports: *"Here is why you scored 60% and exactly what to fix."*

### 11.1 Diagnosis Dimensions

| Dimension | What It Detects |
|---|---|
| Question type failure | You struggle with application questions, not recall |
| Distractor confusion | You frequently pick options that are similar-sounding |
| Fatigue pattern | Your accuracy drops after question 15 |
| Time pressure failure | You rush on calculation-based questions |
| Confident Mistakes | You were sure but wrong — a misconception, not a gap |

### 11.2 Diagnosis Generation

After each quiz session, the system generates a plain-language diagnostic summary:

> *"You understand the concept but struggle with application-type questions in Organic Chemistry. You've made 4 Confident Mistakes in SubHeading 3.2 this week — this is a misconception, not a knowledge gap. Recommended: Focused Drill on SubHeading 3.2."*

### 11.3 Confidence Tagging

Before submitting each answer, students optionally tag their confidence level:

| Tag | Meaning |
|---|---|
| ✅ Sure | High confidence |
| 🤔 Guessed | Low confidence, got it right by chance |
| ❓ No idea | Acknowledged knowledge gap |

The system then classifies outcomes:

| Outcome | Classification | Treatment |
|---|---|---|
| Right + Sure | True Knowledge | Reinforce on schedule |
| Right + Guessed | Lucky Guess | Queue for re-verification |
| Wrong + Sure | **Confident Mistake** | Highest priority — misconception |
| Wrong + No Idea | Known Weakness | Standard recovery queue |

**Confident Mistakes** receive special handling:
- Flagged prominently with a distinct visual indicator
- Highest priority in recovery queue
- Teacher alerted when a student accumulates 3+ Confident Mistakes in one topic

---

## 12. Examiner Thinking Mode

Students don't just need the right answer — they need to understand how examiners set traps.

### 12.1 Examiner's Note

Each MCQ can carry an optional **Examiner's Note**:

- Why the incorrect options are designed to be tempting
- What concept the examiner is specifically testing
- What mistake most students make on this question

Shown to students **after a wrong answer**:

> *"Option B is designed to trap students who memorize the equation without understanding the light-dependent stage. If you chose B, revise Chapter 3 → Heading 2 → SubHeading: Light Reactions."*

### 12.2 Class-Level Distractor Intelligence

Teacher dashboard surfaces:

- Which MCQs have the highest wrong-answer rate across the class
- Which specific distractor option was chosen most frequently
- Suggested re-teaching action: *"78% of your class chose Option B, which indicates they're confusing X with Y. Consider re-teaching SubHeading 3.2."*

---

## 13. Adaptive Practice System

### 13.1 Mastery Score per SubHeading

Every student has a **Mastery Score (0–100)** per SubHeading:

| Score Range | Band | Behavior |
|---|---|---|
| 0–39 | Weak | Serve Easy questions, trigger recovery |
| 40–69 | Developing | Serve Medium questions |
| 70–100 | Strong | Serve Hard questions, reinforce on schedule |

- Score rises with correct answers, falls with wrong ones
- Score weighted by confidence tagging (Confident Mistakes cause larger drops)
- Score resets toward Developing if topic is not practiced for 14+ days

### 13.2 Difficulty Progression

- System serves questions matching student's current mastery band
- 80%+ accuracy on Easy tier → auto-promote to Medium for that SubHeading
- 80%+ accuracy on Medium → auto-promote to Hard
- Falling below 50% on any tier → drop back one band

### 13.3 Recommendation Engine

After each session, the system recommends the next practice area based on:

- Lowest mastery SubHeadings in selected subject
- Open loops in Recovery Queue (highest priority)
- Questions due for spaced repetition
- Exam Countdown priority weighting (closer to exam → weak topics up-weighted)

---

## 14. Smart Quiz Modes

| Mode | Description |
|---|---|
| **Practice Mode** | Instant feedback after each question, explanation shown |
| **Exam Simulation** | Full mock with real exam pattern, timer, no hints |
| **Weak Topic Mode** | Auto-generated quiz from all flagged weak SubHeadings |
| **Focused Drill** | Auto-generated from a single SubHeading's Recovery Queue |
| **Speed Round** | 10 questions, 30 seconds each, reflex-based scoring |
| **Challenge Mode** | Daily 5-question challenge, linked to streak |
| **Revision Mode** | Only questions not attempted in last 7 days |
| **Micro Burst** | 5 targeted questions in under 5 minutes (daily habit mode) |

### Micro Burst Mode

The 5 questions in a Burst are not random. They are the 5 most important questions for that student at that moment, selected from:

- Weakest SubHeading from last 7 days
- Questions due for spaced repetition
- One new question from the next topic in sequence

Completing a Burst maintains streak. Missing a Burst increases Open Loop count visually.

---

## 15. Exam Countdown Intelligence

Students set their target exam (e.g., MDCAT, Matric Board, ECAT) and exam date.

The system then:

- Calculates syllabus coverage remaining vs. time available
- Computes a **Readiness Score (0–100%)** updated daily
- Generates a daily topic target to complete syllabus before exam day
- Re-prioritizes weak topics as exam date approaches
- Sends alerts:

  > *"At your current pace, you'll cover 73% of the syllabus by exam day. Adding 2 Burst sessions per day closes the gap. Here are the 5 SubHeadings to prioritize this week."*

---

## 16. Analytics and Dashboards

### 16.1 Student Dashboard

- SubHeading heat map: Red (weak) / Yellow (developing) / Green (strong)
- Open Loop counter with weekly goal
- Readiness Score + exam countdown
- Score trends and accuracy velocity (improving / plateauing / declining)
- Time-per-question tracking — identifies where student slows down
- First-attempt accuracy vs. retry accuracy tracked separately
- Streak and badge progress

### 16.2 Teacher Dashboard

- Class-wide SubHeading heat map
- **Class Struggle Report**: Top 5 MCQs with highest wrong-answer rates
- Distractor Intelligence: which option most students incorrectly chose + suggested re-teaching
- Individual student Confident Mistake alerts
- One-click assign remedial Focused Drill to whole class or individual students
- Deep Weakness escalation queue (students flagged by adaptive system)
- Exportable student report cards per subject

### 16.3 Parent Dashboard (Lightweight)

- Weekly digest: quizzes attempted, strongest subject, weakest SubHeading
- Open Loop count
- Streak status
- Shareable via WhatsApp as a link or PDF summary
- Read-only, no configuration required

### 16.4 Admin Dashboard

- Platform-wide usage and engagement metrics
- Content creation volume and quality signals
- MCQs with highest error rates (content review queue)
- Teacher onboarding and activity tracking
- Resource download and usage analytics

---

## 17. Gamification (Behavior-Change Focused)

Gamification in Growlearnhub is tied to **closing gaps**, not just completing quizzes.

| Element | Trigger |
|---|---|
| **Conquer It Badge** | Weak SubHeading reaches Mastery (Strong band) |
| **Comeback Streak** | Consecutive days of completing Focused Drills |
| **Open Loop Closer** | Closing 5 open loops in one week |
| **Confident Mistake Zero** | 7 days with no Confident Mistakes in a subject |
| **Progress Rings** | Visual mastery ring per subject, fills as SubHeadings conquered |
| **Burst Streak** | Consecutive days of completing Micro Burst |
| **Exam Ready** | Readiness Score crosses 80% for the first time |

Leaderboards are a phased rollout — scoped to class or institute level to avoid discouragement in early phases.

---

## 18. Resource Management

- Upload and manage books, notes, and PDF resources
- Associate resources with Class / Subject / Chapter / Heading / SubHeading
- Surface contextual resource links after wrong answers (*"Struggling with this topic? Read this resource."*)
- Allow users to access, preview, and download selected resources
- Support offline reading for downloaded material via PWA caching
- Bandwidth-aware download prioritization: weak-topic resources download before general content

---

## 19. Offline and Sync

- Auto-downloads next 3 recommended quizzes when on WiFi
- Prioritizes downloading Recovery Queue drills and weak-topic resources
- Queues locally completed quiz attempts and syncs on reconnection
- Intelligent conflict resolution — prevents duplicate attempt submissions
- Teacher content updates sync silently in background
- Bandwidth-aware: compresses images, defers non-critical assets on slow connections
- Offline reading mode for downloaded PDFs and resources

---

## 20. User and Access Management

- Role-based access: Student, Teacher, Admin, Parent (read-only)
- Secure registration, login, logout, and password recovery
- Session management with protected routes
- Basic user profile management
- Personalized dashboard per role
- Parent accounts linkable to student accounts with consent flow

---

## 21. Non-Functional Requirements

### Performance
- Quiz pages load quickly on low-bandwidth connections
- Submission and result generation respond with minimal delay
- Platform remains usable on low- to mid-range mobile devices

### Reliability
- Core quiz-taking workflows are highly available and resilient
- Attempt data stored reliably without loss
- Offline sync handles intermittent connectivity gracefully

### Security
- Authentication follows modern best practices
- APIs protected through authorization and input validation
- Sensitive user data securely stored and transmitted

### Scalability
- Architecture supports growth in users, content volume, and quiz attempts
- Modular design supports future AI, monetization, and institutional features

### Maintainability
- Modular architecture with clean separation of concerns
- Admin and content features extensible without major refactoring
- Logging and monitoring support operational visibility

### Usability
- Fully responsive across desktop, tablet, and mobile
- Navigation intuitive for first-time users
- Key actions (starting quizzes, reviewing results, closing loops) require minimal friction

---

## 22. Functional Requirements Summary

### Authentication
- Register, login, logout, password recovery
- Role-based access with protected routes
- Parent account linking to student with consent

### Content Management
- Hierarchy creation: Class → Subject → Chapter → Heading → SubHeading
- MCQ CRUD with full DNA tagging (difficulty, cognitive level, distractor type, examiner note)
- Bulk import via CSV/Excel with hierarchy auto-mapping
- Quiz creation and assignment
- PDF/resource upload and hierarchy-linked association

### Quiz Experience
- Browse and start quizzes by hierarchy path
- Multiple quiz modes (Practice, Exam Sim, Focused Drill, Burst, etc.)
- Timed and untimed modes
- Confidence tagging per question
- Post-quiz summary: total, correct, incorrect, skipped, time taken, SubHeading-level breakdown
- Wrong answer repetition within session (configurable)

### Adaptive System
- Mastery Score per SubHeading per student
- Recovery Queue with spaced repetition scheduling
- Focused Drill auto-generation on threshold trigger
- Open Loop tracking and dashboard display
- Confident Mistake detection and escalation
- Difficulty band promotion and demotion

### Diagnostics
- Cognitive pattern detection (question type, distractor confusion, fatigue, time pressure)
- Plain-language diagnostic summaries after sessions
- Confidence classification (True Knowledge / Lucky Guess / Confident Mistake / Known Weakness)

### Examiner Mode
- Examiner's Note field per MCQ
- Post-wrong-answer note display to student
- Class-level distractor intelligence in teacher dashboard

### Analytics
- SubHeading heat maps (student and teacher views)
- Accuracy velocity tracking
- Class Struggle Reports with distractor analysis
- Parent weekly digest (WhatsApp-shareable)
- Exam Countdown Readiness Score

---

## 23. Release Strategy

### Phase 1 — Core Foundation
- User authentication and role-based access
- Content hierarchy creation (Class → SubHeading)
- MCQ CRUD with DNA tagging
- Quiz system (Practice and Exam Simulation modes)
- Post-quiz result summary
- Basic student and teacher dashboards
- PDF/resource management
- Analytics baseline

### Phase 2 — Adaptive Learning and Recovery
- Wrong answer Recovery Queue (in-session and cross-session)
- Focused Drill auto-generation
- Open Loop tracking and dashboard
- Mastery Score per SubHeading
- Adaptive difficulty serving
- Confidence Tagging system
- Confident Mistake detection
- Spaced repetition scheduler

### Phase 3 — Diagnostics and Engagement
- Cognitive Diagnosis Engine
- Examiner Thinking Mode
- Class Struggle Reports with distractor intelligence
- Parent Dashboard (lightweight digest)
- Exam Countdown Readiness Score
- Micro Burst Mode
- Full gamification layer (badges, rings, streaks tied to recovery)
- Leaderboards (class-scoped)

### Phase 4 — Offline and Platform Maturity
- Intelligent offline sync and conflict resolution
- Bandwidth-aware asset management
- Offline quiz caching and PDF reading
- Push notifications for Burst reminders and Open Loop alerts

### Phase 5 — Monetization and B2B Expansion
- Premium subscription features
- Teacher and institute plans
- Institutional admin dashboards
- Reporting and administrative controls for organizations
- WhatsApp-shareable parent digest (automated)

---

## 24. Success Metrics

### Engagement
- Daily Active Users (DAU) and Weekly Active Users (WAU)
- Average quizzes completed per active user
- Quiz start-to-completion rate
- Micro Burst completion rate

### Learning Outcomes
- Improvement in learner accuracy over time per SubHeading
- Number of Confident Mistakes converted to True Knowledge
- Number of Weak SubHeadings converted to Strong
- Open Loop resolution rate
- Repeat practice frequency per Recovery Queue item

### Retention
- Weekly and 30-day returning user rate
- Streak continuation rate
- Comeback Streak (Focused Drill return rate)

### Business
- Premium conversion rate
- Teacher and coaching institute onboarding count
- Content creation volume by teachers and admins
- Resource download and usage rate
- Parent digest open rate

---

## 25. Risks and Mitigation

| Risk | Mitigation |
|---|---|
| Scope creep | Maintain strict MVP phase boundaries; gate non-core features |
| Low content quality | Admin review workflows, Examiner's Note standards, distractor quality checks |
| Weak learner retention | Open Loop psychology, Burst streaks, Confident Mistake urgency |
| Connectivity issues | PWA, intelligent caching, bandwidth-aware sync |
| Teacher adoption friction | Keep MCQ creation fast; auto-surface Struggle Reports without manual queries |
| Metacognition resistance | Make Confidence Tagging optional in early phases; incentivize with bonus XP |
| Parent dashboard privacy | Consent-based account linking; parent view is strictly read-only |

---

## 26. Assumptions

- Users are primarily mobile-first, even on web
- Initial content supply created or curated by internal teams and educators
- Internet access is inconsistent for a meaningful share of target users
- MVP success depends on quiz reliability and recovery loop completeness, not feature breadth
- Adaptive logic in early phases uses rule-based recommendations before ML models are introduced
- Confidence Tagging is optional in Phase 1 and becomes default-prompted in Phase 2

---

## 27. Dependencies

- Content creation and review pipeline with Examiner's Note standards
- Secure authentication infrastructure
- Scalable database and API architecture supporting hierarchical content
- Spaced repetition scheduling service
- PWA/offline caching with intelligent sync resolution
- Analytics instrumentation from day one
- ROADMAP.md alignment for phased execution

---

## 28. Out of Scope (MVP)

- Full social and community features (discussion forums, peer groups)
- Real-time proctoring or anti-cheating systems
- Native Android and iOS applications
- Marketplace functionality
- Live classes or video conferencing
- AI-generated tutoring or conversational assistant
- Deep institution billing or enterprise workflow automation
- WhatsApp automated messaging (Phase 5)

---