// PhilSys National ID — the 16-digit PhilSys Card Number (PCN) printed on the PhilID.
// We validate the PCN, NOT the 12-digit PhilSys Number (PSN), which is never disclosed.
// Validation is format-level only (no checksum).

function digits(s: string): string {
  return (s ?? '').replace(/\D/g, '');
}

export function validateNationalID(input: string): boolean {
  if (typeof input !== 'string') return false;
  return digits(input).length === 16;
}

export function formatNationalID(input: string): string | null {
  const d = digits(input ?? '');
  if (d.length !== 16) return null;
  return `${d.slice(0, 4)}-${d.slice(4, 8)}-${d.slice(8, 12)}-${d.slice(12, 16)}`;
}
