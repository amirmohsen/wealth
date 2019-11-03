import { Money } from '../..';

/**
 * Performs a check if the current value is greater than the parameter
 * @param inputValue - value to compare to the current value; type same as constructor
 * @returns - true if the current value is greater than the parameter
 */
export const greaterThan = (money: Money, inputValue: number | string | Money): boolean => {
  const value = new Money(inputValue, money.currency);
  return money.value.isGreaterThan(value.amountAsBigNumber);
};

export default greaterThan;
