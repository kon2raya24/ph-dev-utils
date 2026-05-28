# Changelog

All notable changes to this project will be documented in this file. The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.4.0] - 2026-05-28

### Added

- **More government-ID validators** (all format-level only, no checksum — consistent with the existing TIN/SSS/PhilHealth/Pag-IBIG stance):
  - **PhilSys National ID** — `validateNationalID` / `formatNationalID` (JS), `Validators\NationalId::validate` / `::format` (PHP). Validates the **16-digit PhilSys Card Number (PCN)** printed on the PhilID, formatted `XXXX-XXXX-XXXX-XXXX`. Deliberately does **not** validate the 12-digit PhilSys Number (PSN), which is never disclosed — a 12-digit input is rejected.
  - **UMID CRN** — `validateUMID` / `formatUMID` (JS), `Validators\Umid::*` (PHP). 12-digit Common Reference Number, formatted `####-#######-#`.
  - **Passport** — `validatePassport` / `formatPassport` (JS), `Validators\Passport::*` (PHP). Accepts both current 9-character forms: ePassport (`L` + 7 digits + `L`, e.g. `P1234567A`) and the 2005–2016 machine-readable form (2 letters + 7 digits). Case-insensitive input; normalizes to uppercase.
  - **PRC license** — `validatePRC` / `formatPRC` (JS), `Validators\Prc::*` (PHP). 7-digit professional registration number.
- **Phone E.164 / national normalization** — `toE164` and `toNational` (JS), `Phone::toE164` / `Phone::toNational` (PHP). Convert any recognized PH mobile or landline (`+63` / `63` / `0` / formatted forms) to canonical `+63…` or `0…`; return `null` when unparseable. Built on the existing `parseMobile` / `parseLandline`.
- New tests covering each ID's valid/invalid shapes and the phone normalizers across mobile + landline + all trunk forms.

### Notes

- Each format was verified against an authoritative source before locking (PSA/PhilSys for the PCN, SSS for the UMID CRN, DFA for passport patterns, PRC for the registration number).
- **BSP bank registry** (previously the v0.4 roadmap item) is being moved out of core into a dedicated `ph-banks` package rather than bundled here — keeps core lean and isolates the accuracy-sensitive bank/SWIFT curation.
- LTO plate numbers and driver's license validators are deferred to v0.5 (their format variants need a separate verification pass).

## [0.3.1] - 2026-05-25

### Fixed

- **`findCityMunicipality` name-ambiguity bug.** Previously the function did a single iteration that matched on code, exact name, or normalized name in the same pass — and the normalizer fired first whenever the iteration reached an earlier match. As a result, `findCityMunicipality('Quezon City')` returned the "Quezon" *municipality* in Cagayan Valley (region '02') because its normalized name "quezon" matched before the literal NCR entry "Quezon City" was reached. The lookup is now a two-pass scan: exact code/name first, normalized fallback second. Discovered while writing cross-package integration tests in [ph-psgc-barangays](https://github.com/kon2raya24/ph-psgc-barangays). Same fix applied in both JS and PHP.
- Regression tests added in both languages for `Quezon City` (137404 / region 13) and `Cebu City` / `City of Cebu` (the normalized-fallback path, which must keep working).

### Notes

- No API surface change; this is a behavioral correctness fix. Any caller that was working around the bug by passing the 6-digit code (e.g. `findCityMunicipality('137404')`) continues to work unchanged.

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
