import { Money } from '../../../Money';
import equals from '../../fn/equals';

declare module '../../../Money' {
  interface Money {
    equals: (value: number|string|Money) => boolean;
  }
}

Money.prototype.equals = function (value) {
  return equals(this, value);
};
