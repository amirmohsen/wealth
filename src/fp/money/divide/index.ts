import ROUNDING, { RoundingType } from 'src/constants/ROUNDING';
import { FrozenBaseMoney } from 'src/fp/types';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

const divide = (
  money: FrozenBaseMoney,
  value: number | string,
  rounding: ROUNDING = ROUNDING.HALF_UP,
): FrozenBaseMoney =>
  assertMoney(money) &&
  moneyFromBigNumber(
    money.value.dividedBy(value).decimalPlaces(money.currency.decimalDigits, rounding as RoundingType),
    money.currency,
  );

export default divide;
