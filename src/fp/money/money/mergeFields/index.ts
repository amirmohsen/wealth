import BigNumber from 'bignumber.js';
import { moneySymbol } from 'src/fp/symbols';
import { BaseMoney, FrozenBaseCurrency } from 'src/fp/types';

const mergeFields = (currency: FrozenBaseCurrency) => (value: BigNumber): BaseMoney => ({
  value,
  currency,
  $$typeof: moneySymbol,
});

export default mergeFields;
