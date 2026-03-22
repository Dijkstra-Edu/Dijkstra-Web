/** LeetCode public username: 3–20 chars, letters, digits, underscore, hyphen. */
export function isValidLeetCodeUsername(value: string): boolean {
  const normalized = value.trim();
  if (normalized.length === 0) return false;
  return /^[A-Za-z0-9_-]{3,20}$/.test(normalized);
}
