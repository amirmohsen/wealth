import isEqual from 'lodash.isequal';
import Money from '../Money/Money';
import CurrencyStore, { CurrencySettings, CurrencyInputSettings } from './CurrencyStore';
import Formatter from '../Formatter/Formatter';
import WrongInputError from '../errors/WrongInputError';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';

/**
 * @example <caption>Using code</caption>
 * let currency = new Currency('USD');
 *
 * @example <caption>Using existing currency object</caption>
 * let currency = new Currency(new Currency('USD'));
 *
 * @example <caption>Using custom settings to create
 * a one-off currency without registering it</caption>
 * let currency = new Currency({
 *  code: 'ETH',
 *  symbol: 'Ξ'
 * });
 */
export default class Currency {

  private currencySettings: CurrencySettings;

  /**
   * @param currency - Currency string code, custom settings or instance of Currency
   */
  constructor(currency: string|CurrencyInputSettings|Currency) {
    /**
     * an object holding currency details such as decimal digits, etc.
     */
    this.currencySettings = this.preProcess(currency);
  }

  /**
   * Check if the parameter currency is the same as the current currency
   * @param currency - Currency string code or instance of Currency
   * @returns - returns true if the parameter currency is the same as the current currency
   */
  is(currency: string|Currency) {
    currency = new Currency(currency);
    return isEqual(this.getSettings(), currency.getSettings());
  }

  /**
   * Get currency settings
   * @returns - Currency settings
   */
  getSettings() {
    return this.currencySettings;
  }

  /**
   * Get currency code
   * @returns - Currency code
   */
  toString() {
    return this.getCode();
  }

  /**
   * Get currency code
   * @returns - Currency code
   */
  toJSON() {
    return this.getCode();
  }

  /**
   * Clone the currency instance
   * @returns - new Currency instance
   */
  clone() {
    return new Currency(this.getCode());
  }

  /**
   * Get currency code
   * @returns - Currency code
   */
  getCode() {
    return this.currencySettings.code;
  }

  /**
   * Get currency symbol
   * @returns - Currency symbol
   */
  getSymbol() {
    return this.currencySettings.symbol;
  }

  /**
   * Get currency thousands separator
   * @returns - Currency thousands separator
   */
  getThousandsSeparator() {
    return this.currencySettings.thousandsSeparator;
  }

  /**
   * Get currency decimal separator
   * @returns - Currency decimal separator
   */
  getDecimalSeparator() {
    return this.currencySettings.decimalSeparator;
  }

  /**
   * Get currency formatting pattern
   * @returns - Currency format pattern
   */
  getPattern() {
    return this.currencySettings.pattern;
  }

  /**
   * Get the number of decimal digits for this currency
   * @returns - Number of decimal digits
   */
  getDecimalDigits() {
    return this.currencySettings.decimalDigits;
  }

  /**
   * Get the formatter for this currency
   * @returns - Currency formatter
   */
  getFormatter() {
    return this.currencySettings.formatter;
  }

  /**
   * Get the parser for this currency
   * @returns - Currency parser
   */
  getParser() {
    return this.currencySettings.parser;
  }

  /**
   * Format a monetary value
   * @param value - Monetary value to be formatted
   * @param overrideSettings - settings to override Currency's default formatting settings
   * @returns - Formatted string of the value
   */
  format(value: Money, overrideSettings: CurrencyInputSettings = {}) {
    return Formatter.format(value, new Currency({
      ...this.currencySettings,
      ...overrideSettings,
    }));
  }

  /**
   * Parse a monetary value from a formatted value (same as `unformat`)
   * @param value - Formatted value to be parsed into a monetary value
   * @param overrideSettings - settings to override Currency's default formatting settings
   * @returns - Parsed "Money" value
   */
  parse(value: string, overrideSettings: CurrencyInputSettings = {}) {
    return Formatter.parse(value, new Currency({
      ...this.currencySettings,
      ...overrideSettings,
    }));
  }

  /**
   * Used by the constructor to pre-process the input
   * @param currency - Currency code, settings or instance of Currency
   * @returns - Currency settings
   */
  private preProcess(currency: string|CurrencyInputSettings|Currency) {
    let settings = {};

    if (currency instanceof Currency) {
      settings = currency.getSettings();
    } else if (typeof currency === 'string') {
      settings = CurrencyStore.get(currency);
    } else if (typeof currency === 'object') {
      if (typeof currency.code !== 'string' || !currency.code) {
        throw new InvalidCurrencyError('Invalid currency settings; code is required.');
      }

      let defaultSettings = {
        thousandsSeparator: ',',
        decimalSeparator: '.',
        decimalDigits: 2,
        pattern: '%s%ns%v',
        symbol: currency.code,
      };

      if (CurrencyStore.has(currency.code)) {
        defaultSettings = {
          ...defaultSettings,
          ...CurrencyStore.get(currency.code),
        };
      }

      settings = {
        ...defaultSettings,
        ...currency,
      };
    } else {
      throw new WrongInputError('Invalid currency provided.');
    }

    return settings as CurrencySettings;
  }

  /**
   * Register (or replace) a currency
   * @param code - Currency code
   * @param settings - Currency settings
   * @param settings.symbol=code - Currency symbol (by default same as code)
   * @param settings.thousandsSeparator=',' - Currency thousands separator
   * @param settings.decimalSeparator='.' - Currency decimal separator
   * @param settings.decimalDigits=2 - Currency decimal digits
   * @param settings.pattern='%ns%s%v' - Currency formatting pattern.
   * %ns is number sign's placeholder,
   * %s is symbol's placeholder,
   * $v is monetary value's placeholder
   * $i is monetary value as an integer if decimal digits are zero.
   * @param settings.formatter - Currency formatter, optional (used instead of the pattern)
   * @param settings.parser - Currency parser, optional
   */
  static register(code: string, settings: CurrencyInputSettings) {
    return CurrencyStore.set(code, settings);
  }

  /**
   * Get currency settings for the specified currency
   * @param code - Currency code
   * @return - Currency settings
   */
  static getSettings(code: string): CurrencySettings {
    return CurrencyStore.get(code);
  }

  /**
   * Get an array of currency settings for all currencies
   * @return - Settings for all currencies
   */
  static getAllSettings(): CurrencySettings[] {
    return CurrencyStore.getAll();
  }
}
