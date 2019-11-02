import { Money } from '../..';
import Currency, { CurrencyInputSettings } from '../../../Currency';
import _format from '../../fn/format';

declare module '../../../Money' {
  interface Money {
    format: (settings?: CurrencyInputSettings | string | Currency) => string;
  }
}

Money.prototype.format = function format(settings?): string {
  return _format(this, settings);
};
