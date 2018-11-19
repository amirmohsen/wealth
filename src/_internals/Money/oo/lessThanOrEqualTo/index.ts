import { Money } from '../../../Money';
import lessThanOrEqualTo from '../../fn/lessThanOrEqualTo';

declare module '../../../Money' {
  interface Money {
    lessThanOrEqualTo: (value: number|string|Money) => boolean;
  }
}

Money.prototype.lessThanOrEqualTo = function (value) {
  return lessThanOrEqualTo(this, value);
};
