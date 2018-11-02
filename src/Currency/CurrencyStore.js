import ISOCurrencies from './data/iso-currencies';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';

/**
 * Currency store
 * @example <caption>Set (register or replace) a currency</caption>
 * CurrencyStore.set('XBT', { // Settings is optional
 *  symbol: 'Ƀ', // Currency symbol (Default: same as code)
 *  thousandsSeparator: ',', // Currency thousands separator (Default: ',')
 *  decimalSeparator: '.', // Currency decimal separator (Default: '.')
 *  decimalDigits: 2, // Currency decimal digits (Default: 2)
 *  pattern: '%ns%s%v', // Currency pattern (Default: '%ns%s%v') - %ns is number sign's placeholder, %s is symbol's placeholder and $v is monetary value's placeholder.
 *  formatter: null, // Currency formatter (Default: null). Custom formatting function.
 *  parser: null // Currency parser (Default: null). Custom parsing function.
 * });
 *
 * @example <caption>Get currency settings</caption>
 * CurrencyStore.get('XBT');
 */
export default class CurrencyStore {

	/**
	 * @type {object} - Internal data store
	 * @private
	 */
	static _data = Object
		.entries(ISOCurrencies)
		.reduce((currencies, [code, currencySettings]) => ({
			...currencies,
			[code]: Object.freeze(currencySettings)
		}), {});

	/**
	 * Set (register or replace) a currency
	 * @param {string} code - Currency code
	 * @param {object} settings - Currency settings
	 */
	static set(code, settings) {
		if(typeof code !== 'string' || !code) {
			throw new InvalidCurrencyError('Invalid currency settings; code is required.');
		}

		settings = {
			...settings,
			thousandsSeparator: ',',
			decimalSeparator: '.',
			decimalDigits: 2,
			pattern: '%ns%s%v',
			symbol: settings.symbol || code,
			formatter: null,
			parser: null,
			code
		};

		this._data[code.toUpperCase()] = Object.freeze(settings);
	}

	/**
	 * Get currency settings
	 * @param code - Currency code
	 * @returns {object} - Currency settings
	 */
	static get(code) {
		if(!this.has(code)) {
			throw new InvalidCurrencyError(`No currency with code "${code}" is registered.`);
		}
		return this._data[code.toUpperCase()];
	}

	/**
	 * Check if currency has been registered
	 * @param code - Currency code
	 * @returns {boolean} - True if currency has been registered
	 */
	static has(code) {
		return !!this._data[code.toUpperCase()];
	}

	/**
	 * Delete a registered currency
	 * @param code - Currency code
	 */
	static del(code) {
		delete this._data[code.toUpperCase()];
	}

	/**
	 * Get all registered currencies
	 * @returns {array} - List of currencies, sorted by code alphabetically
	 */
	static getAll() {
		return Object
			.values(this._data)
			.reduce((all, settings) => [ ...all, settings ], [])
			.sort((a, b) => a.code.localeCompare(b.code));
	}
}
