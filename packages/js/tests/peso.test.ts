import { describe, it, expect } from 'vitest';
import { formatPHP, parsePHP, pesoToWords, pesoToWordsFilipino } from '../src/peso';

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

describe('pesoToWordsFilipino', () => {
  it('zero', () => {
    expect(pesoToWordsFilipino(0)).toBe('Sero piso');
  });
  it('single units', () => {
    expect(pesoToWordsFilipino(1)).toBe('Isang piso');
    expect(pesoToWordsFilipino(2)).toBe('Dalawang piso');
    expect(pesoToWordsFilipino(5)).toBe('Limang piso');
    expect(pesoToWordsFilipino(6)).toBe('Anim na piso');
  });
  it('teens and tens', () => {
    expect(pesoToWordsFilipino(10)).toBe('Sampung piso');
    expect(pesoToWordsFilipino(11)).toBe('Labing-isang piso');
    expect(pesoToWordsFilipino(12)).toBe('Labindalawang piso');
    expect(pesoToWordsFilipino(20)).toBe('Dalawampung piso');
    expect(pesoToWordsFilipino(21)).toBe("Dalawampu't isang piso");
    expect(pesoToWordsFilipino(99)).toBe("Siyamnapu't siyam na piso");
  });
  it('hundreds with ligature variants', () => {
    expect(pesoToWordsFilipino(100)).toBe('Isang daang piso');
    expect(pesoToWordsFilipino(200)).toBe('Dalawang daang piso');
    expect(pesoToWordsFilipino(400)).toBe('Apat na raang piso');
    expect(pesoToWordsFilipino(600)).toBe('Anim na raang piso');
    expect(pesoToWordsFilipino(900)).toBe('Siyam na raang piso');
  });
  it('thousands and beyond', () => {
    expect(pesoToWordsFilipino(1000)).toBe('Isang libong piso');
    expect(pesoToWordsFilipino(10_000)).toBe('Sampung libong piso');
    expect(pesoToWordsFilipino(1_000_000)).toBe('Isang milyong piso');
    expect(pesoToWordsFilipino(1_000_000_000)).toBe('Isang bilyong piso');
  });
  it('user worked example — 12345.67', () => {
    expect(pesoToWordsFilipino(12345.67)).toBe(
      "Labindalawang libo tatlong daan apatnapu't lima at 67/100 piso"
    );
  });
  it('centavos only', () => {
    expect(pesoToWordsFilipino(0.5)).toBe('Sero at 50/100 piso');
    expect(pesoToWordsFilipino(0.05)).toBe('Sero at 05/100 piso');
  });
  it('floating-point safety — 0.999 rounds to 1.00', () => {
    expect(pesoToWordsFilipino(0.999)).toBe('Isang piso');
  });
  it('rejects negative', () => {
    expect(() => pesoToWordsFilipino(-1)).toThrow(RangeError);
  });
  it('rejects amounts too large', () => {
    expect(() => pesoToWordsFilipino(1e15)).toThrow(RangeError);
  });
});
