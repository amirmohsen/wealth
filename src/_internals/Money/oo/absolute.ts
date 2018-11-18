import { Money } from '../../Money';
import absolute from '../fn/absolute';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    absolute: () => Money;
  }
}

if (Money.prototype.absolute) {
  throw new ClassAugmentationError(
    'The "absolute" method has already been added to the "Money" class.',
  );
}

Money.prototype.absolute = function () {
  return absolute(this);
};
