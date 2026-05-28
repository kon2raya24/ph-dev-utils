// LTO driver's license number: 1 letter + 10 digits, displayed as `X##-##-######`
// (agency-code letter + 2 digits, then 2 digits, then a 6-digit sequence).
// Format-level only (no checksum). e.g. "N02-12-345678".

function normalize(s: string): string {
  return (s ?? '').replace(/[\s-]/g, '').toUpperCase();
}

export function validateDriversLicense(input: string): boolean {
  if (typeof input !== 'string') return false;
  return /^[A-Z]\d{10}$/.test(normalize(input));
}

export function formatDriversLicense(input: string): string | null {
  const s = normalize(input ?? '');
  if (!/^[A-Z]\d{10}$/.test(s)) return null;
  return `${s.slice(0, 3)}-${s.slice(3, 5)}-${s.slice(5, 11)}`;
}
