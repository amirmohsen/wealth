import { Money } from '../../../Money';
import floor from '../../fn/floor';

declare module '../../../Money' {
  interface Money {
    floor: () => Money;
  }
}

Money.prototype.floor = function () {
  return floor(this);
};
