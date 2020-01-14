import { FrozenBaseMoney } from 'src/fp/types';
import assertMoneyMatch from '../assertMoneyMatch';

const greaterThanOrEqualTo = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMoneyMatch(moneyA, moneyB) && moneyA.value.isGreaterThanOrEqualTo(moneyB.value);

export default greaterThanOrEqualTo;
