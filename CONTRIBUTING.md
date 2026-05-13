# Contributing to ph-dev-utils

Thanks for your interest — this is exactly the kind of project that only works if Filipino devs help keep the data fresh and accurate.

## What we especially want PRs for

1. **Network prefix corrections.** Globe/Smart/Sun/DITO reassign prefixes. If your number's network isn't detected correctly, please file an issue or PR `data/network-prefixes.json`.
2. **PSGC updates.** When PSA publishes new province/city codes, or when LGU splits happen (e.g. Maguindanao → Maguindanao del Norte + del Sur in 2022), the JSON data needs updating.
3. **Filipino/Tagalog `pesoToWords`.** Currently English only. Filipino translation (e.g. "isang libong piso") is welcome — design proposal first, since the API needs a locale option.
4. **Bug fixes** with a failing test that demonstrates the bug.

## What we won't merge

- Reverse-engineered SSS/PhilHealth/Pag-IBIG checksum algorithms. These aren't published officially; an unofficial implementation will give wrong-but-confident results in production. Format-level validation only.
- Province/city data without a citation to the official PSA PSGC publication.

## Running tests locally

**Prerequisites:** Node 20+, PHP 8.1+, Composer.

### JS package

```bash
cd packages/js
npm install
npm test          # vitest
npm run build     # tsc → dist/
```

### PHP package

```bash
cd packages/php
composer install
vendor/bin/phpunit
```

CI runs both suites on Node 20/22 and PHP 8.1/8.2/8.3 — your PR must be green.

## Project layout

```
ph-dev-utils/
├── data/                       Canonical JSON data (regions, provinces, network prefixes)
├── packages/
│   ├── js/    @ph-dev-utils/core (TypeScript → npm)
│   └── php/   phdevutils/core (Composer)
└── .github/workflows/ci.yml    Matrix test runs
```

Both packages read from `data/` so JS and PHP stay in sync. When you add data, both packages get it automatically — but add tests on both sides.

## API parity

The JS and PHP APIs deliberately mirror each other:

| Capability | JS | PHP |
| --- | --- | --- |
| Format peso | `formatPHP(n)` | `Peso::format($n)` |
| Validate TIN | `validateTIN(s)` | `Validators\Tin::validate($s)` |
| Parse mobile | `parseMobile(s)` | `Phone::parseMobile($s)` |
| Find province | `findProvince(q)` | `Address::findProvince($q)` |

If you add a function to one side, please add the equivalent to the other (or open an issue if you only know one language — we'll pair).

## Commit conventions

No strict commit-message format, but:
- Keep subject under 70 chars
- Explain *why* in the body when behavior changes
- Link to the issue/PSA source for data updates

## License

By contributing, you agree your contribution is licensed under MIT.
