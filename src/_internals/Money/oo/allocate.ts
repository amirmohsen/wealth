import { Money } from '../../Money';
import allocate from '../fn/allocate';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    allocate: (ratios: (string|number)[]) => Money[];
  }
}

if (Money.prototype.allocate) {
  throw new ClassAugmentationError(
    'The "allocate" method has already been added to the "Money" class.',
  );
}

Money.prototype.allocate = function (ratios) {
  return allocate(this, ratios);
};
