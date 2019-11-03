import { Money } from '../..';
import { add, subtract, equals } from '..';

/**
 * Used by allocation methods to add the remainder to the array of allocations
 * @param allocations - an array of Money instances already allocated
 * @param remainder - a Money instance with the remainder yet to be added
 * to the array of allocations
 * @returns - the final allocations array of Money instances
 */
const addRemainderToAllocations = (money: Money, allocations: Money[], remainder: Money): Money[] => {
  const finalAllocations = [...allocations];
  let remainingRemainder = remainder.clone();
  const noMoney = new Money('0', money.currency);

  let i = 0;

  while (!equals(remainingRemainder, noMoney)) {
    finalAllocations[i] = add(finalAllocations[i], money.smallestUnit);
    remainingRemainder = subtract(remainingRemainder, money.smallestUnit);
    i += 1;
  }

  return finalAllocations;
};

export default addRemainderToAllocations;
