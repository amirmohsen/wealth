import { FrozenBaseMoney } from 'src/fp/types';
import assertCurrencyMatch from 'src/fp/currency/assertCurrencyMatch';
import assertMoney from '../assertMoney';

const assertMonies = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): void => {
  assertMoney(moneyA);
  assertMoney(moneyB);
  assertCurrencyMatch(moneyA.currency, moneyB.currency);
};

export default assertMonies;
