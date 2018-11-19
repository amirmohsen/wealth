import { Money } from '../../../Money';
import absolute from '../../fn/absolute';

declare module '../../../Money' {
  interface Money {
    absolute: () => Money;
  }
}

Money.prototype.absolute = function () {
  return absolute(this);
};
