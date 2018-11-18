import { Money } from '../../../Money';
import { convertBigNumberToStringInteger } from '../_internals';

/**
 * Performs subtraction
 * @param value - value to be subtracted from the current value; type same as constructor
 * @returns - new Money instance after subtraction
 */
const subtract = (money: Money, value: number|string|Money) => {
  const moneyValue = new Money(value, money.currency);
  const newValue = money.value.minus(moneyValue.amountAsBigNumber);
  return new Money(convertBigNumberToStringInteger(money, newValue), money.currency);
};

export default subtract;
