import { Money } from '../..';
import _add from '../../fn/add';

declare module '../../../Money' {
  interface Money {
    add: (value: number | string | Money) => Money;
  }
}

Money.prototype.add = function add(value): Money {
  return _add(this, value);
};
