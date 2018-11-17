import { Money } from '../../Money';
import lessThan from '../fn/lessThan';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    lessThan: (value: number|string|Money) => boolean;
  }
}

if (Money.prototype.lessThan) {
  throw new ClassAugmentationError(
    'The "lessThan" method has already been added to the "Money" class.',
  );
}

Money.prototype.lessThan = function (value) {
  return lessThan(this, value);
};
