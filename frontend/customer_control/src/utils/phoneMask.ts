/**
 * Aplica máscara de telefone brasileiro
 * Formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export const applyPhoneMask = (value: string): string => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "");

  // Limita a 11 dígitos
  const limitedNumbers = numbers.slice(0, 11);

  // Aplica a máscara conforme o tamanho
  if (limitedNumbers.length <= 2) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 6) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
  } else if (limitedNumbers.length <= 10) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(
      2,
      6
    )}-${limitedNumbers.slice(6)}`;
  } else {
    // 11 dígitos - celular
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(
      2,
      7
    )}-${limitedNumbers.slice(7, 11)}`;
  }
};

/**
 * Remove a máscara do telefone
 */
export const removePhoneMask = (value: string): string => {
  return value.replace(/\D/g, "");
};
