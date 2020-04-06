import { FrozenBaseMoney } from 'src/fp/types';
import addRemainderToAllocations from 'src/utils/addRemainderToAllocations';
import ROUNDING from '../../../constants/ROUNDING';
import { subtract, multiply, divide, cloneMoney } from '..';

const allocateBy = (money: FrozenBaseMoney, count: number | string): FrozenBaseMoney[] => {
  const allocations: FrozenBaseMoney[] = [];
  const totalValue = cloneMoney(money);
  const baseShare = divide(totalValue, count, ROUNDING.FLOOR);
  const remainder = subtract(totalValue, multiply(baseShare, count, ROUNDING.FLOOR));

  for (let i = 0; i < count; i += 1) {
    allocations.push(cloneMoney(baseShare));
  }

  return addRemainderToAllocations(money, allocations, remainder);
};

export default allocateBy;
