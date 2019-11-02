import Currency, { CurrencyInputSettings } from '../../../Currency';
import { Money } from '../..';
import _parse from '../../fn/parse';

declare module '../../../Money' {
  // eslint-disable-next-line @typescript-eslint/no-namespace,no-shadow
  namespace Money {
    // eslint-disable-next-line import/prefer-default-export
    export function parse(value: string, settings: CurrencyInputSettings | string | Currency): Money;
  }
}

Money.parse = _parse;
