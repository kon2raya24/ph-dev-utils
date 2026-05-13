import { describe, it, expect } from 'vitest';
import { parseMobile, parseLandline } from '../src/phone';

describe('parseMobile', () => {
  it('parses 09 prefix', () => {
    const r = parseMobile('09171234567');
    expect(r).not.toBeNull();
    expect(r!.e164).toBe('+639171234567');
    expect(r!.network).toBe('Globe');
  });
  it('parses +63 prefix', () => {
    const r = parseMobile('+63 917 123 4567');
    expect(r!.e164).toBe('+639171234567');
  });
  it('parses 63 prefix without plus', () => {
    expect(parseMobile('639171234567')!.e164).toBe('+639171234567');
  });
  it('detects Smart prefix', () => {
    expect(parseMobile('09181234567')!.network).toBe('Smart');
  });
  it('detects DITO prefix', () => {
    expect(parseMobile('08951234567')!.network).toBe('DITO');
  });
  it('returns null for invalid', () => {
    expect(parseMobile('12345')).toBeNull();
    expect(parseMobile('+1 555 123 4567')).toBeNull();
  });
});

describe('parseLandline', () => {
  it('parses Metro Manila (area 2)', () => {
    const r = parseLandline('(02) 8123-4567');
    expect(r).not.toBeNull();
    expect(r!.areaCode).toBe('2');
    expect(r!.area).toBe('Metro Manila');
  });
  it('parses Cebu (area 32)', () => {
    const r = parseLandline('(032) 123-4567');
    expect(r!.areaCode).toBe('32');
    expect(r!.area).toBe('Cebu');
  });
  it('parses with +63 prefix', () => {
    const r = parseLandline('+632 8123 4567');
    expect(r!.areaCode).toBe('2');
  });
});
