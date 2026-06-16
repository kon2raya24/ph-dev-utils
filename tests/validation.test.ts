import { validatePHPhone, validatePHZip } from '../src';

describe('Validation Utils', () => {
  test('validatePHPhone accepts valid formats', () => {
    expect(validatePHPhone('09171234567')).toBe(true);
    expect(validatePHPhone('+639171234567')).toBe(true);
    expect(validatePHPhone('639171234567')).toBe(true);
    expect(validatePHPhone('0917-123-4567')).toBe(true);
  });

  test('validatePHPhone rejects invalid', () => {
    expect(validatePHPhone('12345')).toBe(false);
    expect(validatePHPhone('08171234567')).toBe(false);
  });

  test('validatePHZip accepts 4 digits', () => {
    expect(validatePHZip('1700')).toBe(true);
    expect(validatePHZip('4100')).toBe(true);
  });

  test('validatePHZip rejects invalid', () => {
    expect(validatePHZip('123')).toBe(false);
    expect(validatePHZip('12345')).toBe(false);
  });
});
