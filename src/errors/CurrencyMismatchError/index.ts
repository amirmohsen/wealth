import serialize from 'src/utils/serialize';
import { CurrencyMismatchErrorSymbol } from '../../symbols';
import WealthError from '../WealthError';

export default class CurrencyMismatchError extends WealthError {
  $$typeof = CurrencyMismatchErrorSymbol;

  currencyA: any;

  currencyB: any;

  constructor(currencyA: any, currencyB: any) {
    /* istanbul ignore next */
    super(serialize`
      Currencies don't match:
        ${currencyA}
        and
        ${currencyB}
    `);
    this.currencyA = currencyA;
    this.currencyB = currencyB;
  }
}
