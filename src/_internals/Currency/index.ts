import isEqual from 'lodash.isequal';
import deepFreeze from 'deep-freeze';
import Money from '../Money';
import { getRegisteredCurrency, isCurrencyRegistered } from '../CurrencyStore';
import WrongInputError from '../errors/WrongInputError';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';
import getDefaultSettings from './getDefaultSettings';

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
  code: string;
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
  constructor(currency: string | CurrencyInputSettings | Currency) {
    const {
      thousandsSeparator,
      decimalSeparator,
      decimalDigits,
      pattern,
      symbol,
      formatter,
      parser,
      code,
    } = this.preProcess(currency);
    this.thousandsSeparator = thousandsSeparator;
    this.decimalSeparator = decimalSeparator;
    this.decimalDigits = decimalDigits;
    this.pattern = pattern;
    this.symbol = symbol;
    this.formatter = formatter;
    this.parser = parser;
    this.code = code;
    deepFreeze(this);
  }

  /**
   * Check if the parameter currency is the same as the current currency
   * @param currencyInput - Currency string code or instance of Currency
   * @returns - returns true if the parameter currency is the same as the current currency
   */
  is(currencyInput: string | Currency): boolean {
    const CurrencyConstructor = this.constructor as typeof Currency;
    const currency = new CurrencyConstructor(currencyInput);
    return isEqual(this.settings, currency.settings);
  }

  /**
   * Get currency code
   * @returns - Currency code
   */
  toString(): string {
    return this.code;
  }

  /**
   * Get currency code
   * @returns - Currency code
   */
  toJSON(): string {
    return this.code;
  }

  /**
   * Clone the currency instance
   * @returns - new Currency instance
   */
  clone(): Currency {
    const CurrencyConstructor = this.constructor as typeof Currency;
    return new CurrencyConstructor(this.settings);
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
  private preProcess(currency: string | CurrencyInputSettings | Currency): CurrencySettings {
    let settings = {};

    if (currency instanceof Currency) {
      settings = currency.settings;
    } else if (currency && typeof currency === 'string') {
      settings = getRegisteredCurrency(currency);
    } else if (currency && typeof currency === 'object' && !Array.isArray(currency)) {
      if (typeof currency.code !== 'string' || !currency.code) {
        throw new InvalidCurrencyError('Invalid currency settings; code is required.');
      }

      let defaultSettings = getDefaultSettings(currency.code);

      if (isCurrencyRegistered(currency.code)) {
        defaultSettings = {
          ...defaultSettings,
          ...(getRegisteredCurrency(currency.code) as CurrencySettings),
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
  static init(currency: string | CurrencyInputSettings | Currency): Currency {
    const CurrencyConstructor = this as typeof Currency;
    return new CurrencyConstructor(currency);
  }
}
