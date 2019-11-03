import { Money } from '../..';
import _greaterThanOrEqualTo from '../../fn/greaterThanOrEqualTo';

declare module '../../../Money' {
  interface Money {
    greaterThanOrEqualTo: (value: number | string | Money) => boolean;
  }
}

Money.prototype.greaterThanOrEqualTo = function greaterThanOrEqualTo(value): boolean {
  return _greaterThanOrEqualTo(this, value);
};
