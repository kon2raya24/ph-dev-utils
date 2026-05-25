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

const TL_UNITS = ['sero', 'isa', 'dalawa', 'tatlo', 'apat', 'lima', 'anim', 'pito', 'walo', 'siyam'];
const TL_TEENS = [
  'sampu', 'labing-isa', 'labindalawa', 'labintatlo', 'labing-apat',
  'labinlima', 'labing-anim', 'labimpito', 'labingwalo', 'labinsiyam',
];
const TL_TENS = ['', '', 'dalawampu', 'tatlumpu', 'apatnapu', 'limampu', 'animnapu', 'pitumpu', 'walumpu', 'siyamnapu'];

function tlEndsInVowelOrN(s: string): boolean {
  return /[aeiou]$/i.test(s) || /n$/.test(s) || /ng$/.test(s);
}

function tlAppendUnit(words: string, unit: string): string {
  const parts = words.split(' ');
  const last = parts[parts.length - 1];
  if (/[aeiou]$/i.test(last)) {
    parts[parts.length - 1] = `${last}ng`;
    parts.push(unit);
  } else if (/ng$/.test(last)) {
    parts.push(unit);
  } else if (/n$/.test(last)) {
    parts[parts.length - 1] = `${last}g`;
    parts.push(unit);
  } else {
    parts.push('na', unit);
  }
  return parts.join(' ');
}

function tlUnder100(n: number): string {
  if (n === 0) return '';
  if (n < 10) return TL_UNITS[n];
  if (n < 20) return TL_TEENS[n - 10];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o === 0 ? TL_TENS[t] : `${TL_TENS[t]}'t ${TL_UNITS[o]}`;
}

function tlUnder1000(n: number): string {
  if (n === 0) return '';
  if (n < 100) return tlUnder100(n);
  const h = Math.floor(n / 100);
  const rest = n % 100;
  let hundredsWord: string;
  if (h === 1) {
    hundredsWord = 'isang daan';
  } else if (tlEndsInVowelOrN(TL_UNITS[h])) {
    hundredsWord = `${TL_UNITS[h]}ng daan`;
  } else {
    hundredsWord = `${TL_UNITS[h]} na raan`;
  }
  return rest === 0 ? hundredsWord : `${hundredsWord} ${tlUnder100(rest)}`;
}

function tlIntegerToWords(n: number): string {
  if (n === 0) return 'sero';
  const scales: [number, string][] = [
    [1_000_000_000_000, 'trilyon'],
    [1_000_000_000, 'bilyon'],
    [1_000_000, 'milyon'],
    [1_000, 'libo'],
  ];
  let remainder = n;
  const parts: string[] = [];
  for (const [value, unit] of scales) {
    if (remainder >= value) {
      const count = Math.floor(remainder / value);
      parts.push(tlAppendUnit(tlUnder1000(count), unit));
      remainder %= value;
    }
  }
  if (remainder > 0) parts.push(tlUnder1000(remainder));
  return parts.join(' ');
}

export function pesoToWordsFilipino(value: number): string {
  if (!Number.isFinite(value)) return '';
  if (value < 0) throw new RangeError('pesoToWordsFilipino: negative amounts not supported');
  if (value >= 1_000_000_000_000_000) {
    throw new RangeError('pesoToWordsFilipino: amount too large (max ~999 trilyon)');
  }

  let pesos = Math.floor(value);
  let centavos = Math.round((value - pesos) * 100);
  if (centavos === 100) {
    pesos += 1;
    centavos = 0;
  }

  if (pesos === 0 && centavos === 0) return 'Sero piso';

  const wholeWords = tlIntegerToWords(pesos);
  let result: string;
  if (centavos > 0) {
    const cents = String(centavos).padStart(2, '0');
    result = `${wholeWords} at ${cents}/100 piso`;
  } else {
    result = tlAppendUnit(wholeWords, 'piso');
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
}
