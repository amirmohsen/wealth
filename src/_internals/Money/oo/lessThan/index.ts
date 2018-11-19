import { Money } from '../../../Money';
import lessThan from '../../fn/lessThan';

declare module '../../../Money' {
  interface Money {
    lessThan: (value: number|string|Money) => boolean;
  }
}

Money.prototype.lessThan = function (value) {
  return lessThan(this, value);
};
