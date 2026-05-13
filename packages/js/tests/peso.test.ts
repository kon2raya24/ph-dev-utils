import { describe, it, expect } from 'vitest';
import { formatPHP, parsePHP, pesoToWords } from '../src/peso';

describe('formatPHP', () => {
  it('formats with peso sign by default', () => {
    expect(formatPHP(1234.5)).toBe('₱1,234.50');
  });
  it('handles zero', () => {
    expect(formatPHP(0)).toBe('₱0.00');
  });
  it('handles negatives', () => {
    expect(formatPHP(-99.9)).toBe('-₱99.90');
  });
  it('supports PHP prefix', () => {
    expect(formatPHP(1000, { symbol: 'php' })).toBe('PHP 1,000.00');
  });
  it('supports custom decimals', () => {
    expect(formatPHP(1.2345, { decimals: 4 })).toBe('₱1.2345');
  });
});

describe('parsePHP', () => {
  it('parses peso sign', () => {
    expect(parsePHP('₱1,234.50')).toBe(1234.5);
  });
  it('parses PHP prefix', () => {
    expect(parsePHP('PHP 99.00')).toBe(99);
  });
  it('returns null for invalid', () => {
    expect(parsePHP('abc')).toBeNull();
  });
});

describe('pesoToWords', () => {
  it('handles whole pesos', () => {
    expect(pesoToWords(1)).toBe('one peso');
    expect(pesoToWords(25)).toBe('twenty-five pesos');
  });
  it('handles centavos', () => {
    expect(pesoToWords(1.5)).toBe('one peso and fifty centavos');
  });
  it('handles large numbers', () => {
    expect(pesoToWords(1_234_567)).toBe(
      'one million two hundred thirty-four thousand five hundred sixty-seven pesos'
    );
  });
});
