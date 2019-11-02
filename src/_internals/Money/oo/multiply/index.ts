import { Money } from '../..';
import _multiply from '../../fn/multiply';
import ROUNDING from '../../../constants/ROUNDING';

declare module '../../../Money' {
  interface Money {
    multiply: (value: number | string, rounding?: ROUNDING) => Money;
  }
}

Money.prototype.multiply = function multiply(value, rounding?): Money {
  return _multiply(this, value, rounding);
};
