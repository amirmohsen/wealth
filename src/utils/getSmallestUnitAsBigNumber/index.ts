import BigNumber from 'bignumber.js';
import { FrozenBaseMoney } from 'src/fp/types';
import getSmallestUnitDivisor from '../getSmallestUnitDivisor';

const getSmallestUnitAsBigNumber = (money: FrozenBaseMoney): BigNumber => {
  return new BigNumber('1').dividedBy(getSmallestUnitDivisor(money));
};

export default getSmallestUnitAsBigNumber;
