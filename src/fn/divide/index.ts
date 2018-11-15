import { Money } from '../../Money';
import { convertBigNumberToStringInteger } from '../../utils/internals';
import ROUNDING from '../../constants/ROUNDING';

/**
 * Performs division
 * @param value - value to divide the current value by
 * @param rounding - rounding mode used in money operation
 * @returns - new Money instance after division
 */
const divide = (money: Money, value: number|string, rounding = ROUNDING.HALF_UP) => {
  const newValue = money.value
    .dividedBy(value)
    .decimalPlaces(money.currency.decimalDigits, rounding as any);
  return new Money(convertBigNumberToStringInteger(money, newValue), money.currency);
};

export default divide;
