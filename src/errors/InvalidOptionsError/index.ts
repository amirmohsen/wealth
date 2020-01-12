import { InvalidOptionsErrorSymbol } from '../../symbols';
import WealthError from '../WealthError';

export default class InvalidOptionsError extends WealthError {
  $$typeof = InvalidOptionsErrorSymbol;

  options: any;

  constructor(options: any, message: string) {
    /* istanbul ignore next */
    super(message);
    this.options = options;
  }
}
