import Currency, { CurrencyInputSettings } from '../../../Currency';
import { Money } from '../../../Money';
import parse from '../../fn/parse';

declare module '../../../Money' {
  namespace Money {
      export function parse(value: string, settings: CurrencyInputSettings|string|Currency): Money;
  }
}

Money.parse = parse;
