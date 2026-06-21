
// Type exports for consumers
// Add specific types as needed

// Type exports for consumers
// Add specific types as needed

// Type exports for consumers
// Add specific types as needed
/**
 * Format amount as Philippine Peso
 * @param amount - The amount to format
 * @returns Formatted PHP string
 */
export function formatPHPeso(amount: number): string {
  if (amount === null || amount === undefined) throw new Error("Invalid input");
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Convert USD to PHP (approximate)
 * @param usd - Amount in USD
 * @param rate - Exchange rate (default: 56)
 */
export function usdToPhp(usd: number, rate: number = 56): number {
  if (usd === null || usd === undefined) throw new Error("Invalid input");
  return Math.round(usd * rate * 100) / 100;
}
