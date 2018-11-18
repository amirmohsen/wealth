import { Money } from '../../../Money';

/**
 * Performs a check if the current value is greater than the parameter
 * @param value - value to compare to the current value; type same as constructor
 * @returns - true if the current value is greater than the parameter
 */
export const greaterThan = (money: Money, value: number|string|Money) => {
  value = new Money(value, money.currency);
  return money.value.isGreaterThan(value.amountAsBigNumber);
};

export default greaterThan;
