# ph-dev-utils

[![npm version](https://img.shields.io/npm/v/@ph-dev-utils/core?label=npm&color=cb3837&logo=npm)](https://www.npmjs.com/package/@ph-dev-utils/core)
[![Packagist version](https://img.shields.io/packagist/v/phdevutils/core?label=Packagist&color=f28d1a&logo=packagist&logoColor=white)](https://packagist.org/packages/phdevutils/core)
[![CI](https://github.com/kon2raya24/ph-dev-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/kon2raya24/ph-dev-utils/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made in PH](https://img.shields.io/badge/made%20in-🇵🇭%20Philippines-0038A8)](https://github.com/kon2raya24)

Filipino developer utilities — peso formatting, government ID validators, PH phone helpers, and address data — for both JavaScript/TypeScript and PHP.

Part of the `@ph-dev-utils` family: **[ph-payroll](https://github.com/kon2raya24/ph-payroll)** (SSS/PhilHealth/Pag-IBIG/BIR WT — [live demo](https://ph-payroll-demo.vercel.app)) and **[ph-faker](https://github.com/kon2raya24/ph-faker)** (PH fake data).

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
| Peso formatting | `formatPHP`, `parsePHP`, `pesoToWords`, **`pesoToWordsFilipino`** (v0.3) | `Peso::format`, `Peso::parse`, `Peso::toWords`, **`Peso::toWordsFilipino`** (v0.3) |
| TIN | `validateTIN`, `formatTIN` | `Validators\Tin::validate`, `Validators\Tin::format` |
| SSS | `validateSSS`, `formatSSS` | `Validators\Sss::validate`, `Validators\Sss::format` |
| PhilHealth | `validatePhilHealth`, `formatPhilHealth` | `Validators\PhilHealth::validate`, `Validators\PhilHealth::format` |
| PagIBIG | `validatePagIBIG`, `formatPagIBIG` | `Validators\PagIbig::validate`, `Validators\PagIbig::format` |
| **National ID / PhilSys PCN** (v0.4) | `validateNationalID`, `formatNationalID` | `Validators\NationalId::validate`, `Validators\NationalId::format` |
| **UMID CRN** (v0.4) | `validateUMID`, `formatUMID` | `Validators\Umid::validate`, `Validators\Umid::format` |
| **Passport** (v0.4) | `validatePassport`, `formatPassport` | `Validators\Passport::validate`, `Validators\Passport::format` |
| **PRC license** (v0.4) | `validatePRC`, `formatPRC` | `Validators\Prc::validate`, `Validators\Prc::format` |
| **Driver's license** (v0.5) | `validateDriversLicense`, `formatDriversLicense` | `Validators\DriversLicense::validate`, `Validators\DriversLicense::format` |
| **Plate number** (v0.5) | `validatePlate`, `parsePlate` (→ `car`/`motorcycle`) | `Validators\Plate::validate`, `Validators\Plate::parse` |
| Phone | `parseMobile`, `parseLandline`, **`toE164`**, **`toNational`** (v0.4) | `Phone::parseMobile`, `Phone::parseLandline`, **`Phone::toE164`**, **`Phone::toNational`** |
| Address (regions/provinces) | `listRegions`, `listProvinces`, `findProvince` | `Address::listRegions`, `Address::listProvinces`, `Address::findProvince` |
| **Cities & municipalities** (v0.2) | `listCitiesMunicipalities`, `findCityMunicipality` | `Address::listCitiesMunicipalities`, `Address::findCityMunicipality` |
| **PH holidays** (v0.2) | `isHoliday`, `findHoliday`, `nextHoliday`, `listHolidaysOfYear`, `PAY_MULTIPLIER` | `Holidays::isHoliday`, `Holidays::findHoliday`, `Holidays::nextHoliday`, `Holidays::listHolidaysOfYear`, `Holidays::PAY_MULTIPLIER` |

## Roadmap

- **v0.1** ✅ Peso, government ID validators (format-level), phone normalize + network detect, regions + provinces
- **v0.2** ✅ PSGC cities/municipalities (1,634 entries), PH holidays calendar for 2025–2026 with DOLE pay multipliers
- **v0.3** ✅ Tagalog `pesoToWordsFilipino` (check/receipt convention with full ligature handling)
- **v0.4** ✅ More ID validators (PhilSys National ID / UMID CRN / passport / PRC, all format-level) + phone `toE164` / `toNational` normalization
- **v0.5** LTO plate numbers & driver's license validators (format sprawl — needs its own verification pass)
- **separate package** PH bank registry (BSP-issued PESONet/InstaPay) — moving out of core into a dedicated `ph-banks` package to keep core lean; accuracy-sensitive, needs careful curation
- **separate package** PSGC barangays — shipped as `@ph-dev-utils/psgc-barangays` (size; ~42k entries)
- **vNext** Holidays beyond 2026 as Office of the President issues new annual proclamations

Note: SSS / PhilHealth / Pag-IBIG contribution calculators and BIR withholding tax are now shipped in the sibling package **[ph-payroll](https://github.com/kon2raya24/ph-payroll)** — see the [live demo](https://ph-payroll-demo.vercel.app).

## Contributing

PRs welcome — especially:
- Corrections to network-prefix data (telco prefix reassignments happen)
- PSGC updates when PSA publishes new codes
- Other regional translations of peso-to-words (Filipino ✅ v0.3, English ✅ v0.1 — Cebuano/Ilocano welcome)

## License

MIT
