import { FrozenBaseMoney } from 'src/fp/types';
import addRequiredDecimalDigits from 'src/fp/currency/addRequiredDecimalDigits';
import { add, subtract, equals, cloneMoney, createMoney, smallestUnit } from 'src/fp/money';

const addRemainderToAllocations = (
  moneyValue: FrozenBaseMoney,
  allocations: FrozenBaseMoney[],
  remainder: FrozenBaseMoney,
): FrozenBaseMoney[] => {
  const finalAllocations = [...allocations];
  const smallestUnitValue = smallestUnit(moneyValue);
  let remainingRemainder = cloneMoney(remainder);
  const noMoney = createMoney(addRequiredDecimalDigits('0', moneyValue.currency), moneyValue.currency);

  let i = 0;

  while (!equals(remainingRemainder, noMoney)) {
    finalAllocations[i] = add(finalAllocations[i], smallestUnitValue);
    remainingRemainder = subtract(remainingRemainder, smallestUnitValue);
    i += 1;
  }

  return finalAllocations;
};

export default addRemainderToAllocations;
