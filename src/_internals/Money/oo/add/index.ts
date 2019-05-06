import { Money } from '../../../Money';
import add from '../../fn/add';

declare module '../../../Money' {
  interface Money {
    add: (value: number|string|Money) => Money;
  }
}

Money.prototype.add = function (value) {
  return add(this, value);
};
