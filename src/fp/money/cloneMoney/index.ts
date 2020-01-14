import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const cloneMoney = (money: FrozenBaseMoney): FrozenBaseMoney =>
  assertMoney(money) && moneyFromBigNumber(money.value, money.currency);

export default cloneMoney;
