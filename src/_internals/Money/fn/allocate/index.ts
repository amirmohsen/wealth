import BigNumber from 'bignumber.js';
import { Money } from '../..';
import ROUNDING from '../../../constants/ROUNDING';
import { subtract, multiply, divide } from '..';
import addRemainderToAllocations from '../_internals/addRemainderToAllocations';

/**
 * Split the current value by an array of ratios
 * @param ratios - an array of numbers by which to divide up the current value
 * @returns - an array of new Money instances, resulting from splitting the current value
 */
const allocate = (money: Money, ratios: (string | number)[]): Money[] => {
  const allocations: Money[] = [];
  const totalValue = money.clone();
  const total: BigNumber = ratios.reduce((acc, ratio) => acc.plus(ratio), new BigNumber('0'));

  let remainder = money.clone();

  for (const ratio of ratios) {
    let share = multiply(totalValue, ratio, ROUNDING.FLOOR);
    share = divide(share, total.toString(), ROUNDING.FLOOR);

    allocations.push(share);
    remainder = subtract(remainder, share);
  }

  return addRemainderToAllocations(money, allocations, remainder);
};

export default allocate;
