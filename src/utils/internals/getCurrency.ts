import Money from '../../Money';
import Currency, { CurrencyInputSettings } from '../../Currency';

/**
 * Get currency from the given settings and monetary value
 * @param settings - Formatting settings, currency code or currency
 * @param value - Monetary value to be formatted
 * @returns - Currency
 * @private
 */
const getCurrency = (
  settings?: CurrencyInputSettings|string|Currency,
  value?: Money,
) => {
  return !settings && value instanceof Money
    ? value.currency
    : new Currency(settings as string);
};

export default getCurrency;
