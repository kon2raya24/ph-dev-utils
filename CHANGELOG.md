# Changelog

All notable changes to this project will be documented in this file. The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.3.0] - 2026-05-25

### Added

- **Tagalog `pesoToWords`** — `pesoToWordsFilipino(value)` (JS) and `PhDevUtils\Peso::toWordsFilipino($value)` (PHP). Converts peso amounts to Filipino number-words using check/receipt convention: `12345.67` → `"Labindalawang libo tatlong daan apatnapu't lima at 67/100 piso"`. Handles ligature rules correctly (vowel → `-ng` suffix, ends in `n` → `-g` suffix, ends in `ng` → no change, else → ` na ` word linker), the `daan`/`raan` initial-consonant alternation in hundreds (e.g., `apat na raan` vs `tatlong daan`), and the centavo fraction format common on PH checks. Supports `sero` through `trilyon` (10^12).
- 14 new vitest + 10 new PHPUnit tests covering zero, single units, teens/tens, hundreds (with both ligature variants), thousands-through-billions, the user-provided worked example, centavos-only amounts, floating-point safety (0.999 → 1 piso), and rejection of negative / too-large inputs. **Totals: 73 JS + 62 PHP = 135 tests green.**

### Notes

- The existing English `pesoToWords` (v0.1+) is unchanged. The new Filipino function is a separate export to avoid breaking existing call sites.
- BSP bank registry is **deferred to v0.4** — bank-data curation needs a dedicated pass to verify SWIFT codes against the BSP Directory of Banks; rushing it would risk shipping wrong PH data.

## [0.2.0] - 2026-05-21

### Added

- **PH holidays** — `isHoliday`, `findHoliday`, `nextHoliday`, `listHolidaysOfYear`, `listHolidayYears`, `PAY_MULTIPLIER` (JS) and `PhDevUtils\Holidays::*` (PHP). Bundled data for 2025 (Proclamation 727 + Islamic holiday proclamations) and 2026 (Proclamation 1006 + Eid'l Fitr Proclamation 1189). Each entry tagged with type — `regular` / `special_non_working` / `special_working` — and the DOLE pay multiplier (200% / 130% / 100%) is exposed for direct use in payroll math.
- **PSGC cities and municipalities** — `listCitiesMunicipalities`, `findCityMunicipality` (JS) and `Address::listCitiesMunicipalities`, `Address::findCityMunicipality` (PHP). Full PSA Q4 2024 dataset: 1,634 entries (146 cities + 1,488 municipalities), with filters by province / region / isCity / isCapital. Name lookup normalizes both "City of X" (PSA's stored form) and "X City" (common spelling).
- New versioned data files: `data/holidays-2025.json`, `data/holidays-2026.json`, `data/psgc-cities-municipalities-2024.json`. Each with `_meta` (source, source_url, verified_on, notes).
- 29 new vitest + 24 new PHPUnit tests covering year-supported assertions, type filters, prefix/suffix name normalization, HUC/NCR null-province handling, and boundary cases. **Totals: 63 JS + 52 PHP = 115 tests green.**

### Notes

- PH holidays are proclaimed annually by the Office of the President. Future years are added per package release; pin your dependency if you need a specific year's official list.
- Eid'l Adha 2026 has not yet been formally proclaimed (as of 2026-05-21). When proclaimed (typically late May / early June), the data file will be updated in a patch release.

## [0.1.3] - 2026-05-19

### Added

- Full API Reference section in both per-package READMEs. Every public function/class documented with signature, parameters, return type, examples, and edge cases.
- Cross-language modules table mapping JS ↔ PHP equivalents.

### Changed

- No functional changes — documentation only.

## [0.1.2] - 2026-05-19

### Added

- Per-package READMEs at `packages/js/README.md` and `packages/php/README.md`. Previously the npm and Packagist package pages had no description ("No README data found"); now they show full install + usage docs.
- README badges (npm version, Packagist version, MIT license, Made in PH) on root + per-package READMEs.

### Changed

- No functional changes — pure polish for discoverability on registry pages.

## [0.1.1] - 2026-05-19

### Fixed

- **Critical npm install fix.** v0.1.0 published with `dist/*.js` importing `../../../data/*.json` (a monorepo-relative path that doesn't ship in the tarball). Real installs broke at runtime with `ERR_MODULE_NOT_FOUND`. Data files are now bundled under `data/` inside the package, and imports rewired to `../data/`. PHP side was never affected (uses runtime `DataLoader` + split-mirror data bundle).

v0.1.0 deprecated on npm — please upgrade to 0.1.1+.

## [0.1.0] - 2026-05-19

Initial release. Filipino developer utilities for JS and PHP.

### Added

- `@ph-dev-utils/core` (npm) and `phdevutils/core` (Composer) packages.
- **Peso:** `formatPHP`, `parsePHP`, `pesoToWords`.
- **Government ID validators:** `validateTIN` / `formatTIN`, `validateSSS` / `formatSSS`, `validatePhilHealth` / `formatPhilHealth`, `validatePagIBIG` / `formatPagIBIG`. Format-level only; no reverse-engineered checksums.
- **Phone:** `parseMobile` with Globe / Smart / Sun / DITO network detection; `parseLandline` with PH area code lookup.
- **Address:** `listRegions`, `findRegion`, `listProvinces`, `findProvince` — 17 regions, ~80 provinces.

### Verification

- JS: 34 vitest tests pass.
- PHP: 25 PHPUnit tests pass.

[Unreleased]: https://github.com/kon2raya24/ph-dev-utils/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/kon2raya24/ph-dev-utils/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/kon2raya24/ph-dev-utils/releases/tag/v0.1.0
