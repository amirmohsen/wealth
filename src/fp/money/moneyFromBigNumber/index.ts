import pipe from 'lodash/fp/pipe';
import BigNumber from 'bignumber.js';
import { FrozenBaseCurrency, FrozenBaseMoney, BaseMoneyOptions } from '../../types';
import mergeFields from '../createMoney/mergeFields';

const moneyFromBigNumber = (
  value: BigNumber,
  currency: FrozenBaseCurrency,
  options: BaseMoneyOptions = {},
): FrozenBaseMoney =>
  pipe(
    mergeFields(currency, options),
    Object.freeze,
  )(value) as FrozenBaseMoney;

export default moneyFromBigNumber;
