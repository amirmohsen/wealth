import { Money } from '../../../Money';

/**
 * Performs a check if the current value is less than the parameter
 * @param value - value to compare to the current value; type same as constructor
 * @returns - true if the current value is less than the parameter
 */
export const lessThan = (money: Money, value: number|string|Money) => {
  value = new Money(value, money.currency);
  return money.value.isLessThan(value.amountAsBigNumber);
};

export default lessThan;
