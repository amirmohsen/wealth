import { Money } from '../..';
import _ceil from '../../fn/ceil';

declare module '../../../Money' {
  interface Money {
    ceil: () => Money;
  }
}

Money.prototype.ceil = function ceil(): Money {
  return _ceil(this);
};
