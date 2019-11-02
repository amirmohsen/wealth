import { Money } from '../..';
import _greaterThan from '../../fn/greaterThan';

declare module '../../../Money' {
  interface Money {
    greaterThan: (value: number | string | Money) => boolean;
  }
}

Money.prototype.greaterThan = function greaterThan(value): boolean {
  return _greaterThan(this, value);
};
