# SubHeading tRPC Procedures

## getAll
Paginated list of subHeadings with joined class, book, chapter, and heading names.
- **Input:** `getSubHeadingsInputSchema` — `status`, `page`, `limit`, `sort`, `sortDirection`, `search`, `classId`, `bookId`, `chapterId`, `headingId`
- **Output:** `{ success, message, data: Array<{ subHeadingId, name, status, className, bookName, chapterName, headingName }>, pagination }`
- **Notes:** Joins `classes`, `books`, `chapters`, and `headings` via `$lookup`. Filters by optional `classId`/`bookId`/`chapterId`/`headingId`.
- **Use cases:** Admin dashboard listing, subHeading selection UI.

## getDropdown
Returns active subHeadings as `{ value, label }` pairs for select inputs.
- **Input:** `getSubHeadingDropdownInputSchema` — optional `search`, `classId`, `bookId`, `chapterId`, `headingId`
- **Output:** `Array<{ value: string, label: string }>`
- **Notes:** Filters by `status: 'active'`. Supports optional parent ID filters. Sorted by name.
- **Use cases:** Dropdown menus, form selectors, filter controls.

## getById
Fetches a single subHeading by its MongoDB `_id` with class, book, chapter, and heading names.
- **Input:** `getSubHeadingByIdInputSchema` — `id` (string)
- **Output:** `{ subHeadingId, name, slug, status, order, classId, bookId, chapterId, headingId, class: { classId, className }, book: { bookId, bookName }, chapter: { chapterId, chapterName }, heading: { headingId, headingName } }`
- **Notes:** Returns 400 for invalid ObjectId. Returns 404 if not found. Uses aggregation with `$lookup`.
- **Use cases:** Detail view, edit form pre-fill.

## getBySlug
Fetches a single subHeading by its URL-friendly slug with fully populated parent entities.
- **Input:** `getSubHeadingBySlugInputSchema` — `slug` (string)
- **Output:** `{ subHeadingId, name, slug, status, order, class: { classId, name, slug }, book: { bookId, name, slug }, chapter: { chapterId, name, slug }, heading: { headingId, name, slug } }`
- **Notes:** Uses `findOne` with `populate` across all 4 parent references. Returns 404 if not found.
- **Use cases:** Public page lookups, SSR data fetching by slug.

## create
Creates a new subHeading.
- **Input:** `SubHeadingSchema` — `name`, `status`, `classId`, `bookId`, `chapterId`, `headingId`, `order`
- **Output:** `{ success, message, data: { subHeadingId, name, slug, status } }`
- **Notes:** Auto-generates slug from name. Checks for duplicate slug+headingId combination.
- **Use cases:** Admin "Add SubHeading" form.
- **Access:** `superAdminProcedure`

## update
Updates an existing subHeading.
- **Input:** `updateSubHeadingInputSchema` — `id`, `updates` (partial SubHeadingSchema)
- **Output:** `{ success, message, data: { subHeadingId, name, slug, status } }`
- **Notes:** Re-generates slug from updated name. Checks for duplicate slug+headingId excluding current document.
- **Use cases:** Admin "Edit SubHeading" form.
- **Access:** `superAdminProcedure`

## delete
Removes a subHeading document.
- **Input:** `deleteSubHeadingInputSchema` — `id`
- **Output:** `{ success, message }`
- **Notes:** Returns 404 if not found. No cascade.
- **Use cases:** Admin subHeading removal.
- **Access:** `superAdminProcedure`
