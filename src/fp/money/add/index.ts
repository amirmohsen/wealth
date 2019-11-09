import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMonies from '../assertMonies';

const add = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): FrozenBaseMoney => {
  assertMonies(moneyA, moneyB);
  return moneyFromBigNumber(moneyA.value.plus(moneyB.value), moneyA.currency);
};

export default add;
