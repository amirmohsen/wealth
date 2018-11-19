import { Money } from '../../../Money';
import allocateBy from '../../fn/allocateBy';

declare module '../../../Money' {
  interface Money {
    allocateBy: (count: number|string) => Money[];
  }
}

Money.prototype.allocateBy = function (count) {
  return allocateBy(this, count);
};
