import { FrozenBaseMoney } from 'src/fp/types';
import assertMonies from '../assertMonies';

const greaterThanOrEqualTo = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMonies(moneyA, moneyB) && moneyA.value.isGreaterThanOrEqualTo(moneyB.value);

export default greaterThanOrEqualTo;
