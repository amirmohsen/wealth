import { Money } from '../../../Money';
import allocate from '../../fn/allocate';

declare module '../../../Money' {
  interface Money {
    allocate: (ratios: (string|number)[]) => Money[];
  }
}

Money.prototype.allocate = function (ratios) {
  return allocate(this, ratios);
};
