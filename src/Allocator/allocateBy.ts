import Money from '../Money';
import ROUNDING from '../constants/ROUNDING';
import { subtract, multiply, divide } from '../Calculator';
import { addRemainderToAllocations } from './internals';

/**
 * Split the current value by the count
 * @param count - count by which to allocate the current value (must be a 1+ integer)
 * @returns - an array of new Money instances, resulting from splitting the current value
 */
const allocateBy = (money: Money, count: number|string): Money[] => {
  const
    allocations: Money[] = [],
    totalValue = money.clone(),
    baseShare = divide(totalValue, count, ROUNDING.FLOOR),
    remainder = subtract(totalValue, multiply(baseShare, count, ROUNDING.FLOOR));

  for (let i = 0; i < count; i++) {
    allocations.push(baseShare.clone());
  }

  return addRemainderToAllocations(money, allocations, remainder);
};

export default allocateBy;
