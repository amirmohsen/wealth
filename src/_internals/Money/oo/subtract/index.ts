import { Money } from '../..';
import _subtract from '../../fn/subtract';

declare module '../../../Money' {
  interface Money {
    subtract: (value: number | string | Money) => Money;
  }
}

Money.prototype.subtract = function subtract(value): Money {
  return _subtract(this, value);
};
