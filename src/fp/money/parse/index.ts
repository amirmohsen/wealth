import Currency, { CurrencyInputSettings } from '../../../Currency';
import { Money } from '../..';
import { getCurrency } from '../_internals';
import replaceMultipleStrings from './replaceMultipleStrings';

/**
 * Parse money based on settings
 * @param value - Monetary value to be parsed
 * @param settings - Parsing settings, currency code or currency
 * @returns - Parsed "Money" value
 */
const parse = (value: string, settings: CurrencyInputSettings | string | Currency): Money => {
  const currency = getCurrency(settings);
  const { symbol, code, thousandsSeparator, decimalSeparator, decimalDigits, pattern, parser } = currency.settings;

  const numberValue = replaceMultipleStrings(value, {
    [thousandsSeparator]: '',
    [symbol]: '',
    [code]: '',
    [decimalSeparator]: '',
  }).replace(/\s/g, '');
  const defaultParsed = new Money(numberValue, currency);

  if (typeof parser === 'function') {
    return parser({
      symbol,
      code,
      thousandsSeparator,
      decimalSeparator,
      decimalDigits,
      pattern,
      value,
      defaultParsed,
    });
  }

  return defaultParsed;
};

export default parse;
