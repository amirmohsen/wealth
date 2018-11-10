import BigNumber from 'bignumber.js';
import Money from '../Money';
import { CurrencyInputSettings } from '../CurrencyStore';
import Currency from '../Currency';

/**
 * Get the smallest unit divisor for the current value's currency,
 * i.e., 10 to the power of the currency's decimal digits.
 * It is used for converting an integer value to a float value (or vice versa).
 * @returns - Smallest unit divisor
 */
export const getSmallestUnitDivisor = (money: Money) => {
  const	decimalDigits = money.currency.decimalDigits;
  return (new BigNumber('10')).exponentiatedBy(decimalDigits);
};

/**
 * Get the smallest unit of the currency as a big number
 * @returns - Smallest unit of the currency
 */
export const getSmallestUnitAsBigNumber = (money: Money) => {
  return (new BigNumber('1')).dividedBy(getSmallestUnitDivisor(money));
};

/**
 * Convert a BigNumber to a string integer
 * @param value - value to be converted
 * @return - String integer value of the BigNumber value
 */
export const convertBigNumberToStringInteger = (money: Money, value: BigNumber) => {
  return value.times(getSmallestUnitDivisor(money)).toString();
};

/**
 * Get currency from the given settings and monetary value
 * @param settings - Formatting settings, currency code or currency
 * @param value - Monetary value to be formatted
 * @returns - Currency
 * @private
 */
export const getCurrency = (
  settings: CurrencyInputSettings|string|Currency = {},
  value?: Money,
) => {
  return Object.keys(settings).length === 0 && value instanceof Money
    ? value.currency
    : new Currency(settings);
};
