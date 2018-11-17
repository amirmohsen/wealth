import Currency, { CurrencyInputSettings } from '../../../Currency';
import { Money } from '../..';
import { getFormattingDetails } from './internals';

/**
 * Format money based on settings
 * @param value - Monetary value to be formatted
 * @param settings - Formatting settings, currency code or currency
 * @returns - Formatted money string
 */
const format = (value: Money, settings?: CurrencyInputSettings|string|Currency): string => {
  const {
    symbol,
    code,
    decimalDigits,
    thousandsSeparator,
    decimalSeparator,
    pattern,
    formatter,
    value: innerValue,
  } = getFormattingDetails(value, settings);

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
