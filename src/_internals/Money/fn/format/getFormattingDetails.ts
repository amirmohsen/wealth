import BigNumber from 'bignumber.js';
import Currency, { CurrencyInputSettings, CurrencyFormatter } from '../../../Currency';
import { Money } from '../..';
import { getCurrency } from '../_internals';

export interface FormattingDetails {
  symbol: string;
  code: string;
  decimalDigits: number;
  thousandsSeparator: string;
  decimalSeparator: string;
  pattern: string;
  formatter?: CurrencyFormatter;
  value: BigNumber;
}

/**
 * Get formatting details
 * @param value - Monetary value to be formatted
 * @param settings - Formatting settings, currency code or currency
 * @returns - Formatting details
 * @private
 */
const getFormattingDetails = (
  value: Money,
  settings?: CurrencyInputSettings | string | Currency,
): FormattingDetails => {
  const { symbol, code, thousandsSeparator, decimalSeparator, decimalDigits, pattern, formatter } = getCurrency(
    settings,
    value,
  ).settings;

  let bigNumberValue;

  if (settings === undefined) {
    bigNumberValue = value.amountAsBigNumber;
  } else {
    const BN = value.bigNumberConstructor.clone({
      FORMAT: {
        decimalSeparator,
        groupSeparator: thousandsSeparator,
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: ' ',
        fractionGroupSize: 0,
      },
    });

    bigNumberValue = new BN(value.amountAsBigNumber);
  }

  return {
    symbol,
    code,
    decimalDigits,
    thousandsSeparator,
    decimalSeparator,
    pattern,
    formatter,
    value: bigNumberValue,
  };
};

export default getFormattingDetails;
