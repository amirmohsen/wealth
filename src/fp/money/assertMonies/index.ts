import assertCurrencyMatch from 'src/fp/currency/assertCurrencyMatch';
import { FrozenBaseMoney } from '../../types';
import assertMoney from '../assertMoney';

const assertMonies = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): true =>
  assertMoney(moneyA) && assertMoney(moneyB) && assertCurrencyMatch(moneyA.currency, moneyB.currency);

export default assertMonies;
