import { FrozenBaseMoney } from 'src/fp/types';
import assertMonies from '../assertMonies';

const lessThan = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMonies(moneyA, moneyB) && moneyA.value.isLessThan(moneyB.value);

export default lessThan;
