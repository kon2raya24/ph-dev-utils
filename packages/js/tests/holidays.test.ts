import { describe, it, expect } from 'vitest';
import {
  isHoliday,
  findHoliday,
  nextHoliday,
  listHolidaysOfYear,
  listHolidayYears,
  PAY_MULTIPLIER,
} from '../src/index.js';

describe('listHolidayYears', () => {
  it('returns sorted years', () => {
    expect(listHolidayYears()).toEqual([2025, 2026]);
  });
});

describe('listHolidaysOfYear', () => {
  it('returns 2026 holidays', () => {
    const holidays = listHolidaysOfYear(2026);
    expect(holidays.length).toBeGreaterThanOrEqual(20);
    expect(holidays[0].date).toBe('2026-01-01');
    expect(holidays[0].name).toBe("New Year's Day");
  });

  it('throws RangeError for unsupported year', () => {
    expect(() => listHolidaysOfYear(2030)).toThrow(RangeError);
  });
});

describe('findHoliday', () => {
  it('returns Christmas Day for 2026-12-25', () => {
    const h = findHoliday('2026-12-25');
    expect(h).not.toBeNull();
    expect(h!.name).toBe('Christmas Day');
    expect(h!.type).toBe('regular');
  });

  it('returns null for non-holiday date', () => {
    expect(findHoliday('2026-05-21')).toBeNull();
  });

  it('returns null for year outside bundled dataset (no throw)', () => {
    expect(findHoliday('2030-12-25')).toBeNull();
  });

  it('accepts Date instance', () => {
    const h = findHoliday(new Date(2026, 11, 25));
    expect(h?.name).toBe('Christmas Day');
  });

  it('rejects malformed string', () => {
    expect(() => findHoliday('12/25/2026')).toThrow(TypeError);
  });

  it('finds Eid\'l Fitr 2026 with proclamation metadata', () => {
    const h = findHoliday('2026-03-20');
    expect(h?.proclamation).toBe('1189');
  });
});

describe('isHoliday', () => {
  it('true for any-type holiday by default', () => {
    expect(isHoliday('2026-12-25')).toBe(true);
    expect(isHoliday('2026-02-25')).toBe(true); // special_working
  });

  it('false for non-holiday', () => {
    expect(isHoliday('2026-05-21')).toBe(false);
  });

  it('filters by type — "paid day off" check', () => {
    expect(
      isHoliday('2026-02-25', { types: ['regular', 'special_non_working'] }),
    ).toBe(false); // EDSA is special_working, NOT a paid day off
    expect(
      isHoliday('2026-12-25', { types: ['regular', 'special_non_working'] }),
    ).toBe(true);
  });
});

describe('nextHoliday', () => {
  it('returns Independence Day for 2026-05-21 by default', () => {
    const h = nextHoliday('2026-05-21');
    expect(h?.date).toBe('2026-06-12');
    expect(h?.name).toBe('Independence Day');
  });

  it('inclusive: true (default) — returns the date itself if holiday', () => {
    const h = nextHoliday('2026-12-25');
    expect(h?.date).toBe('2026-12-25');
  });

  it('inclusive: false — returns the next holiday after', () => {
    const h = nextHoliday('2026-12-25', { inclusive: false });
    expect(h?.date).toBe('2026-12-30');
  });

  it('filters by type', () => {
    // After EDSA (special_working on 2026-02-25), next regular is Eid'l Fitr (2026-03-20)
    const h = nextHoliday('2026-02-26', { types: ['regular'] });
    expect(h?.date).toBe('2026-03-20');
  });

  it('returns null when no holiday found in dataset', () => {
    const h = nextHoliday('2027-01-01'); // beyond bundled data
    expect(h).toBeNull();
  });

  it('crosses year boundary', () => {
    const h = nextHoliday('2025-12-31', { inclusive: false });
    expect(h?.date).toBe('2026-01-01');
  });
});

describe('PAY_MULTIPLIER', () => {
  it('encodes DOLE multipliers', () => {
    expect(PAY_MULTIPLIER.regular).toBe(2.0);
    expect(PAY_MULTIPLIER.special_non_working).toBe(1.3);
    expect(PAY_MULTIPLIER.special_working).toBe(1.0);
  });
});
