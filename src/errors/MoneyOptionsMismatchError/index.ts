import serialize from 'src/utils/serialize';
import { FrozenBaseMoney } from 'src/fp/types';
import { MoneyOptionsMismatchErrorSymbol } from '../../symbols';
import WealthError from '../WealthError';

export default class MoneyOptionsMismatchError extends WealthError {
  $$typeof = MoneyOptionsMismatchErrorSymbol;

  moneyA: FrozenBaseMoney;

  moneyB: FrozenBaseMoney;

  constructor(moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney) {
    /* istanbul ignore next */
    super(serialize`
      Money options don't match:
        ${moneyA}
        and
        ${moneyB}
    `);
    this.moneyA = moneyA;
    this.moneyB = moneyB;
  }
}
