# @ph-dev-utils/core

[![npm version](https://img.shields.io/npm/v/@ph-dev-utils/core?label=npm&color=cb3837&logo=npm)](https://www.npmjs.com/package/@ph-dev-utils/core)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kon2raya24/ph-dev-utils/blob/main/LICENSE)
[![Made in PH](https://img.shields.io/badge/made%20in-🇵🇭%20Philippines-0038A8)](https://github.com/kon2raya24)

Filipino developer utilities for JavaScript / TypeScript — peso formatting, government ID validators (TIN / SSS / PhilHealth / Pag-IBIG), PH phone parsing with network detection, and PSGC region / province lookup.

Need fake test data on top of this? See the sibling [`@ph-dev-utils/faker`](https://www.npmjs.com/package/@ph-dev-utils/faker).

## Install

```bash
npm install @ph-dev-utils/core
```

Requires Node 20+.

## Quick start

```ts
import {
  formatPHP, parsePHP, pesoToWords,
  validateTIN, formatTIN,
  parseMobile, parseLandline,
  findProvince, listRegions,
} from '@ph-dev-utils/core';

formatPHP(1234.5);                  // '₱1,234.50'
parsePHP('₱1,234.50');              // 1234.5
validateTIN('123-456-789-000');     // true
parseMobile('09171234567');         // { e164: '+639171234567', network: 'Globe', ... }
findProvince('Cebu');               // { code: '0722', name: 'Cebu', region: '07' }
```

## API Reference

### Peso

#### `formatPHP(value: number, opts?: FormatOptions): string`

Format a number as a peso amount with thousands separators.

```ts
type FormatOptions = {
  decimals?: number;          // default: 2
  symbol?: 'peso' | 'php' | 'none';  // default: 'peso'
};
```

```ts
formatPHP(1234.5);                            // '₱1,234.50'
formatPHP(1234.5, { decimals: 0 });           // '₱1,235'
formatPHP(1234.5, { symbol: 'php' });         // 'PHP 1,234.50'
formatPHP(1234.5, { symbol: 'none' });        // '1,234.50'
formatPHP(-50);                               // '-₱50.00'
formatPHP(NaN);                               // ''  (non-finite → empty string)
```

#### `parsePHP(input: string): number | null`

Parse a peso-formatted string back to a number. Strips `₱`, `PHP`, whitespace, and commas. Returns `null` for non-strings, empty strings, or unparseable input.

```ts
parsePHP('₱1,234.50');     // 1234.5
parsePHP('PHP 50');        // 50
parsePHP('-1,000');        // -1000
parsePHP('not a number');  // null
parsePHP('');              // null
```

#### `pesoToWords(value: number): string`

Convert a number to its English peso-and-centavos word form. Singular/plural handled (`'1 peso'` vs `'2 pesos'`).

```ts
pesoToWords(1);             // 'one peso'
pesoToWords(1234);          // 'one thousand two hundred thirty-four pesos'
pesoToWords(1234.56);       // 'one thousand two hundred thirty-four pesos and fifty-six centavos'
pesoToWords(-50);           // 'negative fifty pesos'
pesoToWords(0);             // 'zero pesos'
```

#### `pesoToWordsFilipino(value: number): string` (v0.3)

Convert a number to its **Filipino (Tagalog)** peso-and-centavos word form, using the check/receipt convention `[whole-words] at [XX]/100 piso`. Handles ligature rules (`-ng` after vowel, `-g` after `n`, ` na ` before other consonants) and the `daan`/`raan` initial-consonant alternation in hundreds.

```ts
pesoToWordsFilipino(1);            // 'Isang piso'
pesoToWordsFilipino(100);          // 'Isang daang piso'
pesoToWordsFilipino(400);          // 'Apat na raang piso'    (note: na + raan)
pesoToWordsFilipino(1000);         // 'Isang libong piso'
pesoToWordsFilipino(1_000_000);    // 'Isang milyong piso'
pesoToWordsFilipino(12345.67);     // "Labindalawang libo tatlong daan apatnapu't lima at 67/100 piso"
pesoToWordsFilipino(0);            // 'Sero piso'
pesoToWordsFilipino(0.5);          // 'Sero at 50/100 piso'
pesoToWordsFilipino(-1);           // throws RangeError (negatives not supported)
```

Range: `sero` (0) through `trilyon` (10^12). Throws on negative or out-of-range input.

---

### Government ID validators

> ⚠️ All validators are **format-level only**. SSS / PhilHealth / Pag-IBIG do not publish official checksum algorithms; unofficial implementations produce confident-but-wrong results in production. This package returns `true` for any input with the correct digit count.

#### `validateTIN(input: string): boolean`

BIR TIN: 9 digits (individual) or 12 digits (with 3-digit branch code).

```ts
validateTIN('123-456-789');         // true (9-digit individual)
validateTIN('123-456-789-000');     // true (12-digit with branch)
validateTIN('123456789');           // true (digits-only also accepted)
validateTIN('123');                 // false
validateTIN('abc-def-ghi');         // false
```

#### `formatTIN(input: string): string | null`

Returns the canonical formatted form, or `null` if not a valid digit count.

```ts
formatTIN('123456789');        // '123-456-789'
formatTIN('123456789000');     // '123-456-789-000'
formatTIN('123');              // null
```

#### `validateSSS(input: string): boolean`

SSS number: exactly 10 digits.

```ts
validateSSS('12-3456789-0');   // true
validateSSS('1234567890');     // true
validateSSS('123');            // false
```

#### `formatSSS(input: string): string | null`

Formats to `XX-XXXXXXX-X`, or `null` if not 10 digits.

```ts
formatSSS('1234567890');   // '12-3456789-0'
```

#### `validatePhilHealth(input: string): boolean` / `formatPhilHealth(input: string): string | null`

PhilHealth PIN: exactly 12 digits. Formatted as `XX-XXXXXXXXX-X`.

```ts
validatePhilHealth('123456789012');   // true
formatPhilHealth('123456789012');     // '12-345678901-2'
```

#### `validatePagIBIG(input: string): boolean` / `formatPagIBIG(input: string): string | null`

Pag-IBIG MID: exactly 12 digits. Formatted as `XXXX-XXXX-XXXX`.

```ts
validatePagIBIG('123456789012');   // true
formatPagIBIG('123456789012');     // '1234-5678-9012'
```

---

### Phone

#### `parseMobile(input: string): MobileParse | null`

Parse a PH mobile number into a normalized form with network detection. Accepts `+63...`, `63...`, `09...`, and `9...` forms.

```ts
interface MobileParse {
  e164: string;       // '+63XXXXXXXXXX'
  national: string;   // '0XXXXXXXXXX'
  network: 'Globe' | 'Smart' | 'Sun' | 'DITO' | null;
}
```

```ts
parseMobile('09171234567');
// { e164: '+639171234567', national: '09171234567', network: 'Globe' }

parseMobile('+639951234567');
// { e164: '+639951234567', national: '09951234567', network: 'DITO' }

parseMobile('not a phone');   // null
parseMobile('09xxxxxxxxx');   // null
```

Returns `null` for non-strings or any input that doesn't normalize to an 11-digit PH mobile starting with `08` (DITO) or `09` (Globe / Smart / Sun / DITO).

#### `parseLandline(input: string): LandlineParse | null`

Parse a PH landline number with area code lookup.

```ts
interface LandlineParse {
  e164: string;       // '+63XXXXXXXXXX'
  national: string;   // '(0X) XXX-XXXX' or '(0XX) XXX-XXXX'
  areaCode: string;   // '2', '32', '74', etc.
  area: string | null;  // 'Metro Manila', 'Cebu', etc.
}
```

```ts
parseLandline('(02) 8123-4567');
// { e164: '+6328123-4567', national: '(02) 8123-4567', areaCode: '2', area: 'Metro Manila' }

parseLandline('322345678');
// { e164: '+63322345678', national: '(032) 234-5678', areaCode: '32', area: 'Cebu' }

parseLandline('12345');   // null
```

---

### Address (PSGC regions + provinces)

Region and province data follows the [Philippine Standard Geographic Code](https://psa.gov.ph/classification/psgc) at v0.1 granularity (regions + provinces). Cities, municipalities, and barangays are on the v0.2 roadmap.

#### `listRegions(): Region[]`

Returns all 17 PH regions.

```ts
interface Region {
  code: string;          // e.g. '04', '13'
  name: string;          // e.g. 'CALABARZON', 'National Capital Region'
  designation: string;   // e.g. 'Region IV-A', 'NCR'
}
```

```ts
listRegions().length;   // 17
listRegions()[0];       // { code: '01', name: 'Ilocos Region', designation: 'Region I' }
```

#### `findRegion(query: string): Region | null`

Look up a region by code, name, or designation (case-insensitive).

```ts
findRegion('NCR');                            // { code: '13', name: 'National Capital Region', ... }
findRegion('04');                             // { code: '04', name: 'CALABARZON', ... }
findRegion('calabarzon');                     // { code: '04', name: 'CALABARZON', ... }
findRegion('National Capital Region');        // { code: '13', ... }
findRegion('Region IV-A');                    // { code: '04', ... }
findRegion('Atlantis');                       // null
```

#### `listProvinces(regionCode?: string): Province[]`

Returns provinces, optionally filtered by region code.

```ts
interface Province {
  code: string;     // 4-digit PSGC code, e.g. '0434'
  name: string;     // e.g. 'Cavite'
  region: string;   // parent region code, e.g. '04'
}
```

```ts
listProvinces().length;          // ~80
listProvinces('04').length;      // CALABARZON provinces only
listProvinces('04');             // [{ code: '0420', name: 'Batangas', region: '04' }, ...]
```

#### `findProvince(query: string): Province | null`

Look up a province by code or name (case-insensitive).

```ts
findProvince('Cebu');     // { code: '0722', name: 'Cebu', region: '07' }
findProvince('0722');     // same
findProvince('cebu');     // same (case-insensitive)
findProvince('Atlantis'); // null
```

---

## Modules table

Direct mapping to the PHP sibling package:

| Capability | JS | PHP |
| --- | --- | --- |
| Format peso | `formatPHP(n)` | `Peso::format($n)` |
| Parse peso | `parsePHP(s)` | `Peso::parse($s)` |
| Peso to words (English) | `pesoToWords(n)` | `Peso::toWords($n)` |
| Peso to words (Filipino) | `pesoToWordsFilipino(n)` | `Peso::toWordsFilipino($n)` |
| Validate TIN | `validateTIN(s)` | `Validators\Tin::validate($s)` |
| Validate SSS | `validateSSS(s)` | `Validators\Sss::validate($s)` |
| Validate PhilHealth | `validatePhilHealth(s)` | `Validators\PhilHealth::validate($s)` |
| Validate Pag-IBIG | `validatePagIBIG(s)` | `Validators\PagIbig::validate($s)` |
| Parse mobile | `parseMobile(s)` | `Phone::parseMobile($s)` |
| Parse landline | `parseLandline(s)` | `Phone::parseLandline($s)` |
| List regions | `listRegions()` | `Address::listRegions()` |
| Find region | `findRegion(q)` | `Address::findRegion($q)` |
| List provinces | `listProvinces(code?)` | `Address::listProvinces($code = null)` |
| Find province | `findProvince(q)` | `Address::findProvince($q)` |

## License

MIT
