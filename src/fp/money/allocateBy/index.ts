import { Money } from '../..';
import ROUNDING from '../../../constants/ROUNDING';
import { subtract, multiply, divide } from '..';
import addRemainderToAllocations from '../_internals/addRemainderToAllocations';

/**
 * Split the current value by the count
 * @param count - count by which to allocate the current value (must be a 1+ integer)
 * @returns - an array of new Money instances, resulting from splitting the current value
 */
const allocateBy = (money: Money, count: number | string): Money[] => {
  const allocations: Money[] = [];
  const totalValue = money.clone();
  const baseShare = divide(totalValue, count, ROUNDING.FLOOR);
  const remainder = subtract(totalValue, multiply(baseShare, count, ROUNDING.FLOOR));

  for (let i = 0; i < count; i += 1) {
    allocations.push(baseShare.clone());
  }

  return addRemainderToAllocations(money, allocations, remainder);
};

export default allocateBy;
