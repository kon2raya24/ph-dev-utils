// PRC (Professional Regulation Commission) license / registration number: 7 digits.
// Validation is format-level only (no checksum).

function digits(s: string): string {
  return (s ?? '').replace(/\D/g, '');
}

export function validatePRC(input: string): boolean {
  if (typeof input !== 'string') return false;
  return digits(input).length === 7;
}

export function formatPRC(input: string): string | null {
  const d = digits(input ?? '');
  return d.length === 7 ? d : null;
}
