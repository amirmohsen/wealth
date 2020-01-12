import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMonies from '../assertMonies';

const subtract = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): FrozenBaseMoney =>
  assertMonies(moneyA, moneyB) && moneyFromBigNumber(moneyA.value.minus(moneyB.value), moneyA.currency);

export default subtract;
