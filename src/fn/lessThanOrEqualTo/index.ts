import { Money } from '../../Money';

/**
 * Performs a check if the current value is less than or equal to the parameter
 * @param value - value to compare to the current value; type same as constructor
 * @returns - true if the current value is less than or equal to the parameter
 */
export const lessThanOrEqualTo = (money: Money, value: number|string|Money) => {
  value = new Money(value, money.currency);
  return money.value.isLessThanOrEqualTo(value.amountAsBigNumber);
};

export default lessThanOrEqualTo;
