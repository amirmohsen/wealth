import { FrozenBaseMoney } from 'src/fp/types';
import assertMonies from '../assertMonies';

const greaterThan = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMonies(moneyA, moneyB) && moneyA.value.isGreaterThan(moneyB.value);

export default greaterThan;
