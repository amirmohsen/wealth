import { Money } from '../..';
import _floor from '../../fn/floor';

declare module '../../../Money' {
  interface Money {
    floor: () => Money;
  }
}

Money.prototype.floor = function floor(): Money {
  return _floor(this);
};
