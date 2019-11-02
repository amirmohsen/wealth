import { Money } from '../..';
import _equals from '../../fn/equals';

declare module '../../../Money' {
  interface Money {
    equals: (value: number | string | Money) => boolean;
  }
}

Money.prototype.equals = function equals(value): boolean {
  return _equals(this, value);
};
