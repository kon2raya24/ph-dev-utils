// SSS number: 10 digits, displayed as XX-XXXXXXX-X.

function digits(s: string): string {
  return s.replace(/\D/g, '');
}

export function validateSSS(input: string): boolean {
  if (typeof input !== 'string') return false;
  return digits(input).length === 10;
}

export function formatSSS(input: string): string | null {
  const d = digits(input ?? '');
  if (d.length !== 10) return null;
  return `${d.slice(0, 2)}-${d.slice(2, 9)}-${d.slice(9)}`;
}
