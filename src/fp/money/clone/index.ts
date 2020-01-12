import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const clone = (money: FrozenBaseMoney): FrozenBaseMoney =>
  assertMoney(money) && moneyFromBigNumber(money.value, money.currency);

export default clone;
