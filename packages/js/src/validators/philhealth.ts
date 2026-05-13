// PhilHealth Identification Number (PIN): 12 digits, displayed as XX-XXXXXXXXX-X.

function digits(s: string): string {
  return s.replace(/\D/g, '');
}

export function validatePhilHealth(input: string): boolean {
  if (typeof input !== 'string') return false;
  return digits(input).length === 12;
}

export function formatPhilHealth(input: string): string | null {
  const d = digits(input ?? '');
  if (d.length !== 12) return null;
  return `${d.slice(0, 2)}-${d.slice(2, 11)}-${d.slice(11)}`;
}
