import ISOCurrencies from './data/iso-currencies';
import InvalidCurrencyError from './errors/InvalidCurrencyError';

/**
 * Currency store
 * @example <caption>Set (register or replace) a currency</caption>
 * CurrencyStore.set('XBT', { // Settings is optional
 *  symbol: 'Ƀ', // Currency symbol (Default: same as code)
 *  thousandsSeparator: ',', // Currency thousands separator (Default: ',')
 *  decimalSeparator: '.', // Currency decimal separator (Default: '.')
 *  decimalDigits: 2, // Currency decimal digits (Default: 2)
 *  pattern: '%ns%s%v', // Currency pattern (Default: '%ns%v')
 *  formatter: null, // Currency formatter (Default: null). Custom formatting function.
 *  parser: null // Currency parser (Default: null). Custom parsing function.
 * });
 *
 * @example <caption>Get currency settings</caption>
 * CurrencyStore.get('XBT');
 */
class CurrencyStore {

	/**
	 * @type {object} - Internal data store
	 * @private
	 */
	_data = {
		...ISOCurrencies
	};

	/**
	 * Set (register or replace) a currency
	 * @param {string} code - Currency code
	 * @param {object} settings - Currency settings
	 */
	set(code, settings) {
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

		this._data[code] = settings;
	}

	/**
	 * Get currency settings
	 * @param code - Currency code
	 * @returns {object} - Currency settings
	 */
	get(code) {
		return this._data[code];
	}

	/**
	 * Check if currency has been registered
	 * @param code - Currency code
	 * @returns {boolean} - True if currency has been registered
	 */
	has(code) {
		return !!this.get(code);
	}

	/**
	 * Delete a registered currency
	 * @param code - Currency code
	 */
	del(code) {
		delete this._data[code];
	}

	/**
	 * Get all registered currencies
	 * @returns {array} - List of currencies, sorted by code alphabetically
	 */
	getAll() {
		return Object
			.values(this._data)
			.reduce((settings, all) => all.concat([settings]), [])
			.sort((a, b) => a.code.localeCompare(b.code));
	}
}

export default new CurrencyStore();
