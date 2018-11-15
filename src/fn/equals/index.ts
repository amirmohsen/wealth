import { Money } from '../../Money';

/**
 * Performs an equality check
 * @param value - value to compare to the current value; type same as constructor
 * @returns - true if value is considered equal to the current value
 */
const equals = (money: Money, value: number|string|Money) => {
  value = new Money(value, money.currency);
  return money.value.isEqualTo(value.amountAsBigNumber);
};

export default equals;
