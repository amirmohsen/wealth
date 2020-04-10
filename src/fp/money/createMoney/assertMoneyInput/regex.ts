export const intRegex = /^[-|+]?\d+$/;

export interface DecimalRegexOptions {
  decimalDigits: number;
  range?: boolean;
}

export const decimalRegex = ({ decimalDigits, range = false }: DecimalRegexOptions): RegExp =>
  new RegExp(`^[-|+]?\\d+\\.\\d{${range ? `1,${decimalDigits}` : decimalDigits}}$`);
