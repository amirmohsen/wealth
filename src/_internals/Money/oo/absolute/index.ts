import { Money } from '../..';
import _absolute from '../../fn/absolute';

declare module '../../../Money' {
  interface Money {
    absolute: () => Money;
  }
}

Money.prototype.absolute = function absolute(): Money {
  return _absolute(this);
};
