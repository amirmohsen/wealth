import { Money } from '../../../Money';
import greaterThan from '../../fn/greaterThan';

declare module '../../../Money' {
  interface Money {
    greaterThan: (value: number|string|Money) => boolean;
  }
}

Money.prototype.greaterThan = function (value) {
  return greaterThan(this, value);
};
