# Chapter tRPC Procedures

## getAll
Paginated list of chapters with joined class and book names.
- **Input:** `getChaptersInputSchema` — `status`, `page`, `limit`, `sort`, `sortDirection`, `search`, `classId`, `bookId`
- **Output:** `{ success, message, data: Array<{ chapterId, name, status, className, bookName, createdAt, updatedAt }>, pagination }`
- **Notes:** Joins `classes` and `books` via `$lookup`. Supports text search across name, className, and bookName. Filters by optional `classId`/`bookId`.
- **Use cases:** Admin dashboard listing, chapter selection UI.

## getDropdown
Returns active chapters as `{ value, label }` pairs for select inputs.
- **Input:** `getChapterDropdownInputSchema` — optional `search`, `classId`, `bookId`
- **Output:** `Array<{ value: string, label: string }>`
- **Notes:** Filters by `status: 'active'`. Supports optional `classId`/`bookId` filters. Sorted by name.
- **Use cases:** Dropdown menus, form selectors, filter controls.

## getById
Fetches a single chapter by its MongoDB `_id` with class and book names.
- **Input:** `getChapterByIdInputSchema` — `id` (string)
- **Output:** `{ chapterId, name, slug, status, description, content, order, classId, bookId, className, bookName }`
- **Notes:** Returns 400 for invalid ObjectId format. Returns 404 if not found. Uses aggregation with `$lookup`.
- **Use cases:** Detail view, edit form pre-fill.

## getBySlug
Fetches a single chapter by its URL-friendly slug with fully populated class and book info.
- **Input:** `getChapterBySlugOnlyInputSchema` — `slug` (string)
- **Output:** `{ chapterId, name, slug, status, description, content, order, class: { classId, name, slug }, book: { bookId, name, slug } }`
- **Notes:** Uses `findOne` with `populate`. Returns 404 if not found.
- **Use cases:** Public page lookups, SSR data fetching by slug.

## getByClassSlugAndChapterSlug
Fetches a chapter identified by compound class slug + chapter slug.
- **Input:** `getChapterBySlugInputSchema` — `classSlug`, `chapterSlug`
- **Output:** `{ chapterId, name, slug, status, description, content, order, classId, bookId, className, bookName }`
- **Notes:** Uses repository method that joins class + class->book to resolve the chapter. Returns 404 if not found.
- **Use cases:** Public-facing chapter detail pages accessed via nested slug route.

## getByClassAndBookName
Fetches chapters by class name and book name.
- **Input:** `getChapterByClassAndBookNameInputSchema` — `className`, `bookName`
- **Output:** `Array<{ name, slug }>`
- **Notes:** Uses repository method to resolve class/books by name.
- **Use cases:** Import/migration tasks, name-based lookups.

## create
Creates a new chapter.
- **Input:** `ChapterSchema` — `name`, `status`, `bookId`, `classId`, `order`, `description`, `content`
- **Output:** `{ success, message, data: { chapterId, name, slug, status } }`
- **Notes:** Auto-generates slug from name. Checks for duplicate slug+bookId combination.
- **Use cases:** Admin "Add Chapter" form.
- **Access:** `superAdminProcedure`

## update
Updates an existing chapter.
- **Input:** `updateChapterInputSchema` — `id`, `updates` (partial ChapterSchema)
- **Output:** `{ success, message, data: { chapterId, name, slug, status } }`
- **Notes:** Re-generates slug from updated name.
- **Use cases:** Admin "Edit Chapter" form.
- **Access:** `superAdminProcedure`

## delete
Removes a chapter document.
- **Input:** `deleteChapterInputSchema` — `id`
- **Output:** `{ success, message }`
- **Notes:** Returns 404 if not found. No cascade.
- **Use cases:** Admin chapter removal.
- **Access:** `superAdminProcedure`
