import BigNumber from 'bignumber.js';
import { MoneySymbol } from 'src/symbols';
import { BaseMoneyOptions, BaseMoney, FrozenBaseCurrency } from '../../../types';

const mergeFields = (currency: FrozenBaseCurrency, options: BaseMoneyOptions) => (value: BigNumber): BaseMoney =>
  Object.assign(Object.create(null), {
    options: Object.freeze(options),
    value,
    currency,
    $$typeof: MoneySymbol,
  });

export default mergeFields;
