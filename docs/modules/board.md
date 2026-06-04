# Board tRPC Procedures

## getAll
Paginated list of boards with joined class names.
- **Input:** `getBoardsInputSchema` — `status`, `page`, `limit`, `sort`, `sortDirection`, `search`
- **Output:** `{ success, message, data: Array<{ boardId, name, slug, status, description, className }>, pagination }`
- **Notes:** Joins `classes` collection via `$lookup` to include class names.
- **Use cases:** Admin dashboard listing, board selection UI.

## getDropdown
Returns active boards as `{ value, label }` pairs for select inputs.
- **Input:** `getBoardDropdownInputSchema` — optional `search`
- **Output:** `Array<{ value: string, label: string }>`
- **Notes:** Filters by `status: 'active'`. Sorted by name.
- **Use cases:** Dropdown menus, form selectors, filter controls.

## getById
Fetches a single board by its MongoDB `_id`.
- **Input:** `getBoardByIdInputSchema` — `id` (string)
- **Output:** `{ boardId, name, slug, status, description, classId }`
- **Notes:** Returns 400 for invalid ObjectId. Returns 404 if not found.
- **Use cases:** Detail view, edit form pre-fill.

## getBySlug
Fetches a single board by its URL-friendly slug with populated class.
- **Input:** `getBoardBySlugInputSchema` — `slug` (string)
- **Output:** `{ boardId, name, slug, status, description, class: { classId, name, slug } | null }`
- **Notes:** Populates `classId` reference with `name` and `slug`. Returns 404 if not found.
- **Use cases:** Public page lookups, SSR data fetching by slug.

## create
Creates a new board.
- **Input:** `BoardSchema` — `name`, `status`, `classId`, `description`
- **Output:** `{ success, message, data: { boardId, name, slug, status } }`
- **Notes:** Auto-generates slug from name. Checks for duplicate slug/name.
- **Use cases:** Admin "Add Board" form.
- **Access:** `superAdminProcedure`

## update
Updates an existing board.
- **Input:** `updateBoardInputSchema` — `id`, `updates` (partial BoardSchema)
- **Output:** `{ success, message, data: { boardId, name, slug, status } }`
- **Notes:** Re-generates slug from updated name. Checks for duplicate name/slug excluding current document.
- **Use cases:** Admin "Edit Board" form.
- **Access:** `superAdminProcedure`

## delete
Removes a board document.
- **Input:** `deleteBoardInputSchema` — `id`
- **Output:** `{ success, message }`
- **Notes:** Returns 404 if not found. No cascade.
- **Use cases:** Admin board removal.
- **Access:** `superAdminProcedure`
