# ph-dev-utils

[![CI](https://github.com/kon2raya24/ph-dev-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/kon2raya24/ph-dev-utils/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Filipino developer utilities — peso formatting, government ID validators, PH phone helpers, and address data — for both JavaScript/TypeScript and PHP.

```
ph-dev-utils/
├── packages/
│   ├── js/      # @ph-dev-utils/core (npm)
│   └── php/     # phdevutils/core (Composer)
└── data/        # Shared JSON: regions, provinces, network prefixes
```

## Why

Every Filipino dev rebuilds the same helpers — peso formatting, TIN validation, mobile prefix lookup, region/province pickers. This is one place to pull them from, with parity between JS and PHP so backend + frontend agree.

## Install

**JavaScript / TypeScript**

```bash
npm install @ph-dev-utils/core
```

**PHP**

```bash
composer require phdevutils/core
```

## Quick start

**JS**

```ts
import { formatPHP, validateTIN, parseMobile, findProvince } from '@ph-dev-utils/core';

formatPHP(1234.5);              // "₱1,234.50"
validateTIN('123-456-789-000'); // true
parseMobile('09171234567');     // { e164: '+639171234567', network: 'Globe' }
findProvince('Cebu');           // { code: '0722', name: 'Cebu', region: '07' }
```

**PHP**

```php
use PhDevUtils\Peso;
use PhDevUtils\Validators\Tin;
use PhDevUtils\Phone;
use PhDevUtils\Address;

Peso::format(1234.5);                  // "₱1,234.50"
Tin::validate('123-456-789-000');      // true
Phone::parseMobile('09171234567');     // ['e164' => '+639171234567', 'network' => 'Globe']
Address::findProvince('Cebu');         // ['code' => '0722', 'name' => 'Cebu', 'region' => '07']
```

## Modules

| Module | JS | PHP |
| --- | --- | --- |
| Peso formatting | `formatPHP`, `parsePHP`, `pesoToWords` | `Peso::format`, `Peso::parse`, `Peso::toWords` |
| TIN | `validateTIN`, `formatTIN` | `Validators\Tin::validate`, `Validators\Tin::format` |
| SSS | `validateSSS`, `formatSSS` | `Validators\Sss::validate`, `Validators\Sss::format` |
| PhilHealth | `validatePhilHealth`, `formatPhilHealth` | `Validators\PhilHealth::validate`, `Validators\PhilHealth::format` |
| PagIBIG | `validatePagIBIG`, `formatPagIBIG` | `Validators\PagIbig::validate`, `Validators\PagIbig::format` |
| Phone | `parseMobile`, `parseLandline` | `Phone::parseMobile`, `Phone::parseLandline` |
| Address | `listRegions`, `listProvinces`, `findProvince` | `Address::listRegions`, `Address::listProvinces`, `Address::findProvince` |

## Roadmap

- **v0.1** Peso, government ID validators (format-level), phone normalize + network detect, regions + provinces
- **v0.2** Cities/municipalities + barangays (PSGC import), PH holidays calendar
- **v0.3** SSS / PhilHealth / Pag-IBIG contribution calculators, withholding tax, BIR Form 2316 helpers

## Contributing

PRs welcome — especially:
- Corrections to network-prefix data (telco prefix reassignments happen)
- PSGC updates when PSA publishes new codes
- Translations of `pesoToWords` (currently English; Filipino/Tagalog welcome)

## License

MIT
