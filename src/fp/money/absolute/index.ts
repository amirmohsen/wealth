import { Money } from '../..';
import { convertBigNumberToStringInteger } from '../_internals';

/**
 * Return the absolute monetary value of the current value,
 * i.e., remove the minus sign if the value is below zero
 * @returns - new Money instance with the absolute value
 */
const absolute = (money: Money): Money => {
  const newValue = money.value.absoluteValue();
  return new Money(convertBigNumberToStringInteger(money, newValue), money.currency);
};

export default absolute;
