import Currency, { CurrencyInputSettings } from '../../../Currency';
import { Money } from '../..';
import { getFormattingDetails } from './internals';

export interface FormattingSettings {
  thousandsSeparator?: CurrencyInputSettings['thousandsSeparator'];
  decimalSeparator?: CurrencyInputSettings['decimalSeparator'];
  decimalDigits?: CurrencyInputSettings['decimalDigits'];
  pattern?: CurrencyInputSettings['pattern'];
  symbol?: CurrencyInputSettings['symbol'];
  formatter?: CurrencyInputSettings['formatter'];
  parser?: CurrencyInputSettings['parser'];
  code?: CurrencyInputSettings['code'];
}

/**
 * Format money based on settings
 * @param value - Monetary value to be formatted
 * @param settings - Formatting settings, currency code or currency
 * @returns - Formatted money string
 */
const format = (value: Money, settings?: FormattingSettings|string|Currency): string => {
  const {
    symbol,
    code,
    decimalDigits,
    thousandsSeparator,
    decimalSeparator,
    pattern,
    formatter,
    value: innerValue,
  } = getFormattingDetails(value, settings as CurrencyInputSettings);

  const formattedValue = innerValue.absoluteValue().toFormat(decimalDigits);
  const defaultFormatted = pattern
    .replace('%v', formattedValue)
    .replace('%ns', innerValue.isNegative() ? '-' : '')
    .replace('%i', innerValue.isInteger() ? innerValue.toFormat(0) : formattedValue)
    .replace('%s', symbol)
    .replace('%c', code);

  if (typeof formatter === 'function') {
    return formatter({
      value,
      defaultFormatted,
      symbol,
      code,
      decimalDigits,
      thousandsSeparator,
      decimalSeparator,
      pattern,
    });
  }

  return defaultFormatted;
};

export default format;
