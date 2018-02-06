import CurrencyStore from './CurrencyStore';
import Formatter from './Formatter';

/**
 * @example
 * let currency = new Currency('USD');
 */
export default class Currency {

	/**
	 * @param {string|Currency} currency - Currency string code or instance of Currency
	 */
	constructor(currency) {
		/**
		 * @type {object} - an object holding currency details such as decimal digits, etc.
		 * @private
		 */
		this._currencySettings = CurrencyStore.get(this._preProcess(currency));
	}

	/**
	 * Check if the paremeter currency the same as the current currency
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
	 * Format a monetary value
	 * @param {Money} value - Monetary value to be formatted
	 * @returns {string} - Formatted string of the value
	 */
	format(value) {
		return Formatter.format(value, this);
	}

	/**
	 * Unformat a monetary value from a formatted value (same as `parse`)
	 * @param {string} value - Formatted value to be parsed into a monetary value
	 * @returns {string} - Parsed monetary value
	 */
	unformat(value) {
		return this.parse(value);
	}

	/**
	 * Parse a monetary value from a formatted value (same as `unformat`)
	 * @param {string} value - Formatted value to be parsed into a monetary value
	 * @returns {string} - Parsed monetary value
	 */
	parse(value) {
		return Formatter.parse(value, this);
	}

	/**
	 * Used by the constructor to pre-process the input
	 * @param {string|Currency} currency - Currency code or instance of Currency
	 * @returns {string} - Currency code
	 */
	_preProcess(currency) {
		if(currency instanceof Currency) {
			return currency.getCode();
		}
		return currency;
	}

	/**
	 * Get currency settings for the specified currency
	 * @param {string} code - Currency code
	 * @return {object} - Currency settings
	 */
	static getCurrencySettings(code) {
		return CurrencyStore.get(code);
	}

	/**
	 * Get an array of currency settings for all currencies
	 * @return {object[]} - Settings for all currencies
	 */
	static getAllCurrenciesSettings() {
		return CurrencyStore.getAll();
	}
}
