/**
 * Validate Philippine phone number format
 * @param phone - Phone number to validate
 */
export function validatePHPhone(phone: string): boolean {
  // Formats: 09XX XXX XXXX, +639XX XXX XXXX, 639XX XXX XXXX
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const phPhoneRegex = /^(\+63|63|0)9\d{9}$/;
  return phPhoneRegex.test(cleaned);
}

/**
 * Validate Philippine ZIP code (4 digits)
 */
export function validatePHZip(zip: string): boolean {
  return /^\d{4}$/.test(zip);
}

/**
 * Validate Philippine TIN (Tax Identification Number)
 */
export function validatePHTIN(tin: string): boolean {
  const cleaned = tin.replace(/[\s\-]/g, '');
  return /^\d{12,15}$/.test(cleaned);
}
