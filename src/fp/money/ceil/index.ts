import { FrozenBaseMoney } from 'src/fp/types';
import { ROUNDING } from 'src';
import { RoundingType } from '../../../constants/ROUNDING';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const ceil = (money: FrozenBaseMoney): FrozenBaseMoney =>
  assertMoney(money) && moneyFromBigNumber(money.value.decimalPlaces(0, ROUNDING.CEIL as RoundingType), money.currency);

export default ceil;
