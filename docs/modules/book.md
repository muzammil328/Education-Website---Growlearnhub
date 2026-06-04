# Book tRPC Procedures

## getAll
Paginated list of books with joined class and board names.
- **Input:** `getBooksInputSchema` — `status`, `page`, `limit`, `sort`, `sortDirection`, `search`
- **Output:** `{ success, message, data: Array<{ bookId, name, slug, status, className, boardName }>, pagination }`
- **Notes:** Joins `classes` and `boards` collections via `$lookup`. Supports text search across name, description, and keywords.
- **Use cases:** Admin dashboard listing, book selection UI.

## getDropdown
Returns active books as `{ value, label }` pairs for select inputs.
- **Input:** `getBookDropdownInputSchema` — optional `search`, `classId`, `boardId`
- **Output:** `Array<{ value: string, label: string }>`
- **Notes:** Filters by `status: 'active'`. Supports optional `classId`/`boardId` filters. Sorted by name.
- **Use cases:** Dropdown menus, form selectors, filter controls.

## getById
Fetches a single book by its MongoDB `_id` with populated references.
- **Input:** `getBookByIdInputSchema` — `id` (string)
- **Output:** `{ bookId, name, slug, description, image, status, classId, boardId, classes?, boards? }`
- **Notes:** Returns 400 for invalid ObjectId. Returns 404 if not found. Populates `classId` and `boardId` references.
- **Use cases:** Detail view, edit form pre-fill.

## getBySlug
Fetches a single book by its URL-friendly slug with populated class and board info.
- **Input:** `getBookBySlugInputSchema` — `slug` (string)
- **Output:** `{ bookId, name, slug, description, image, status, classes, boards }`
- **Notes:** Populates `classId` and `boardId` references with `name` and `slug`. Returns 404 if not found.
- **Use cases:** Public page lookups, SSR data fetching by slug.

## getByName
Fetches a book by name (resolved via slug from lowercased name).
- **Input:** `{ name: z.string() }`
- **Output:** `{ bookId, name, slug, classId, boardingId }` — includes populated class/board refs.
- **Notes:** Uses `slug: name.toLowerCase()` for matching.
- **Use cases:** Quick name-based lookups, import/migration tasks.

## getByClass
Fetches books by class ID.
- **Input:** `getBookByClassInputSchema` — `classId` (string)
- **Output:** `Array<{ bookId, name, slug, description, image, status, boardName, classId }>`
- **Notes:** Joins boards for `boardName`. Returns active books.
- **Use cases:** Filtering books by class on public pages.

## getByBoard
Fetches books by board ID.
- **Input:** `getBookByBoardInputSchema` — `boardId` (string)
- **Output:** `Array<{ bookId, name, slug, description, image, status, className, classId }>`
- **Notes:** Joins classes for `className`. Returns active books.
- **Use cases:** Filtering books by board on public pages.

## create
Creates a new book.
- **Input:** `BookSchema` — `name`, `description`, `image`, `classId`, `boardId`, `keywords`, `status`
- **Output:** `{ success, message, data: { bookId, name, slug, status } }`
- **Notes:** Auto-generates slug from name. Checks for duplicate slug.
- **Use cases:** Admin "Add Book" form.
- **Access:** `superAdminProcedure`

## update
Updates an existing book.
- **Input:** `updateBookInputSchema` — `id`, `updates` (partial BookSchema)
- **Output:** `{ success, message, data: { bookId, name, slug, status } }`
- **Notes:** Re-generates slug from updated name. Checks for duplicate slug excluding current document.
- **Use cases:** Admin "Edit Book" form.
- **Access:** `superAdminProcedure`

## delete
Removes a book document.
- **Input:** `deleteBookInputSchema` — `id`
- **Output:** `{ success, message }`
- **Notes:** Returns 404 if not found. No cascade.
- **Use cases:** Admin book removal.
- **Access:** `superAdminProcedure`
