import { describe, it, expect } from 'vitest';
import { validateTIN, formatTIN } from '../src/validators/tin';
import { validateSSS, formatSSS } from '../src/validators/sss';
import { validatePhilHealth, formatPhilHealth } from '../src/validators/philhealth';
import { validatePagIBIG, formatPagIBIG } from '../src/validators/pagibig';

describe('TIN', () => {
  it('accepts 9-digit', () => {
    expect(validateTIN('123-456-789')).toBe(true);
    expect(formatTIN('123456789')).toBe('123-456-789');
  });
  it('accepts 12-digit with branch', () => {
    expect(validateTIN('123-456-789-000')).toBe(true);
    expect(formatTIN('123456789000')).toBe('123-456-789-000');
  });
  it('rejects wrong length', () => {
    expect(validateTIN('12345')).toBe(false);
    expect(formatTIN('12345')).toBeNull();
  });
});

describe('SSS', () => {
  it('accepts 10-digit', () => {
    expect(validateSSS('34-1234567-8')).toBe(true);
    expect(formatSSS('3412345678')).toBe('34-1234567-8');
  });
  it('rejects wrong length', () => {
    expect(validateSSS('123')).toBe(false);
  });
});

describe('PhilHealth', () => {
  it('accepts 12-digit', () => {
    expect(validatePhilHealth('12-345678901-2')).toBe(true);
    expect(formatPhilHealth('123456789012')).toBe('12-345678901-2');
  });
});

describe('PagIBIG', () => {
  it('accepts 12-digit MID', () => {
    expect(validatePagIBIG('1234-5678-9012')).toBe(true);
    expect(formatPagIBIG('123456789012')).toBe('1234-5678-9012');
  });
});
