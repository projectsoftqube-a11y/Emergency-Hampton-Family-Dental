// Shared client-side form validation helpers.
// Each validator returns an error message string, or "" when the value is valid.

export function validateRequired(value: string, label = "This field"): string {
  return value.trim() ? "" : `${label} is required.`;
}

export function validateName(value: string): string {
  if (!value.trim()) return "Please enter your name.";
  if (value.trim().length < 2) return "Please enter a valid name.";
  return "";
}

export function validateEmail(value: string): string {
  if (!value.trim()) return "Please enter your email address.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value.trim()) ? "" : "Please enter a valid email address.";
}

/**
 * US phone: exactly 10 digits.
 *
 * Was `>= 10`, which accepted any longer string of digits. The practice is a
 * single Southampton, PA location taking local calls, so a 10-digit NANP
 * number is the only shape worth accepting - anything longer is a typo or a
 * bot, and both are better caught here than by the office calling a dead line.
 */
export function validatePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "Please enter your phone number.";
  if (digits.length !== 10) return "Please enter a 10-digit phone number.";
  return "";
}

export function validateSelect(value: string, label = "an option"): string {
  return value.trim() ? "" : `Please select ${label}.`;
}

// Returns true when every value in the errors object is an empty string.
export function isValid(errors: Record<string, string>): boolean {
  return Object.values(errors).every((e) => !e);
}
