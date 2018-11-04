import { CurrencyInputSettings } from '../Currency/CurrencyStore';
import Money from '../Money/Money';
import Currency from '../Currency/Currency';

/**
 * @example
 * Format value based on internal currency
 * ```js
 * Formatter.format(value);
 * ```
 *
 * @example
 * Format value based on currency parameter
 * ```js
 * Formatter.format(value, new Currency('USD'));
 * ```
 *
 * @example
 * Format value based on currency code
 * ```js
 * Formatter.format(value, 'USD');
 * ```
 *
 * @example
 * Format value based on custom settings
 * ```js
 * Formatter.format(value, {
 *  code: 'EUR',
 *  pattern: '%s%v'
 * });
 * ```
 */
export default class Formatter {

  /**
   * Format money based on settings
   * @param value - Monetary value to be formatted
   * @param settings - Formatting settings, currency code or currency
   * @returns - Formatted money string
   */
  static format(value: Money, settings?: CurrencyInputSettings|string|Currency): string {
    const {
      symbol,
      code,
      decimalDigits,
      thousandsSeparator,
      decimalSeparator,
      pattern,
      formatter,
      value: innerValue,
    } = this.getFormattingDetails(value, settings);

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
  }

  /**
   * Parse money based on settings
   * @param value - Monetary value to be parsed
   * @param settings - Parsing settings, currency code or currency
   * @returns - Parsed "Money" value
   */
  static parse(value: string, settings: CurrencyInputSettings|string|Currency): Money {
    const
      currency = this.getCurrency(settings),
      {
        symbol,
        code,
        thousandsSeparator,
        decimalSeparator,
        decimalDigits,
        pattern,
        parser,
      } = currency.getSettings();

    const numberValue = this
      .replaceMultipleStrings(value, {
        [thousandsSeparator]: '',
        [symbol]: '',
        [code]: '',
        [decimalSeparator]: '',
      })
      .replace(/\s/g, '');
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
  }

  /**
   * Replace multiple strings in another string
   * @param source - source string
   * @param group - search and replace string dictionary
   * @returns - final string result
   * @private
   */
  private static replaceMultipleStrings(source: string, group: { [key: string]: string }) {
    let result = source;
    for (const [search, replace] of Object.entries(group)) {
      result = this.replaceAllStringInstances(result, search, replace);
    }
    return result;
  }

  /**
   * Replace all case-insensitive instances of a string in another string
   * @param source - source string
   * @param search - search string
   * @param replacement - replacement string
   * @returns - final string result
   * @private
   */
  private static replaceAllStringInstances(source: string, search: string, replacement: string) {
    const
      esc = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
      reg = new RegExp(esc, 'ig');
    return source.replace(reg, replacement);
  }

  /**
   * Get formatting details
   * @param value - Monetary value to be formatted
   * @param settings - Formatting settings, currency code or currency
   * @returns - Formatting details
   * @private
   */
  private static getFormattingDetails(
    value: Money,
    settings?: CurrencyInputSettings|string|Currency,
  ) {
    const {
      symbol,
      code,
      thousandsSeparator,
      decimalSeparator,
      decimalDigits,
      pattern,
      formatter,
    } = this.getCurrency(settings, value).getSettings();

    let bigNumberValue;

    if (
      settings === undefined
      || (settings instanceof Currency && value.getCurrency().is(settings))
    ) {
      bigNumberValue = value.getAmountAsBigNumber();
    } else {
      const BN = value.getBigNumberConstructor().clone({
        FORMAT: {
          decimalSeparator,
          groupSeparator: thousandsSeparator,
          groupSize: 3,
          secondaryGroupSize: 0,
          fractionGroupSeparator: ' ',
          fractionGroupSize: 0,
        },
      });

      bigNumberValue = new BN(value.getAmountAsBigNumber());
    }

    return {
      symbol,
      code,
      decimalDigits,
      thousandsSeparator,
      decimalSeparator,
      pattern,
      formatter,
      value: bigNumberValue,
    };
  }

  /**
   * Get currency from the given settings and monetary value
   * @param settings - Formatting settings, currency code or currency
   * @param value - Monetary value to be formatted
   * @returns - Currency
   * @private
   */
  private static getCurrency(settings: CurrencyInputSettings|string|Currency = {}, value?: Money) {
    return Object.keys(settings).length === 0 && value instanceof Money
      ? value.getCurrency()
      : new Currency(settings);
  }
}
