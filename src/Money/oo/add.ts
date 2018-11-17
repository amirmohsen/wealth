import { Money } from '../../Money';
import add from '../fn/add';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    add: (value: number|string|Money) => Money;
  }
}

if (Money.prototype.add) {
  throw new ClassAugmentationError(
    'The "add" method has already been added to the "Money" class.',
  );
}

Money.prototype.add = function (value) {
  return add(this, value);
};
