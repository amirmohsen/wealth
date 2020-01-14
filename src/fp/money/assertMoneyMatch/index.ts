import assertMatch from 'src/fp/currency/assertCurrencyMatch';
import { FrozenBaseMoney } from '../../types';
import assertMoney from '../assertMoney';

const assertMoneyMatch = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): true =>
  assertMoney(moneyA) && assertMoney(moneyB) && assertMatch(moneyA.currency, moneyB.currency);

export default assertMoneyMatch;
