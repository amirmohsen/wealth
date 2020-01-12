import ROUNDING, { RoundingType } from 'src/constants/ROUNDING';
import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const multiply = (
  money: FrozenBaseMoney,
  value: number | string,
  rounding: ROUNDING = ROUNDING.HALF_UP,
): FrozenBaseMoney =>
  assertMoney(money) &&
  moneyFromBigNumber(
    money.value.times(value).decimalPlaces(money.currency.decimalDigits, rounding as RoundingType),
    money.currency,
  );

export default multiply;
