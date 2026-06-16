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
