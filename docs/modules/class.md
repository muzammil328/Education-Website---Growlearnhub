Implement or update the Class module according to the following specifications.

## Architecture

### Backend

* Router: `backend/src/routers/class.router.ts`
* Model: `backend/src/models/class.model.ts`
* Repository: `backend/src/repository/class.repository.ts`
* Service: `backend/src/services/class.service.ts`
* Seeder: `backend/src/seeders/class.seeder.ts`

### Frontend

* Hooks: `frontend/src/hooks/use-class.ts`

### Shared Package

* Schema: `packages/src/schemas/class.schema.ts`
* Type: `packages/src/types/class.type.ts`
* Enum: `packages/src/enums/class.enum.ts`

---

## Rules
[Review Common Rules](./index.md)

---

## Procedures
- getAll
- getDropdown
- getById
- getBySlug
- getByServiceSlug
- create
- update
- delete

### getAll

**Access:** `teacherProcedure`

**Input:**

* **Params:**
* **Body:**
* **Query:** page, limit, status, search, sort, sortDirection

**Output:**

```ts
{
  success: boolean;
  message: string;
  data: Array<{
    classId: string;
    name: string;
    status: string;
    serviceName: string;
  }>;
  pagination: Pagination;
}
```

---

### getDropdown

**Access:** `teacherProcedure`

**Input:**

* **Params:**
* **Body:**
* **Query:** search, serviceId

**Output:**

```ts
Array<{
  value: string;
  label: string;
}>
```

---

### getById

**Access:** `teacherProcedure`

**Input:**

* **Params:** classId
* **Body:**
* **Query:**

**Output:**

```ts
{
  classId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: string;
  keywords: string[];
  serviceId: string[];
}
```

---

### getBySlug

**Access:** `teacherProcedure`

**Input:**

* **Params:** slug
* **Body:**
* **Query:**

**Output:**

```ts
{
  classId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: string;
  keywords: string[];
  services: Array<{
    serviceId: string;
    name: string;
    slug: string;
  }>;
}
```

---

### getByServiceSlug

**Access:** `publicProcedure`

**Input:**

* **Params:** serviceSlug
* **Body:**
* **Query:**

**Output:**

```ts
Array<{
  name: string;
  slug: string;
}>
```

---

### create

**Access:** `superAdminProcedure`

**Input:**

* **Params:**
* **Body:** name, description, serviceId, image, keywords, status
* **Query:**

**Output:**

```ts
{
  success: boolean;
  message: string;
  data: {
    classId: string;
    name: string;
    slug: string;
    status: string;
    description: string;
    serviceId: string[];
    image: string;
    keywords: string[];
  };
}
```

---

### update

**Access:** `superAdminProcedure`

**Input:**

* **Params:** classId
* **Body:** name, description, serviceId, image, keywords, status
* **Query:**

**Output:**

```ts
{
  success: boolean;
  message: string;
  data: {
    classId: string;
    name: string;
    slug: string;
    status: string;
    description: string;
    serviceId: string[];
    image: string;
    keywords: string[];
  };
}
```

---

### delete

**Access:** `superAdminProcedure`

**Input:**

* **Params:** classId
* **Body:**
* **Query:**

**Output:**

```ts
{
  success: boolean;
  message: string;
}
```
