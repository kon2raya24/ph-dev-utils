export interface FormatOptions {
  decimals?: number;
  symbol?: 'peso' | 'php' | 'none';
}

export function formatPHP(value: number, opts: FormatOptions = {}): string {
  const decimals = opts.decimals ?? 2;
  const symbol = opts.symbol ?? 'peso';

  if (!Number.isFinite(value)) return '';

  const fixed = Math.abs(value).toFixed(decimals);
  const [whole, frac] = fixed.split('.');
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const body = frac ? `${withCommas}.${frac}` : withCommas;
  const sign = value < 0 ? '-' : '';

  if (symbol === 'php') return `${sign}PHP ${body}`;
  if (symbol === 'none') return `${sign}${body}`;
  return `${sign}₱${body}`;
}

export function parsePHP(input: string): number | null {
  if (typeof input !== 'string') return null;
  const cleaned = input.replace(/[₱]|PHP|php|\s|,/g, '');
  if (cleaned === '' || cleaned === '-') return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

const ONES = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function under1000(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100) {
    const t = Math.floor(n / 10);
    const o = n % 10;
    return o ? `${TENS[t]}-${ONES[o]}` : TENS[t];
  }
  const h = Math.floor(n / 100);
  const r = n % 100;
  return r ? `${ONES[h]} hundred ${under1000(r)}` : `${ONES[h]} hundred`;
}

function wholeToWords(n: number): string {
  if (n === 0) return 'zero';
  const parts: string[] = [];
  const scales: [number, string][] = [
    [1_000_000_000, 'billion'],
    [1_000_000, 'million'],
    [1_000, 'thousand']
  ];
  let remainder = n;
  for (const [value, label] of scales) {
    if (remainder >= value) {
      const count = Math.floor(remainder / value);
      parts.push(`${under1000(count)} ${label}`);
      remainder %= value;
    }
  }
  if (remainder > 0) parts.push(under1000(remainder));
  return parts.join(' ');
}

export function pesoToWords(value: number): string {
  if (!Number.isFinite(value)) return '';
  const negative = value < 0;
  const abs = Math.abs(value);
  const whole = Math.floor(abs);
  const centavos = Math.round((abs - whole) * 100);

  const pesoLabel = whole === 1 ? 'peso' : 'pesos';
  const centLabel = centavos === 1 ? 'centavo' : 'centavos';

  let out = `${wholeToWords(whole)} ${pesoLabel}`;
  if (centavos > 0) out += ` and ${wholeToWords(centavos)} ${centLabel}`;
  return negative ? `negative ${out}` : out;
}
