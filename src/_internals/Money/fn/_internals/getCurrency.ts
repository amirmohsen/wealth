import { Money } from '../..';
import Currency, { CurrencyInputSettings } from '../../../Currency';

/**
 * Get currency from the given settings and monetary value
 * @param settings - Formatting settings, currency code or currency
 * @param value - Monetary value to be formatted
 * @returns - Currency
 * @private
 */
const getCurrency = (settings?: CurrencyInputSettings | string | Currency, value?: Money): Currency => {
  let finalSettings = {};

  if (value instanceof Money) {
    finalSettings = value.currency.settings;
  }

  if (typeof settings === 'object') {
    finalSettings = {
      ...finalSettings,
      ...settings,
    };
  }

  if (typeof settings === 'string') {
    finalSettings = {
      code: settings,
    };
  }

  return new Currency(finalSettings as CurrencyInputSettings);
};

export default getCurrency;
