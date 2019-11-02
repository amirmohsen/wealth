import { Money } from '../..';
import _divide from '../../fn/divide';
import ROUNDING from '../../../constants/ROUNDING';

declare module '../../../Money' {
  interface Money {
    divide: (value: number | string, rounding?: ROUNDING) => Money;
  }
}

Money.prototype.divide = function divide(value, rounding?): Money {
  return _divide(this, value, rounding);
};
