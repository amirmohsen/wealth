import { Money } from '../../Money';
import floor from '../fn/floor';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    floor: () => Money;
  }
}

if (Money.prototype.floor) {
  throw new ClassAugmentationError(
    'The "floor" method has already been added to the "Money" class.',
  );
}

Money.prototype.floor = function () {
  return floor(this);
};
