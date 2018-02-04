import CurrencyFormatter from 'currency-formatter';

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
		this._currencySettings = CurrencyFormatter.findCurrency(this._preProcess(currency));
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
	 * Does the currency symbol go to the left of the value?
	 * @returns {boolean} - True if currency symbol goes to the left of the value.
	 */
	hasSymbolOnLeft() {
		return this._currencySettings.symbolOnLeft;
	}

	/**
	 * Is there a space between amount and symbol of the currency?
	 * @returns {boolean} - True if there's a symbol between amount and symbol of the currency.
	 */
	hasSpaceBetweenAmountAndSymbol() {
		return this._currencySettings.spaceBetweenAmountAndSymbol;
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
	 * @param {string|number} value - Monetary value to be formatted
	 * @returns {string} - Formatted string of the value
	 */
	format(value) {
		return CurrencyFormatter.format(value, {
			code: this._currencySettings.code
		});
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
		return CurrencyFormatter.unformat(value, {
			code: this._currencySettings.code
		}).toString();
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
		return CurrencyFormatter.findCurrency(code);
	}

	/**
	 * Get an array of currency settings for all currencies
	 * @return {object[]} - Settings for all currencies
	 */
	static getAllCurrenciesSettings() {
		return CurrencyFormatter.currencies;
	}
}
