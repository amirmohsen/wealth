import pipe from 'lodash/fp/pipe';
import { FrozenBaseMoney } from 'src/fp/types';
import getSmallestUnitAsBigNumber from 'src/utils/getSmallestUnitAsBigNumber';
import moneyFromBigNumber from '../moneyFromBigNumber';

const smallestUnit = (money: FrozenBaseMoney): FrozenBaseMoney =>
  pipe(
    getSmallestUnitAsBigNumber,
    moneyFromBigNumber,
  )(money);

export default smallestUnit;
