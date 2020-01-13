import BigNumber from 'bignumber.js';
import { MoneySymbol } from 'src/symbols';
import { BaseMoney, FrozenBaseCurrency } from '../../../types';

const mergeFields = (currency: FrozenBaseCurrency) => (value: BigNumber): BaseMoney =>
  Object.assign(Object.create(null), {
    value,
    currency,
    $$typeof: MoneySymbol,
  });

export default mergeFields;
