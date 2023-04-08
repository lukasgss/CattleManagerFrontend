export const removeDiacritics = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const transformFractionToDecimal = (fraction: string) => {
  const [numerator, denominator] = fraction.split("/");
  const decimalValue = Number(
    (Number(numerator) / Number(denominator)).toPrecision(21)
  );

  return decimalValue;
};

export const simplifyFraction = (fraction: string) => {
  const [numeratorStr, denominatorStr] = fraction.split("/");
  let a = Number(numeratorStr);
  let b = Number(denominatorStr);
  let c: number;
  while (b) {
    c = a % b;
    a = b;
    b = c;
  }

  return `${Number(numeratorStr) / a}/${Number(denominatorStr) / a}`;
};
