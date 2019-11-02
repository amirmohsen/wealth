import { Money } from '../..';

/**
 * Performs a check if the current value is less than or equal to the parameter
 * @param inputValue - value to compare to the current value; type same as constructor
 * @returns - true if the current value is less than or equal to the parameter
 */
export const lessThanOrEqualTo = (money: Money, inputValue: number | string | Money): boolean => {
  const value = new Money(inputValue, money.currency);
  return money.value.isLessThanOrEqualTo(value.amountAsBigNumber);
};

export default lessThanOrEqualTo;
