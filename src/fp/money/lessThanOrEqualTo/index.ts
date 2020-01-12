import { FrozenBaseMoney } from 'src/fp/types';
import assertMonies from '../assertMonies';

const lessThanOrEqualTo = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMonies(moneyA, moneyB) && moneyA.value.isLessThanOrEqualTo(moneyB.value);

export default lessThanOrEqualTo;
