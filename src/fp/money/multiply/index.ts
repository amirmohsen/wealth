import ROUNDING, { RoundingType } from 'src/constants/ROUNDING';
import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const multiply = (
  money: FrozenBaseMoney,
  value: number | string,
  rounding: RoundingType = ROUNDING.HALF_UP,
): FrozenBaseMoney =>
  // remove truthy assertions and introduce the complexity rule
  assertMoney(money) &&
  // pass options to all of the moneyFromBigNumber usages
  moneyFromBigNumber(money.value.times(value).decimalPlaces(money.currency.decimalDigits, rounding), money.currency);

export default multiply;
