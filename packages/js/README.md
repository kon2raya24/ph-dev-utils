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

## Usage

```ts
import {
  formatPHP, parsePHP, pesoToWords,
  validateTIN, formatTIN,
  validateSSS, validatePhilHealth, validatePagIBIG,
  parseMobile, parseLandline,
  listRegions, listProvinces, findProvince,
} from '@ph-dev-utils/core';

// Peso
formatPHP(1234.5);                  // '₱1,234.50'
parsePHP('₱1,234.50');              // 1234.5
pesoToWords(1234);                  // 'one thousand two hundred thirty-four pesos'

// Government IDs (format-level only; no reverse-engineered checksums)
validateTIN('123-456-789-000');     // true
formatTIN('123456789');             // '123-456-789'

// Phone
parseMobile('09171234567');
// { e164: '+639171234567', national: '09171234567', network: 'Globe' }

parseLandline('(02) 8123-4567');
// { e164: '+6328123-4567', areaCode: '2', area: 'Metro Manila' }

// Address
findProvince('Cebu');               // { code: '0722', name: 'Cebu', region: '07' }
listProvinces().length;             // ~80
```

See the [project README](https://github.com/kon2raya24/ph-dev-utils#readme) for the full module table, PHP sibling package, and roadmap.

## ⚠️ Important note

Government ID validators are **format-level only**. SSS / PhilHealth / Pag-IBIG do not publish official checksum algorithms; unofficial implementations produce confident-but-wrong results in production. This package will return `true` for any value with the correct digit count.

## License

MIT
