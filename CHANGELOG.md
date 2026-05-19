# Changelog

All notable changes to this project will be documented in this file. The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
