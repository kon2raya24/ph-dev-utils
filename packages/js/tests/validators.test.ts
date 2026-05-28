import { describe, it, expect } from 'vitest';
import { validateTIN, formatTIN } from '../src/validators/tin';
import { validateSSS, formatSSS } from '../src/validators/sss';
import { validatePhilHealth, formatPhilHealth } from '../src/validators/philhealth';
import { validatePagIBIG, formatPagIBIG } from '../src/validators/pagibig';
import { validateNationalID, formatNationalID } from '../src/validators/national-id';
import { validateUMID, formatUMID } from '../src/validators/umid';
import { validatePassport, formatPassport } from '../src/validators/passport';
import { validatePRC, formatPRC } from '../src/validators/prc';

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

describe('National ID (PhilSys PCN)', () => {
  it('accepts 16-digit PCN', () => {
    expect(validateNationalID('1234-5678-9012-3456')).toBe(true);
    expect(formatNationalID('1234567890123456')).toBe('1234-5678-9012-3456');
  });
  it('rejects the 12-digit PSN length', () => {
    expect(validateNationalID('123456789012')).toBe(false);
    expect(formatNationalID('123456789012')).toBeNull();
  });
});

describe('UMID CRN', () => {
  it('accepts 12-digit CRN', () => {
    expect(validateUMID('1234-5678901-2')).toBe(true);
    expect(formatUMID('123456789012')).toBe('1234-5678901-2');
  });
  it('rejects wrong length', () => {
    expect(validateUMID('12345')).toBe(false);
    expect(formatUMID('12345')).toBeNull();
  });
});

describe('Passport', () => {
  it('accepts ePassport (L + 7 digits + L)', () => {
    expect(validatePassport('P1234567A')).toBe(true);
    expect(formatPassport('p1234567a')).toBe('P1234567A');
  });
  it('accepts older MRP (2 letters + 7 digits)', () => {
    expect(validatePassport('XX1234567')).toBe(true);
    expect(formatPassport('xx1234567')).toBe('XX1234567');
  });
  it('rejects bad shapes', () => {
    expect(validatePassport('1234567')).toBe(false);
    expect(validatePassport('P123456789')).toBe(false);
    expect(formatPassport('nope')).toBeNull();
  });
});

describe('PRC license', () => {
  it('accepts 7-digit number', () => {
    expect(validatePRC('1234567')).toBe(true);
    expect(formatPRC('123-4567')).toBe('1234567');
  });
  it('rejects wrong length', () => {
    expect(validatePRC('123456')).toBe(false);
    expect(formatPRC('12345678')).toBeNull();
  });
});
