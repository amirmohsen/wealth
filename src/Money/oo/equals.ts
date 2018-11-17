import { Money } from '../../Money';
import equals from '../fn/equals';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    equals: (value: number|string|Money) => boolean;
  }
}

if (Money.prototype.equals) {
  throw new ClassAugmentationError(
    'The "equals" method has already been added to the "Money" class.',
  );
}

Money.prototype.equals = function (value) {
  return equals(this, value);
};
