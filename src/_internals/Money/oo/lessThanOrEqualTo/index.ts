import { Money } from '../..';
import _lessThanOrEqualTo from '../../fn/lessThanOrEqualTo';

declare module '../../../Money' {
  interface Money {
    lessThanOrEqualTo: (value: number | string | Money) => boolean;
  }
}

Money.prototype.lessThanOrEqualTo = function lessThanOrEqualTo(value): boolean {
  return _lessThanOrEqualTo(this, value);
};
