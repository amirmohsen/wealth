import { InvalidInputErrorSymbol } from '../../symbols';
import WealthError from '../WealthError';

export type InvalidInputMeta = { [key: string]: unknown };

export default class InvalidInputError extends WealthError {
  $$typeof = InvalidInputErrorSymbol;

  input: any;

  meta: InvalidInputMeta;

  constructor(input: any, message: string, meta: InvalidInputMeta = {}) {
    /* istanbul ignore next */
    super(message);
    this.input = input;
    this.meta = meta;
  }
}
