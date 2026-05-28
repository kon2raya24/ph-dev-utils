// Philippine passport number, format-level only (no checksum).
// Two current patterns, both 9 characters:
//   - ePassport (issued Aug 15, 2016 onward): 1 letter + 7 digits + 1 letter, e.g. P1234567A
//   - Machine-readable (2005–2016):           2 letters + 7 digits,        e.g. XX1234567

const EPASSPORT = /^[A-Z]\d{7}[A-Z]$/;
const MRP = /^[A-Z]{2}\d{7}$/;

function normalize(s: string): string {
  return (s ?? '').replace(/[\s-]/g, '').toUpperCase();
}

export function validatePassport(input: string): boolean {
  if (typeof input !== 'string') return false;
  const n = normalize(input);
  return EPASSPORT.test(n) || MRP.test(n);
}

export function formatPassport(input: string): string | null {
  const n = normalize(input ?? '');
  return EPASSPORT.test(n) || MRP.test(n) ? n : null;
}
