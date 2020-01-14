import { FrozenBaseMoney } from 'src/fp/types';
import assertMoneyMatch from '../assertMoneyMatch';

const equals = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  assertMoneyMatch(moneyA, moneyB) && moneyA.value.isEqualTo(moneyB.value);

export default equals;
