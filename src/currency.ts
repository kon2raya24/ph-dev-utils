
// Type exports for consumers
// Add specific types as needed
/**
 * Format amount as Philippine Peso
 * @param amount - The amount to format
 * @returns Formatted PHP string
 */
export function formatPHPeso(amount: number): string {
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
  return Math.round(usd * rate * 100) / 100;
}
