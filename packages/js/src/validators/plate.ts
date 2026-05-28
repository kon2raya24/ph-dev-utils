// LTO motor-vehicle plate numbers, format-level only. Covers the standard private
// 4-wheel and motorcycle series (not specialty / government / diplomatic / temporary):
//   - 4-wheel:    3 letters + 3-4 digits   (e.g. "ABC 1234", older "ABC 123")
//   - motorcycle: 2 letters + 4-5 digits   (e.g. "AB 12345")
//                 or 1 letter + 3 digits + 2 letters  (2023+ series, e.g. "A 123 BC")

export type PlateType = 'car' | 'motorcycle';

const CAR = /^[A-Z]{3}\d{3,4}$/;
const MC_OLD = /^[A-Z]{2}\d{4,5}$/;
const MC_NEW = /^[A-Z]\d{3}[A-Z]{2}$/;

function normalize(s: string): string {
  return (s ?? '').replace(/[\s-]/g, '').toUpperCase();
}

export interface PlateParse {
  /** Normalized plate (uppercase, no spaces/dashes). */
  plate: string;
  type: PlateType;
}

/** Parse a plate into `{ plate, type }`, or `null` if it isn't a recognized standard format. */
export function parsePlate(input: string): PlateParse | null {
  if (typeof input !== 'string') return null;
  const s = normalize(input);
  if (CAR.test(s)) return { plate: s, type: 'car' };
  if (MC_OLD.test(s) || MC_NEW.test(s)) return { plate: s, type: 'motorcycle' };
  return null;
}

export function validatePlate(input: string): boolean {
  return parsePlate(input) !== null;
}
