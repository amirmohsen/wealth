import { Money } from '../../../Money';
import Currency, { CurrencyInputSettings } from '../../../Currency';
import format from '../../fn/format';

declare module '../../../Money' {
  interface Money {
    format: (settings?: CurrencyInputSettings|string|Currency) => string;
  }
}

Money.prototype.format = function (settings?) {
  return format(this, settings);
};
