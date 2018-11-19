import { Money } from '../../../Money';
import subtract from '../../fn/subtract';

declare module '../../../Money' {
  interface Money {
    subtract: (value: number|string|Money) => Money;
  }
}

Money.prototype.subtract = function (value) {
  return subtract(this, value);
};
