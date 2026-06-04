# Heading tRPC Procedures

## getAll
Paginated list of headings with joined class, book, and chapter names.
- **Input:** `getHeadingsInputSchema` — `status`, `page`, `limit`, `sort`, `sortDirection`, `search`, `classId`, `bookId`, `chapterId`
- **Output:** `{ success, message, data: Array<{ headingId, name, status, className, bookName, chapterName }>, pagination }`
- **Notes:** Joins `classes`, `books`, and `chapters` via `$lookup`. Supports text search across all joined names. Filters by optional `classId`/`bookId`/`chapterId`.
- **Use cases:** Admin dashboard listing, heading selection UI.

## getDropdown
Returns active headings as `{ value, label }` pairs for select inputs.
- **Input:** `getHeadingDropdownInputSchema` — optional `search`, `classId`, `bookId`, `chapterId`
- **Output:** `Array<{ value: string, label: string }>`
- **Notes:** Filters by `status: 'active'`. Supports optional `classId`/`bookId`/`chapterId` filters. Sorted by name.
- **Use cases:** Dropdown menus, form selectors, filter controls.

## getById
Fetches a single heading by its MongoDB `_id` with class, book, and chapter names.
- **Input:** `getHeadingByIdInputSchema` — `id` (string)
- **Output:** `{ headingId, name, slug, status, order, classId, bookId, chapterId, class: { classId, className }, book: { bookId, bookName }, chapter: { chapterId, chapterName } }`
- **Notes:** Returns 400 for invalid ObjectId. Returns 404 if not found. Uses aggregation with `$lookup`.
- **Use cases:** Detail view, edit form pre-fill.

## getBySlug
Fetches a single heading by its URL-friendly slug with fully populated class, book, and chapter info.
- **Input:** `getHeadingBySlugInputSchema` — `slug` (string)
- **Output:** `{ headingId, name, slug, status, order, class: { classId, name, slug }, book: { bookId, name, slug }, chapter: { chapterId, name, slug } }`
- **Notes:** Uses `findOne` with `populate`. Returns 404 if not found.
- **Use cases:** Public page lookups, SSR data fetching by slug.

## create
Creates a new heading.
- **Input:** `HeadingSchema` — `name`, `status`, `classId`, `bookId`, `chapterId`, `order`
- **Output:** `{ success, message, data: { headingId, name, slug, status } }`
- **Notes:** Auto-generates slug from name. Checks for duplicate slug+chapterId combination.
- **Use cases:** Admin "Add Heading" form.
- **Access:** `superAdminProcedure`

## update
Updates an existing heading.
- **Input:** `updateHeadingInputSchema` — `id`, `updates` (partial HeadingSchema)
- **Output:** `{ success, message, data: { headingId, name, slug, status } }`
- **Notes:** Re-generates slug from updated name. Checks for duplicate slug+chapterId excluding current document.
- **Use cases:** Admin "Edit Heading" form.
- **Access:** `superAdminProcedure`

## delete
Removes a heading document.
- **Input:** `deleteHeadingInputSchema` — `id`
- **Output:** `{ success, message }`
- **Notes:** Returns 404 if not found. No cascade.
- **Use cases:** Admin heading removal.
- **Access:** `superAdminProcedure`
