import { FrozenBaseMoney } from 'src/fp/types';
import assertMoneyMatch from '../assertMoneyMatch';

const greaterThan = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMoneyMatch(moneyA, moneyB) && moneyA.value.isGreaterThan(moneyB.value);

export default greaterThan;
