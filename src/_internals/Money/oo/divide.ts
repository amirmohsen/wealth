import { Money } from '../../Money';
import divide from '../fn/divide';
import ROUNDING from '../../constants/ROUNDING';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    divide: (value: number|string, rounding: ROUNDING) => Money;
  }
}

if (Money.prototype.divide) {
  throw new ClassAugmentationError(
    'The "divide" method has already been added to the "Money" class.',
  );
}

Money.prototype.divide = function (value, rounding) {
  return divide(this, value, rounding);
};
