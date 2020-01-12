import serialize from 'src/utils/serialize';
import { InvalidCurrencyErrorSymbol } from '../../symbols';
import WealthError from '../WealthError';

export default class InvalidCurrencyError extends WealthError {
  $$typeof = InvalidCurrencyErrorSymbol;

  currency: any;

  constructor(currency: any) {
    /* istanbul ignore next */
    super(serialize`
      Invalid currency:
        ${currency}
    `);
    this.currency = currency;
  }
}
