import { Money } from '../../../Money';
import divide from '../../fn/divide';
import ROUNDING from '../../../constants/ROUNDING';

declare module '../../../Money' {
  interface Money {
    divide: (value: number|string, rounding?: ROUNDING) => Money;
  }
}

Money.prototype.divide = function (value, rounding?) {
  return divide(this, value, rounding);
};
