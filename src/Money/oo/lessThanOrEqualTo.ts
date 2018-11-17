import { Money } from '../../Money';
import lessThanOrEqualTo from '../fn/lessThanOrEqualTo';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    lessThanOrEqualTo: (value: number|string|Money) => boolean;
  }
}

if (Money.prototype.lessThanOrEqualTo) {
  throw new ClassAugmentationError(
    'The "lessThanOrEqualTo" method has already been added to the "Money" class.',
  );
}

Money.prototype.lessThanOrEqualTo = function (value) {
  return lessThanOrEqualTo(this, value);
};
