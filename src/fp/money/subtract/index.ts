import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoneyMatch from '../assertMoneyMatch';

const subtract = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): FrozenBaseMoney =>
  assertMoneyMatch(moneyA, moneyB) && moneyFromBigNumber(moneyA.value.minus(moneyB.value), moneyA.currency);

export default subtract;
