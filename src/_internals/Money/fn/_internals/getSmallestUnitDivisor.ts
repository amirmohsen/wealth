import BigNumber from 'bignumber.js';
import { Money } from '../../../Money';

/**
 * Get the smallest unit divisor for the current value's currency,
 * i.e., 10 to the power of the currency's decimal digits.
 * It is used for converting an integer value to a float value (or vice versa).
 * @returns - Smallest unit divisor
 */
const getSmallestUnitDivisor = (money: Money) => {
  const	decimalDigits = money.currency.decimalDigits;
  return (new BigNumber('10')).exponentiatedBy(decimalDigits);
};

export default getSmallestUnitDivisor;
