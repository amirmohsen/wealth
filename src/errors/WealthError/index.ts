import ExtendableError from 'es6-error';
import { WealthErrorSymbol } from '../../symbols';

export default class WealthError extends ExtendableError {
  $$typeof = WealthErrorSymbol;

  constructor(message = 'Wealth error') {
    /* istanbul ignore next */
    super(message);
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return instance && (instance.constructor === this || instance.$$typeof === this.prototype.$$typeof);
  }
}
