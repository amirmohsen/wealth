import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoneyMatch from '../assertMoneyMatch';

const add = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): FrozenBaseMoney =>
  assertMoneyMatch(moneyA, moneyB) && moneyFromBigNumber(moneyA.value.plus(moneyB.value), moneyA.currency);

export default add;
