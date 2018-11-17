import Currency, { CurrencyInputSettings } from '../../Currency';
import { Money } from '../../Money';
import parse from '../fn/parse';
import ClassAugmentationError from '../../errors/ClassAugmentationError';

declare module '../../Money' {
  namespace Money {
      export function parse(value: string, settings: CurrencyInputSettings|string|Currency): Money;
  }
}

if (Money.parse) {
  throw new ClassAugmentationError(
    'The "parse" static method has already been added to the "Money" class.',
  );
}

Money.parse = parse;
