import { Money } from '../../Money';
import multiply from '../fn/multiply';
import ROUNDING from '../../constants/ROUNDING';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    multiply: (value: number|string, rounding: ROUNDING) => Money;
  }
}

if (Money.prototype.multiply) {
  throw new ClassAugmentationError(
    'The "multiply" method has already been added to the "Money" class.',
  );
}

Money.prototype.multiply = function (value, rounding) {
  return multiply(this, value, rounding);
};
