import serialize from 'src/utils/serialize';
import { InvalidMoneyErrorSymbol } from '../../symbols';
import WealthError from '../WealthError';

export default class InvalidMoneyError extends WealthError {
  $$typeof = InvalidMoneyErrorSymbol;

  money: any;

  constructor(money: any) {
    /* istanbul ignore next */
    super(serialize`
      Invalid money:
        ${money}
    `);
    this.money = money;
  }
}
