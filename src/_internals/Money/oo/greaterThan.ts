import { Money } from '../../Money';
import greaterThan from '../fn/greaterThan';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    greaterThan: (value: number|string|Money) => boolean;
  }
}

if (Money.prototype.greaterThan) {
  throw new ClassAugmentationError(
    'The "greaterThan" method has already been added to the "Money" class.',
  );
}

Money.prototype.greaterThan = function (value) {
  return greaterThan(this, value);
};
