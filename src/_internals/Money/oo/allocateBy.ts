import { Money } from '../../Money';
import allocateBy from '../fn/allocateBy';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    allocateBy: (count: number|string) => Money[];
  }
}

if (Money.prototype.allocateBy) {
  throw new ClassAugmentationError(
    'The "allocateBy" method has already been added to the "Money" class.',
  );
}

Money.prototype.allocateBy = function (count) {
  return allocateBy(this, count);
};
