// UMID Common Reference Number (CRN): 12 digits, printed as ####-#######-#.
// Issued by SSS/GSIS; shared across SSS, GSIS, Pag-IBIG, PhilHealth.
// Validation is format-level only (no checksum).

function digits(s: string): string {
  return (s ?? '').replace(/\D/g, '');
}

export function validateUMID(input: string): boolean {
  if (typeof input !== 'string') return false;
  return digits(input).length === 12;
}

export function formatUMID(input: string): string | null {
  const d = digits(input ?? '');
  if (d.length !== 12) return null;
  return `${d.slice(0, 4)}-${d.slice(4, 11)}-${d.slice(11, 12)}`;
}
