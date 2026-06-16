/**
 * Generate a Philippine-style ID number
 * @param prefix - Prefix for the ID (e.g., 'PH', 'ID')
 * @param length - Total length (excluding prefix)
 */
export function generatePHId(prefix: string = 'PH', length: number = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix + '-';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a transaction reference number
 */
export function generateTransactionRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TXN-${timestamp}-${random}`;
}
