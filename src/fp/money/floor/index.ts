import { FrozenBaseMoney } from 'src/fp/types';
import { ROUNDING } from 'src';
import { RoundingType } from '../../../constants/ROUNDING';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const floor = (money: FrozenBaseMoney): FrozenBaseMoney =>
  assertMoney(money) &&
  moneyFromBigNumber(money.value.decimalPlaces(0, ROUNDING.FLOOR as RoundingType), money.currency);

export default floor;
