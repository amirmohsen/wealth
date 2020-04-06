import { FrozenBaseMoney } from 'src/fp/types';
import { add, subtract, equals, cloneMoney, createMoney, smallestUnit } from '../../fp/money';

const addRemainderToAllocations = (
  moneyValue: FrozenBaseMoney,
  allocations: FrozenBaseMoney[],
  remainder: FrozenBaseMoney,
): FrozenBaseMoney[] => {
  const finalAllocations = [...allocations];
  const smallestUnitValue = smallestUnit(moneyValue);
  let remainingRemainder = cloneMoney(remainder);
  // TODO: this zero needs decimal digitss
  const noMoney = createMoney('0', moneyValue.currency);

  let i = 0;

  while (!equals(remainingRemainder, noMoney)) {
    finalAllocations[i] = add(finalAllocations[i], smallestUnitValue);
    remainingRemainder = subtract(remainingRemainder, smallestUnitValue);
    i += 1;
  }

  return finalAllocations;
};

export default addRemainderToAllocations;
