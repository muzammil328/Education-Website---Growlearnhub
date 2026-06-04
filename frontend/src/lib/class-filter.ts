export function decodeRouteParam(value: string): string {
  try {
    return decodeURIComponent(value).replace(/\+/g, ' ').trim();
  } catch {
    return value.replace(/\+/g, ' ').trim();
  }
}

export function normalizeFilterValue(value: string): string {
  return decodeRouteParam(value).toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function toClassDisplayName(classValue: string): string {
  const normalized = normalizeFilterValue(classValue);
  const match = normalized.match(/^class\s*(\d+)$/);

  if (match) {
    return `Class ${match[1]}`;
  }

  return normalized
    .split(' ')
    .filter(Boolean)
    .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

export function toDisplayName(value: string): string {
  const normalized = normalizeFilterValue(value);

  return normalized
    .split(' ')
    .filter(Boolean)
    .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

export function matchesClassName(candidate: string | undefined, classValue: string): boolean {
  if (!candidate) {
    return false;
  }

  const candidateNormalized = normalizeFilterValue(candidate);
  const classNormalized = normalizeFilterValue(classValue);

  if (!candidateNormalized || !classNormalized) {
    return false;
  }

  if (candidateNormalized === classNormalized) {
    return true;
  }

  const candidateClassNumber = candidateNormalized.match(/^class\s*(\d+)$/)?.[1];
  const classNumber = classNormalized.match(/^class\s*(\d+)$/)?.[1];

  return Boolean(candidateClassNumber && classNumber && candidateClassNumber === classNumber);
}

export function slugifyPathSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
