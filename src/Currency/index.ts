import isEqual from 'lodash.isequal';
import deepFreeze from 'deep-freeze';
import Money from '../Money';
import {
  register as registerCurrency,
  get as getRegisteredCurrency,
  isRegistered as isCurrencyRegistered,
} from '../CurrencyStore';
import WrongInputError from '../errors/WrongInputError';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';

export interface CurrencyFormatter {
  (settings: {
    value: Money;
    defaultFormatted: string;
    symbol: string;
    code: string;
    decimalDigits: number;
    thousandsSeparator: string;
    decimalSeparator: string;
    pattern: string;
  }): string;
}

export interface CurrencyParser {
  (settings: {
    symbol: string;
    code: string;
    thousandsSeparator: string;
    decimalSeparator: string;
    decimalDigits: number;
    pattern: string;
    value: string;
    defaultParsed: Money;
  }): Money;
}

export interface CurrencySettings {
  thousandsSeparator: string;
  decimalSeparator: string;
  decimalDigits: number;
  pattern: string;
  symbol: string;
  formatter?: CurrencyFormatter;
  parser?: CurrencyParser;
  code: string;
}

export interface CurrencyInputSettings {
  thousandsSeparator?: string;
  decimalSeparator?: string;
  decimalDigits?: number;
  pattern?: string;
  symbol?: string;
  formatter?: CurrencyFormatter;
  parser?: CurrencyParser;
  code?: string;
}

/**
 * @example
 * Using code
 * ```js
 * let currency = new Currency('USD');
 * ```
 *
 * @example
 * Using existing currency object
 * ```js
 * let currency = new Currency(new Currency('USD'));
 * ```
 *
 * @example
 * Using custom settings to create
 * a one-off currency without registering it
 * ```js
 * let currency = new Currency({
 *  code: 'ETH',
 *  symbol: 'Ξ'
 * });
 * ```
 */
export default class Currency {

  thousandsSeparator: string;
  decimalSeparator: string;
  decimalDigits: number;
  pattern: string;
  symbol: string;
  formatter?: CurrencyFormatter;
  parser?: CurrencyParser;
  code: string;

  /**
   * @param currency - Currency string code, custom settings or instance of Currency
   */
  constructor(currency: string|CurrencyInputSettings|Currency) {
    /**
     * an object holding currency details such as decimal digits, etc.
     */
    Object.assign(this, this.preProcess(currency));
    deepFreeze(this);
  }

  /**
   * Check if the parameter currency is the same as the current currency
   * @param currency - Currency string code or instance of Currency
   * @returns - returns true if the parameter currency is the same as the current currency
   */
  is(currency: string|Currency) {
    currency = new Currency(currency);
    return isEqual(this.settings, currency.settings);
  }

  /**
   * Get currency code
   * @returns - Currency code
   */
  toString() {
    return this.code;
  }

  /**
   * Get currency code
   * @returns - Currency code
   */
  toJSON() {
    return this.code;
  }

  /**
   * Clone the currency instance
   * @returns - new Currency instance
   */
  clone() {
    return new Currency(this.code);
  }

  /**
   * Get settings
   * @returns - Currency settings
   */
  get settings(): CurrencySettings {
    return {
      thousandsSeparator: this.thousandsSeparator,
      decimalSeparator: this.decimalSeparator,
      decimalDigits: this.decimalDigits,
      pattern: this.pattern,
      symbol: this.symbol,
      formatter: this.formatter,
      parser: this.parser,
      code: this.code,
    };
  }

  /**
   * Used by the constructor to pre-process the input
   * @param currency - Currency code, settings or instance of Currency
   * @returns - Currency settings
   */
  private preProcess(currency: string|CurrencyInputSettings|Currency) {
    let settings = {};

    if (currency instanceof Currency) {
      settings = currency.settings;
    } else if (typeof currency === 'string') {
      settings = getRegisteredCurrency(currency);
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

      if (isCurrencyRegistered(currency.code)) {
        defaultSettings = {
          ...defaultSettings,
          ...getRegisteredCurrency(currency.code) as CurrencySettings,
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
   * Creates a new instance of Currency
   * @param currency - Currency string code, custom settings or instance of Currency
   */
  static init(currency: string|CurrencyInputSettings|Currency): Currency {
    const CurrencyConstructor = this.constructor as typeof Currency;
    return new CurrencyConstructor(currency);
  }
}
