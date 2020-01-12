import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const absolute = (money: FrozenBaseMoney): FrozenBaseMoney =>
  assertMoney(money) && moneyFromBigNumber(money.value.absoluteValue(), money.currency);

export default absolute;
