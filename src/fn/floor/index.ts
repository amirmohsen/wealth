import { Money } from '../../Money';
import ROUNDING from '../../constants/ROUNDING';
import { convertBigNumberToStringInteger } from '../../utils/internals';

/**
 * Return the largest integer less than or equal to the current value
 * @returns - new Money instance with the floor value
 */
const floor = (money: Money) => {
  const newValue = money.value.decimalPlaces(0, ROUNDING.FLOOR as any);
  return new Money(convertBigNumberToStringInteger(money, newValue), money.currency);
};

export default floor;
