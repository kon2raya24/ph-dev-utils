import { formatPHDate, utcToPH } from '../src';

describe('Date Utils', () => {
  test('formatPHDate formats correctly', () => {
    const date = new Date('2026-01-15T00:00:00Z');
    const result = formatPHDate(date);
    expect(result).toContain('2026');
  });

  test('utcToPH adds 8 hours', () => {
    const utc = new Date('2026-01-15T00:00:00Z');
    const ph = utcToPH(utc);
    expect(ph.getHours()).toBe(8);
  });
});
