import pipe from 'lodash/fp/pipe';
import BigNumber from 'bignumber.js';
import { FrozenBaseCurrency, FrozenBaseMoney } from '../../types';
import mergeFields from '../createMoney/mergeFields';

const moneyFromBigNumber = (value: BigNumber, currency: FrozenBaseCurrency): FrozenBaseMoney =>
  pipe(
    mergeFields(currency),
    Object.freeze,
  )(value) as FrozenBaseMoney;

export default moneyFromBigNumber;
