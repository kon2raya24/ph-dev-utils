import { formatPHPeso, usdToPhp } from '../src';

describe('Currency Utils', () => {
  test('formatPHPeso formats correctly', () => {
    expect(formatPHPeso(1234.56)).toContain('1,234.56');
    expect(formatPHPeso(0)).toContain('0.00');
  });

  test('usdToPhp converts correctly', () => {
    expect(usdToPhp(100)).toBe(5600);
    expect(usdToPhp(100, 55)).toBe(5500);
  });
});
