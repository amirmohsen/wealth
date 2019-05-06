import { Money } from '../../../Money';
import multiply from '../../fn/multiply';
import ROUNDING from '../../../constants/ROUNDING';

declare module '../../../Money' {
  interface Money {
    multiply: (value: number|string, rounding?: ROUNDING) => Money;
  }
}

Money.prototype.multiply = function (value, rounding?) {
  return multiply(this, value, rounding);
};
