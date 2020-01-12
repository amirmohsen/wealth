import BigNumber from 'bignumber.js';
import { FrozenBaseMoney } from 'src/fp/types';

const getSmallestUnitDivisor = (money: FrozenBaseMoney): BigNumber => {
  const { decimalDigits } = money.currency;
  return new BigNumber('10').exponentiatedBy(decimalDigits);
};

export default getSmallestUnitDivisor;
