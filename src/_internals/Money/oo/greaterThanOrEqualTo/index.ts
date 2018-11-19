import { Money } from '../../../Money';
import greaterThanOrEqualTo from '../../fn/greaterThanOrEqualTo';

declare module '../../../Money' {
  interface Money {
    greaterThanOrEqualTo: (value: number|string|Money) => boolean;
  }
}

Money.prototype.greaterThanOrEqualTo = function (value) {
  return greaterThanOrEqualTo(this, value);
};
