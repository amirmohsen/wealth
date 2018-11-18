import { Money } from '../../Money';
import ceil from '../fn/ceil';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    ceil: () => Money;
  }
}

if (Money.prototype.ceil) {
  throw new ClassAugmentationError(
    'The "ceil" method has already been added to the "Money" class.',
  );
}

Money.prototype.ceil = function () {
  return ceil(this);
};
