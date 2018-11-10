import Money from '../Money';
import { add, subtract } from '../Calculator';
import { equals } from '../EqualityChecker';

/**
 * Used by allocation methods to add the remainder to the array of allocations
 * @param allocations - an array of Money instances already allocated
 * @param remainder - a Money instance with the remainder yet to be added
 * to the array of allocations
 * @returns - the final allocations array of Money instances
 */
export const addRemainderToAllocations = (
  money: Money,
  allocations: Money[],
  remainder: Money,
) => {
  const noMoney = new Money('0', money.currency);

  let i = 0;

  while (!equals(remainder, noMoney)) {
    allocations[i] = add(allocations[i], money.smallestUnit);
    remainder = subtract(remainder, money.smallestUnit);
    i++;
  }

  return allocations;
};
