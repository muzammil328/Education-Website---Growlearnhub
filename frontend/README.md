# EduPlatform Admin Sidebar

Create a premium, production-ready collapsible sidebar for **EduPlatform** using:

* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

The design should feel comparable to **Linear**, **Arc Browser**, **Notion Calendar**, **Stripe Dashboard**, and modern SaaS admin platforms.

---

# Design Goals

The sidebar should feel:

* Modern
* Premium
* Clean
* Minimal
* Fast
* Accessible
* Production-ready

Use the application's existing design tokens and color system.

Do not introduce new brand colors.

---

# Sidebar Layout

## States

### Expanded

* Width: `280px`
* Logo + brand visible
* Icons + labels visible
* Section labels visible

### Collapsed

* Width: `80px`
* Only icons visible
* Labels hidden
* Section labels hidden
* Tooltips shown on hover

---

# Container

* Full height
* White surface
* Border radius: `24px`
* Border: `1px solid #EAEAEA`
* Soft shadow
* Overflow hidden
* Smooth width transition (`300ms ease-in-out`)

Background behind sidebar:

```css
background: linear-gradient(
  180deg,
  #E8FFFB 0%,
  #D7FFF5 100%
);
```

---

# Header

## Brand

EduPlatform

### Logo

* 48 × 48
* Rounded corners
* Uses current brand color
* Simple modern academic icon

### Expanded Header Layout

```text
[ Logo ] EduPlatform                    [ X ]
```

### Collapsed Header Layout

```text
[ Logo ]
```

### Header Behavior

* Brand name fades in/out
* Collapse button only visible when expanded
* Smooth Framer Motion transitions

---

# Navigation Structure

## Learning Management

* Overview
* Courses
* Events
* MCQs
* Services

## Academic Structure

* Classes
* Books
* Chapters
* Headings
* Sub Headings
* Boards

## User Management

* Students
* Class Groups

## Support

* Contact Us
* Bug Report
* Feature Request

---

# Lucide Icons

## Learning Management

* Overview → LayoutDashboard
* Courses → BookOpen
* Events → CalendarDays
* MCQs → CircleHelp
* Services → Briefcase

## Academic Structure

* Classes → GraduationCap
* Books → Book
* Chapters → FileText
* Headings → Heading1
* Sub Headings → Heading2
* Boards → ClipboardList

## User Management

* Students → Users
* Class Groups → UsersRound

## Support

* Contact Us → Mail
* Bug Report → Bug
* Feature Request → Lightbulb

---

# Navigation Sections

Display section labels only when expanded.

Example:

```text
LEARNING MANAGEMENT

ACADEMIC STRUCTURE

USER MANAGEMENT

SUPPORT
```

Section labels should:

* Be small
* Uppercase
* Muted foreground color
* Font weight: 600
* Letter spacing: wide

Hide completely in collapsed mode.

---

# Active Navigation State

The active item should match modern SaaS navigation patterns and resemble the provided reference image.

## Appearance

* Entire item becomes active
* No left border
* No vertical indicator line
* Use a rounded pill background

```css
border-radius: 9999px;
```

### Active Colors

Use existing theme colors:

```css
background: hsl(var(--primary) / 0.15);
color: hsl(var(--primary));
```

### Typography

```css
font-weight: 600;
```

### Icon

```css
color: hsl(var(--primary));
```

Visual:

```text
╭─────────────────────────╮
│ ◉ Overview              │
╰─────────────────────────╯
```

---

# Active Animation

Use Framer Motion shared layout animations.

Requirements:

* Active pill smoothly slides between items
* No flicker
* No layout jumps
* Duration: 0.25s
* Ease: easeInOut

The active indicator should feel like a single floating element moving throughout the navigation.

---

# Hover State

Inactive items:

```css
color: #9CA3AF;
```

On hover:

```css
background: hsl(var(--primary) / 0.05);
```

Behavior:

* Background fades in
* Text darkens slightly
* Icon darkens slightly
* Smooth transitions

---

# Expanded Navigation Item

Layout:

```text
[ Icon ]  Label
```

Styles:

* Height: 48px
* Width: 100%
* Padding X: 20px
* Gap: 16px
* Border radius: 9999px

---

# Collapsed Navigation Item

Layout:

```text
[ Icon ]
```

Styles:

* Icon centered
* Labels hidden
* Same active pill treatment
* Circular active container

Example:

```text
╭─────╮
│  ◉  │
╰─────╯
```

---

# Sidebar Footer

Place Support section at the bottom:

```css
margin-top: auto;
```

Structure:

```text
Main Navigation

────────────

Support
├── Contact Us
├── Bug Report
└── Feature Request
```

This separation should feel intentional and premium.

---

# Motion & Interactions

Animate:

## Sidebar

* Width
* Header content
* Labels
* Section labels

## Labels

Expand:

* Fade in
* Slide from left

Collapse:

* Fade out
* Collapse smoothly

## Navigation

* Shared active indicator animation
* Smooth hover effects
* No abrupt changes

---

# Accessibility

* Semantic navigation
* Keyboard navigation support
* Focus-visible styles
* ARIA labels
* Tooltips for collapsed mode
* Screen-reader friendly

---

# Component Structure

```text
Sidebar
├── SidebarHeader
├── SidebarSection
├── SidebarNav
├── SidebarItem
├── SidebarFooter
└── TooltipProvider
```
# Expected Result

Build a production-quality EduPlatform sidebar featuring:

* Collapsible navigation
* Smooth width transitions
* Sectioned navigation groups
* Pill-style active state
* Existing application color scheme
* Premium Framer Motion animations
* Modern SaaS aesthetics
* Fully responsive design
* Accessibility best practices
* Clean reusable component architecture
