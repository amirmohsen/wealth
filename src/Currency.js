import CurrencyStore from './CurrencyStore';
import Formatter from './Formatter';
import WrongInputError from './errors/WrongInputError';

/**
 * @example <caption>Using code</caption>
 * let currency = new Currency('USD');
 *
 * @example <caption>Using existing currency object</caption>
 * let currency = new Currency(new Currency('USD'));
 *
 * @example <caption>Using custom settings to create a one-off currency without registering it</caption>
 * let currency = new Currency({
 *  code: 'ETH',
 *  symbol: 'Ξ'
 * });
 */
export default class Currency {

	/**
	 * @param {string|object|Currency} currency - Currency string code, custom settings or instance of Currency
	 */
	constructor(currency) {
		/**
		 * @type {object} - an object holding currency details such as decimal digits, etc.
		 * @private
		 */
		this._currencySettings = this._preProcess(currency);
	}

	/**
	 * Check if the parameter currency the same as the current currency
	 * @param {string|Currency} currency - Currency string code or instance of Currency
	 * @returns {boolean} - returns true if the parameter currency is the same as the current currency
	 */
	is(currency) {
		currency = new Currency(currency);
		return this.getCode() === currency.getCode();
	}

	/**
	 * Get currency settings
	 * @returns {Object} - Currency settings
	 */
	getSettings() {
		return this._currencySettings;
	}

	/**
	 * Get currency code
	 * @returns {string} - Currency code
	 */
	toString() {
		return this.getCode();
	}

	/**
	 * Get currency code
	 * @returns {string} - Currency code
	 */
	toJSON() {
		return this.getCode();
	}

	/**
	 * Clone the currency instance
	 * @returns {Currency} - new Currency instance
	 */
	clone() {
		return new this.constructor(this.getCode());
	}

	/**
	 * Get currency code
	 * @returns {string} - Currency code
	 */
	getCode() {
		return this._currencySettings.code;
	}

	/**
	 * Get currency symbol
	 * @returns {string} - Currency symbol
	 */
	getSymbol() {
		return this._currencySettings.symbol;
	}

	/**
	 * Get currency thousands separator
	 * @returns {string} - Currency thousands separator
	 */
	getThousandsSeparator() {
		return this._currencySettings.thousandsSeparator;
	}

	/**
	 * Get currency decimal separator
	 * @returns {string} - Currency decimal separator
	 */
	getDecimalSeparator() {
		return this._currencySettings.decimalSeparator;
	}

	/**
	 * Get currency formatting pattern
	 * @returns {string} - Currency format pattern
	 */
	getPattern() {
		return this._currencySettings.pattern;
	}

	/**
	 * Get the number of decimal digits for this currency
	 * @returns {number} - Number of decimal digits
	 */
	getDecimalDigits() {
		return this._currencySettings.decimalDigits;
	}

	/**
	 * Get the formatter for this currency
	 * @returns {function|null|undefined} - Currency formatter
	 */
	getFormatter() {
		return this._currencySettings.formatter;
	}

	/**
	 * Get the parser for this currency
	 * @returns {function|null|undefined} - Currency parser
	 */
	getParser() {
		return this._currencySettings.parser;
	}

	/**
	 * Format a monetary value
	 * @param {Money} value - Monetary value to be formatted
	 * @param {object} [overrideSettings] - settings to override Currency's default formatting settings
	 * @returns {string} - Formatted string of the value
	 */
	format(value, overrideSettings = {}) {
		return Formatter.format(value, new Currency({
			...this._currencySettings,
			...overrideSettings
		}));
	}

	/**
	 * Parse a monetary value from a formatted value (same as `unformat`)
	 * @param {string} value - Formatted value to be parsed into a monetary value
	 * @param {object} [overrideSettings] - settings to override Currency's default formatting settings
	 * @returns {Money} - Parsed "Money" value
	 */
	parse(value, overrideSettings = {}) {
		return Formatter.parse(value, new Currency({
			...this._currencySettings,
			...overrideSettings
		}));
	}

	/**
	 * Used by the constructor to pre-process the input
	 * @param {string|object|Currency} currency - Currency code, settings or instance of Currency
	 * @returns {object} - Currency settings
	 */
	_preProcess(currency) {
		let settings = {};

		if(currency instanceof Currency) {
			settings = CurrencyStore.get(currency.getCode());
		}
		else if(typeof currency === 'string') {
			settings = CurrencyStore.get(currency);
		}
		else if(typeof currency === 'object') {
			let defaultSettings = {};

			if(currency.code) {
				defaultSettings = CurrencyStore.get(currency.code);
			}

			settings = {
				...defaultSettings,
				...settings
			};
		}
		else {
			throw new WrongInputError('Invalid currency provided.');
		}

		return settings;
	}

	/**
	 * Register (or replace) a currency
	 * @param {string} code - Currency code
	 * @param {object} [settings] - Currency settings
	 * @param {string} [settings.symbol=code] - Currency symbol (by default same as code)
	 * @param {string} [settings.thousandsSeparator=','] - Currency thousands separator
	 * @param {string} [settings.decimalSeparator='.'] -Currency decimal separator
	 * @param {number} [settings.decimalDigits=2] - Currency decimal digits
	 * @param {string} [settings.pattern='%ns%s%v'] - Currency formatting pattern. %ns is number sign's placeholder, %s is symbol's placeholder and $v is monetary value's placeholder.
	 * @param {?function(value: Money): string} [settings.formatter] - Currency formatter, optional (used instead of the pattern)
	 * @param {?function(value: string): Money} [settings.parser] - Currency parser, optional
	 */
	static register(code, settings) {
		return CurrencyStore.set(code, settings);
	}

	/**
	 * Get currency settings for the specified currency
	 * @param {string} code - Currency code
	 * @return {object} - Currency settings
	 */
	static getSettings(code) {
		return CurrencyStore.get(code);
	}

	/**
	 * Get an array of currency settings for all currencies
	 * @return {object[]} - Settings for all currencies
	 */
	static getAllSettings() {
		return CurrencyStore.getAll();
	}
}
