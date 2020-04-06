import assertCurrencyMatch from 'src/fp/currency/assertCurrencyMatch';
import { FrozenBaseMoney } from '../../types';
import assertMoney from '../assertMoney';
import assertMoneyOptionsMatch from '../assertMoneyOptionsMatch';

const assertCompatibility = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): true =>
  assertMoney(moneyA) &&
  assertMoney(moneyB) &&
  assertCurrencyMatch(moneyA.currency, moneyB.currency) &&
  assertMoneyOptionsMatch(moneyA, moneyB);

export default assertCompatibility;
