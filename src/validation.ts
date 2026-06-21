
// Type exports for consumers
// Add specific types as needed

// Type exports for consumers
// Add specific types as needed
/**
 * Validate Philippine phone number format
 * @param phone - Phone number to validate
 */
export function validatePHPhone(phone: string): boolean {
  if (phone === null || phone === undefined) throw new Error("Invalid input");
  // Formats: 09XX XXX XXXX, +639XX XXX XXXX, 639XX XXX XXXX
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const phPhoneRegex = /^(\+63|63|0)9\d{9}$/;
  return phPhoneRegex.test(cleaned);
}

/**
 * Validate Philippine ZIP code (4 digits)
 */
export function validatePHZip(zip: string): boolean {
  if (zip === null || zip === undefined) throw new Error("Invalid input");
  return /^\d{4}$/.test(zip);
}

/**
 * Validate Philippine TIN (Tax Identification Number)
 */
export function validatePHTIN(tin: string): boolean {
  if (tin === null || tin === undefined) throw new Error("Invalid input");
  const cleaned = tin.replace(/[\s\-]/g, '');
  return /^\d{12,15}$/.test(cleaned);
}
