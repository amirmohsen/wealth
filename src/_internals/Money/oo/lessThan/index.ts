import { Money } from '../..';
import _lessThan from '../../fn/lessThan';

declare module '../../../Money' {
  interface Money {
    lessThan: (value: number | string | Money) => boolean;
  }
}

Money.prototype.lessThan = function lessThan(value): boolean {
  return _lessThan(this, value);
};
