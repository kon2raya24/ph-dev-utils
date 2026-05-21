import data2025 from '../data/holidays-2025.json' with { type: 'json' };
import data2026 from '../data/holidays-2026.json' with { type: 'json' };

export type HolidayType = 'regular' | 'special_non_working' | 'special_working';

export interface Holiday {
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** Official holiday name. */
  name: string;
  /** Pay-rule type — see `PAY_MULTIPLIER` for the labor-code multiplier. */
  type: HolidayType;
  /** Proclamation number, when the holiday is declared by a separate proclamation (Islamic holidays). */
  proclamation?: string;
}

interface HolidayYearFile {
  _meta: { year: number; source: string; source_url: string; verified_on: string };
  holidays: Holiday[];
}

const FILES: Record<number, HolidayYearFile> = {
  2025: data2025 as HolidayYearFile,
  2026: data2026 as HolidayYearFile,
};

/**
 * Department of Labor and Employment pay-rule multipliers for hours worked on each holiday type.
 * - Regular holiday worked: 200% base (1 day's wage even if not worked + 100% premium = 200%).
 * - Special non-working worked: 130% base.
 * - Special working: 100% (no premium).
 *
 * See DOLE Handbook on Workers' Statutory Monetary Benefits.
 */
export const PAY_MULTIPLIER: Record<HolidayType, number> = {
  regular: 2.0,
  special_non_working: 1.3,
  special_working: 1.0,
};

function supportedYears(): number[] {
  return Object.keys(FILES).map(Number).sort((a, b) => a - b);
}

function assertYearSupported(year: number, fnName: string): void {
  if (!Object.prototype.hasOwnProperty.call(FILES, year)) {
    throw new RangeError(
      `${fnName}: no holiday data for year ${year}. Available: ${supportedYears().join(', ')}. ` +
      `PH holidays are proclaimed annually; future years are added per package release.`,
    );
  }
}

function normalizeDate(input: string | Date): string {
  if (input instanceof Date) {
    const y = input.getFullYear();
    const m = String(input.getMonth() + 1).padStart(2, '0');
    const d = String(input.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  if (typeof input !== 'string') {
    throw new TypeError('holidays: date must be a string (YYYY-MM-DD) or Date instance');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    throw new TypeError(`holidays: date must be in YYYY-MM-DD format, got "${input}"`);
  }
  return input;
}

/**
 * Return all PH holidays for the given year.
 *
 * Throws `RangeError` if the year is not in the bundled dataset.
 *
 * @example
 *   listHolidaysOfYear(2026);
 *   // [{ date: '2026-01-01', name: "New Year's Day", type: 'regular' }, ...]
 */
export function listHolidaysOfYear(year: number): Holiday[] {
  assertYearSupported(year, 'listHolidaysOfYear');
  return FILES[year].holidays.slice();
}

/**
 * Look up the holiday on a specific date, if any.
 *
 * Returns `null` for non-holiday dates.
 *
 * @example
 *   findHoliday('2026-12-25');
 *   // { date: '2026-12-25', name: 'Christmas Day', type: 'regular' }
 */
export function findHoliday(date: string | Date): Holiday | null {
  const iso = normalizeDate(date);
  const year = Number.parseInt(iso.slice(0, 4), 10);
  if (!Object.prototype.hasOwnProperty.call(FILES, year)) return null;
  return FILES[year].holidays.find((h) => h.date === iso) ?? null;
}

/**
 * True if the date is any kind of PH holiday (regular, special non-working, or special working).
 *
 * Pass `{ types: [...] }` to restrict to specific types — e.g., to check "is this a paid day off?",
 * use `{ types: ['regular', 'special_non_working'] }`.
 *
 * @example
 *   isHoliday('2026-12-25');                                       // true
 *   isHoliday('2026-02-25', { types: ['regular'] });               // false (special_working)
 *   isHoliday('2026-02-25', { types: ['special_working'] });       // true
 */
export function isHoliday(date: string | Date, opts: { types?: HolidayType[] } = {}): boolean {
  const h = findHoliday(date);
  if (!h) return false;
  if (!opts.types) return true;
  return opts.types.includes(h.type);
}

/**
 * Find the next PH holiday on or after the given date.
 *
 * Pass `{ types: [...] }` to filter by type. Returns `null` if no holiday is found before the
 * dataset's last covered year ends.
 *
 * @example
 *   nextHoliday('2026-05-21');
 *   // { date: '2026-06-12', name: 'Independence Day', type: 'regular' }
 */
export function nextHoliday(
  from: string | Date,
  opts: { types?: HolidayType[]; inclusive?: boolean } = {},
): Holiday | null {
  const iso = normalizeDate(from);
  const inclusive = opts.inclusive ?? true;
  const years = supportedYears();
  for (const year of years) {
    for (const h of FILES[year].holidays) {
      if (opts.types && !opts.types.includes(h.type)) continue;
      if (inclusive ? h.date >= iso : h.date > iso) return h;
    }
  }
  return null;
}

/**
 * List the years for which holiday data is bundled.
 */
export function listHolidayYears(): number[] {
  return supportedYears();
}
