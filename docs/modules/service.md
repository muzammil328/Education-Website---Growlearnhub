# Service tRPC Procedures

## getAll
Paginated list of services with optional class name join.
- **Input:** `getServicesInputSchema` — `status`, `page`, `limit`, `sort`, `sortDirection`, `search`, `className`
- **Output:** `{ success, message, data: Array<{ serviceId, name, slug, status, className }>, pagination }`
- **Notes:** Joins `classes` collection via `$lookup` to include class names. Filters by `className` after the lookup.
- **Use cases:** Admin dashboard listing, service selection UI.

## getDropdown
Returns active services as `{ value, label }` pairs for select inputs.
- **Input:** `getServiceDropdownInputSchema` — optional `search`, `classId`
- **Output:** `Array<{ value: string, label: string }>`
- **Notes:** Filters by `status: 'active'`. Respects optional `classId` filter. Sorted by name.
- **Use cases:** Dropdown menus, form selectors, filter controls.

## getById
Fetches a single service by its MongoDB `_id`.
- **Input:** `getServiceByIdInputSchema` — `id` (string)
- **Output:** `{ serviceId, name, slug, status, description, image, keywords, classId, classes }`
- **Notes:** Returns 400 for invalid ObjectId format. Returns 404 if not found. Joins `classes` for rich output.
- **Use cases:** Detail view, edit form pre-fill.

## getBySlug
Fetches a single service by its URL-friendly slug.
- **Input:** `getServiceBySlugInputSchema` — `slug` (string)
- **Output:** `{ serviceId, name, slug, status, description, image, keywords, classes }`
- **Notes:** Populates `classId` references with `name` and `slug`. Returns 404 if not found.
- **Use cases:** Public page lookups, SSR data fetching by slug.

## getByName
Fetches a service by name (resolved via slug from lowercased name).
- **Input:** `{ name: z.string() }`
- **Output:** `{ serviceId, name, slug, classes }` — includes populated class details.
- **Notes:** Uses `slug: name.toLowerCase()` for matching. Populates `classId` refs.
- **Use cases:** Quick name-based lookups, import/migration tasks.

## create
Creates a new service.
- **Input:** `ServiceSchema` — `name`, `description`, `image`, `keywords`, `classId`, `status`
- **Output:** `{ success, message, data: { serviceId, name, slug, status } }`
- **Notes:** Auto-generates slug from name. Checks for duplicate slug. `classId` accepts string array — validated and converted to ObjectIds.
- **Use cases:** Admin "Add Service" form.
- **Access:** `superAdminProcedure`

## update
Updates an existing service.
- **Input:** `updateServiceInputSchema` — `id`, `updates` (partial ServiceSchema)
- **Output:** `{ success, message, data: { serviceId, name, slug, status } }`
- **Notes:** Re-generates slug from updated name. Checks for duplicate slug excluding current document. Only updates provided fields.
- **Use cases:** Admin "Edit Service" form.
- **Access:** `superAdminProcedure`

## delete
Soft-awareness delete — removes the document.
- **Input:** `deleteServiceInputSchema` — `id`
- **Output:** `{ success, message }`
- **Notes:** Returns 404 if not found. No cascade — child entities remain orphaned.
- **Use cases:** Admin service removal.
- **Access:** `superAdminProcedure`
