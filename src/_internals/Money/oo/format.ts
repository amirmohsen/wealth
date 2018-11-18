import { Money } from '../../Money';
import Currency, { CurrencyInputSettings } from '../../Currency';
import format from '../fn/format';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  interface Money {
    format: (settings?: CurrencyInputSettings|string|Currency) => string;
  }
}

if (Money.prototype.format) {
  throw new ClassAugmentationError(
    'The "format" method has already been added to the "Money" class.',
  );
}

Money.prototype.format = function (settings?) {
  return format(this, settings);
};
