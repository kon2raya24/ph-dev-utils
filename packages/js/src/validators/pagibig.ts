// Pag-IBIG MID (Member Identification Number): 12 digits, displayed as XXXX-XXXX-XXXX.

function digits(s: string): string {
  return s.replace(/\D/g, '');
}

export function validatePagIBIG(input: string): boolean {
  if (typeof input !== 'string') return false;
  return digits(input).length === 12;
}

export function formatPagIBIG(input: string): string | null {
  const d = digits(input ?? '');
  if (d.length !== 12) return null;
  return `${d.slice(0, 4)}-${d.slice(4, 8)}-${d.slice(8)}`;
}
