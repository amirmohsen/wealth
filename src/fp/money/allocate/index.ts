import isFloat from 'validator/lib/isFloat';
import { FrozenBaseMoney } from 'src/fp/types';
import BigNumber from 'bignumber.js';
import InvalidOptionsError from 'src/errors/InvalidOptionsError';
import serialize from 'src/utils/serialize';
import ROUNDING, { RoundingType } from 'src/constants/ROUNDING';
import addRemainderToAllocations from 'src/utils/addRemainderToAllocations';
import assertMoney from '../assertMoney';
import cloneMoney from '../cloneMoney';
import multiply from '../multiply';
import divide from '../divide';
import subtract from '../subtract';

export interface RoundingOptions {
  decimalPlaces?: number;
  mode?: RoundingType;
}

const isPositiveNumber = (num: number | string): boolean => typeof num === 'number' && num > 0;

const isPositiveStringFloat = (num: number | string): boolean =>
  typeof num === 'string' &&
  isFloat(num, {
    gt: 0,
  });

const assertRatio = (ratio: number | string): boolean => {
  if (!isPositiveNumber(ratio) && !isPositiveStringFloat(ratio)) {
    throw new InvalidOptionsError(
      ratio,
      serialize`
        Provided ratio is not a positive number or string float:
          ${ratio}
      `,
    );
  }
  return true;
};

const assertRatios = (ratios: (string | number)[]): true => {
  if (!Array.isArray(ratios)) {
    throw new InvalidOptionsError(
      ratios,
      serialize`
      Provided ratios are not an array:
        ${ratios}
    `,
    );
  }

  return ratios.every(assertRatio) as true;
};

const allocate = (money: FrozenBaseMoney, ratios: (string | number)[]): FrozenBaseMoney[] => {
  assertMoney(money);
  assertRatios(ratios);

  const allocations: FrozenBaseMoney[] = [];
  const totalValue = cloneMoney(money);
  const total: BigNumber = ratios.reduce((acc, ratio) => acc.plus(ratio), new BigNumber('0'));

  let remainder = cloneMoney(money);

  for (const ratio of ratios) {
    let share = multiply(totalValue, ratio, ROUNDING.FLOOR);
    share = divide(share, total.toString(), ROUNDING.FLOOR);

    allocations.push(share);
    remainder = subtract(remainder, share);
  }

  return addRemainderToAllocations(money, allocations, remainder);
};

export default allocate;
