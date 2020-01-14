import { isCurrencySameAs } from 'src/fp/currency';
import { FrozenBaseMoney } from 'src/fp/types';

const hasSameCurrency = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): boolean =>
  isCurrencySameAs(moneyA.currency, moneyB.currency);

export default hasSameCurrency;
