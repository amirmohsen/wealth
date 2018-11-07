import deepFreeze, { DeepReadonly } from 'deep-freeze';
import Money from '../Money/Money';
import ISOCurrencies from './data/iso-currencies';
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

interface CurrencySettingsInternalStore {
  [key: string]: DeepReadonly<CurrencySettings>;
}

/**
 * Currency store
 * @example
 * Set (register or replace) a currency
 * ```js
 * CurrencyStore.set('XBT', { // Settings is optional
 *  symbol: 'Ƀ', // Currency symbol (Default: same as code)
 *  thousandsSeparator: ',', // Currency thousands separator (Default: ',')
 *  decimalSeparator: '.', // Currency decimal separator (Default: '.')
 *  decimalDigits: 2, // Currency decimal digits (Default: 2)
 *  pattern: '%ns%s%v', // Currency pattern (Default: '%ns%s%v')
 *  // %ns is number sign's placeholder
 *  // %s is symbol's placeholder
 *  // $v is monetary value's placeholder.
 *  formatter: null, // Currency formatter (Default: null). Custom formatting function.
 *  parser: null // Currency parser (Default: null). Custom parsing function.
 * });
 * ```
 *
 * @example
 * Get currency settings
 * ```js
 * CurrencyStore.get('XBT');
 * ```
 */
export default class CurrencyStore {

  /**
   * @type Internal data store
   */
  private static data: CurrencySettingsInternalStore = Object
    .entries(ISOCurrencies)
    .reduce(
      (currencies, [code, currencySettings]) => ({
        ...currencies,
        [code]: deepFreeze(currencySettings),
      }),
      {},
    );

  /**
   * Set (register or replace) a currency
   * @param code - Currency code
   * @param settings - Currency settings
   */
  public static set(code: string, settings: CurrencyInputSettings = {}) {
    if (typeof code !== 'string' || !code) {
      throw new InvalidCurrencyError('Invalid currency settings; code is required.');
    }

    const finalSettings: CurrencySettings = {
      ...settings,
      code,
      thousandsSeparator: ',',
      decimalSeparator: '.',
      decimalDigits: 2,
      pattern: '%ns%s%v',
      symbol: settings.symbol || code,
    };

    this.data[code.toUpperCase()] = deepFreeze(finalSettings);
  }

  /**
   * Get currency settings
   * @param code - Currency code
   * @returns - Currency settings
   */
  public static get(code: string) {
    if (!this.has(code)) {
      throw new InvalidCurrencyError(`No currency with code "${code}" is registered.`);
    }
    return this.data[code.toUpperCase()];
  }

  /**
   * Check if currency has been registered
   * @param code - Currency code
   * @returns - True if currency has been registered
   */
  public static has(code: string) {
    return code.toUpperCase() in this.data;
  }

  /**
   * Delete a registered currency
   * @param code - Currency code
   */
  public static del(code: string) {
    return delete this.data[code.toUpperCase()];
  }

  /**
   * Get all registered currencies
   * @returns - List of currencies, sorted by code alphabetically
   */
  public static getAll(): CurrencySettings[] {
    return Object
      .values(this.data)
      .reduce(
        (
          all: CurrencySettings[],
          settings: DeepReadonly<CurrencySettings>,
        ) => [...all, settings as CurrencySettings],
        [],
        )
      .sort((a: CurrencySettings, b: CurrencySettings) => a.code.localeCompare(b.code));
  }
}
