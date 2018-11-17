import { Money } from '../../Money';
import greaterThanOrEqualTo from '../fn/greaterThanOrEqualTo';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    greaterThanOrEqualTo: (value: number|string|Money) => boolean;
  }
}

if (Money.prototype.greaterThanOrEqualTo) {
  throw new ClassAugmentationError(
    'The "greaterThanOrEqualTo" method has already been added to the "Money" class.',
  );
}

Money.prototype.greaterThanOrEqualTo = function (value) {
  return greaterThanOrEqualTo(this, value);
};
