/**
 * Formats input into standard US phone format: (###) ###-####
 */
export const formatUSPhone = (value: string): string => {
  let digits = value.replace(/\D/g, '');
  // If user pasted 1-###-###-####, remove leading US country code 1
  if (digits.length > 10 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  if (!digits) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};
