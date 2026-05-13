// BIR TIN: 9 digits (individual) or 12 digits (with 3-digit branch code).
// BIR does not publish a checksum algorithm — validation is format-level only.

function digits(s: string): string {
  return s.replace(/\D/g, '');
}

export function validateTIN(input: string): boolean {
  if (typeof input !== 'string') return false;
  const d = digits(input);
  return d.length === 9 || d.length === 12;
}

export function formatTIN(input: string): string | null {
  const d = digits(input ?? '');
  if (d.length === 9) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 9)}`;
  if (d.length === 12) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 9)}-${d.slice(9, 12)}`;
  return null;
}
