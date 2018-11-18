import { Money } from '../../Money';
import subtract from '../fn/subtract';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    subtract: (value: number|string|Money) => Money;
  }
}

if (Money.prototype.subtract) {
  throw new ClassAugmentationError(
    'The "subtract" method has already been added to the "Money" class.',
  );
}

Money.prototype.subtract = function (value) {
  return subtract(this, value);
};
