import { FrozenBaseMoney } from 'src/fp/types';
import { ROUNDING } from 'src/constants';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const ceil = (money: FrozenBaseMoney): FrozenBaseMoney =>
  assertMoney(money) && moneyFromBigNumber(money.value.decimalPlaces(0, ROUNDING.CEIL), money.currency);

export default ceil;
