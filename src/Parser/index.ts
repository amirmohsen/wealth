import Currency, { CurrencyInputSettings } from '../Currency';
import Money from '../Money';
import { getCurrency } from '../utils/internals';
import { replaceMultipleStrings } from './internals';

/**
 * Parse money based on settings
 * @param value - Monetary value to be parsed
 * @param settings - Parsing settings, currency code or currency
 * @returns - Parsed "Money" value
 */
export const addParser = (MoneyConstructor: any) => {
  const parse = (value: string, settings: CurrencyInputSettings|string|Currency): Money => {
    const
      currency = getCurrency(settings),
      {
        symbol,
        code,
        thousandsSeparator,
        decimalSeparator,
        decimalDigits,
        pattern,
        parser,
      } = currency.settings;

    const numberValue = replaceMultipleStrings(value, {
      [thousandsSeparator]: '',
      [symbol]: '',
      [code]: '',
      [decimalSeparator]: '',
    })
    .replace(/\s/g, '');
    const defaultParsed = new MoneyConstructor(numberValue, currency);

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

  MoneyConstructor.parse = parse;

  return MoneyConstructor;
};

export default addParser;
