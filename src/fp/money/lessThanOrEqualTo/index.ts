import { FrozenBaseMoney } from 'src/fp/types';
import assertMoneyMatch from '../assertMoneyMatch';

const lessThanOrEqualTo = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMoneyMatch(moneyA, moneyB) && moneyA.value.isLessThanOrEqualTo(moneyB.value);

export default lessThanOrEqualTo;
