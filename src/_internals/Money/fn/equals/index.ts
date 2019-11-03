import { Money } from '../..';

/**
 * Performs an equality check
 * @param inputValue - value to compare to the current value; type same as constructor
 * @returns - true if value is considered equal to the current value
 */
const equals = (money: Money, inputValue: number | string | Money): boolean => {
  const value = new Money(inputValue, money.currency);
  return money.value.isEqualTo(value.amountAsBigNumber);
};

export default equals;
