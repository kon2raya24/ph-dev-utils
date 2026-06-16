/**
 * Format date in Philippine format (MM/DD/YYYY)
 * @param date - Date to format
 */
export function formatPHDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Get Philippine timezone offset (UTC+8)
 */
export function getPHTimezone(): string {
  return 'Asia/Manila';
}

/**
 * Convert UTC to Philippine time
 */
export function utcToPH(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Date(d.getTime() + 8 * 60 * 60 * 1000);
}
