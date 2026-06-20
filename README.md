
[![npm version](https://img.shields.io/npm/v/ph-dev-utils.svg)](https://www.npmjs.com/package/ph-dev-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/kon2raya24/ph-dev-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/kon2raya24/ph-dev-utils/actions/workflows/ci.yml)
# ph-dev-utils

Philippine developer utilities for Node.js/TypeScript projects.

## Installation

```bash
npm install ph-dev-utils
```

## Features

- 💱 **Currency** — PHP formatting, USD to PHP conversion
- 📅 **Date** — Philippine date formatting, timezone conversion
- ✅ **Validation** — Phone numbers, ZIP codes, TIN validation
- 🆔 **ID Generation** — Philippine-style IDs, transaction refs

## Usage

```typescript
import { formatPHPeso, validatePHPhone, formatPHDate } from 'ph-dev-utils';

formatPHPeso(1234.56); // "₱1,234.56"
validatePHPhone('09171234567'); // true
formatPHDate(new Date()); // "01/15/2026"
```

## License

MIT


## Changelog

### 2026-06-16
- Updated documentation
- Added examples


## Changelog

### 2026-06-16
- Updated documentation
- Added examples


## Changelog

### 2026-06-16
- Updated documentation
- Added examples


## API

See source code and JSDoc comments for full API documentation.
All exported functions include TypeScript types.
