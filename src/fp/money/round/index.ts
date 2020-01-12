import { FrozenBaseMoney } from 'src/fp/types';
import { RoundingType } from '../../../constants/ROUNDING';
import moneyFromBigNumber from '../moneyFromBigNumber';
import assertMoney from '../assertMoney';

export interface RoundingOptions {
  decimalPlaces?: number;
  mode?: RoundingType;
}

const round = (money: FrozenBaseMoney, { decimalPlaces = 0, mode }: RoundingOptions = {}): FrozenBaseMoney =>
  assertMoney(money) && moneyFromBigNumber(money.value.dp(decimalPlaces, mode), money.currency);

export default round;
