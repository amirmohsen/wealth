import { Money } from '../../../Money';
import ceil from '../../fn/ceil';

declare module '../../../Money' {
  interface Money {
    ceil: () => Money;
  }
}

Money.prototype.ceil = function () {
  return ceil(this);
};
