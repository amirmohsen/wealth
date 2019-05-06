import { Money } from '../../../Money';
import { convertBigNumberToStringInteger } from '../_internals';
import ROUNDING from '../../../constants/ROUNDING';

/**
 * Performs multiplication
 * @param value - value to multiply the current value
 * @param rounding - rounding mode used in money operation
 * @returns - new Money instance after multiplication
 */
const multiply = (money: Money, value: number|string, rounding = ROUNDING.HALF_UP) => {
  const newValue = money.value
    .times(value)
    .decimalPlaces(money.currency.decimalDigits, rounding as any);
  return new Money(convertBigNumberToStringInteger(money, newValue), money.currency);
};

export default multiply;
