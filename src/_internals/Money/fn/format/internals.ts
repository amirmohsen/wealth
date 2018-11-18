import Currency, { CurrencyInputSettings } from '../../../Currency';
import { Money } from '../..';
import { getCurrency } from '../_internals';

/**
 * Get formatting details
 * @param value - Monetary value to be formatted
 * @param settings - Formatting settings, currency code or currency
 * @returns - Formatting details
 * @private
 */
export const getFormattingDetails = (
  value: Money,
  settings?: CurrencyInputSettings|string|Currency,
) => {
  const {
    symbol,
    code,
    thousandsSeparator,
    decimalSeparator,
    decimalDigits,
    pattern,
    formatter,
  } = getCurrency(settings, value).settings;

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
