import { FrozenBaseMoney } from 'src/fp/types';
import assertMonies from '../assertMonies';

const equals = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMonies(moneyA, moneyB) && moneyA.value.isEqualTo(moneyB.value);

export default equals;
