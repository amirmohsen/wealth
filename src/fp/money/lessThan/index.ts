import { FrozenBaseMoney } from 'src/fp/types';
import assertMoneyMatch from '../assertMoneyMatch';

const lessThan = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMoneyMatch(moneyA, moneyB) && moneyA.value.isLessThan(moneyB.value);

export default lessThan;
