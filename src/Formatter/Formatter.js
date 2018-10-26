import InvalidCurrencyError from '../errors/InvalidCurrencyError';
import CurrencyStore from '../Currency/CurrencyStore';
import Money from '../Money/Money';
import Currency from '../Currency/Currency';

/**
 * @example <caption>Format value based on internal currency</caption>
 * Formatter.format(value);
 *
 * @example <caption>Format value based on currency parameter</caption>
 * Formatter.format(value, new Currency('USD'));
 *
 * @example <caption>Format value based on currency code</caption>
 * Formatter.format(value, 'USD');
 *
 * @example <caption>Format value based on custom settings</caption>
 * Formatter.format(value, {
 *  code: 'EUR',
 *  pattern: '%s%v'
 * });
 */
export default class Formatter {

	/**
	 * Format money based on settings
	 * @param {Money} value - Monetary value to be formatted
	 * @param {object|string|Currency} [settings] - Formatting settings, currency code or currency
	 * @returns {string} - Formatted money string
	 */
	static format(value, settings) {
		const {
			symbol,
			code,
			decimalDigits,
			thousandsSeparator,
			decimalSeparator,
			pattern,
			formatter,
			value: innerValue
		} = this._getFormattingDetails(value, settings);

		let
			formattedValue = innerValue.absoluteValue().toFormat(decimalDigits),
			defaultFormatted = pattern.replace('%v', formattedValue);

		defaultFormatted = defaultFormatted.replace('%ns', innerValue.isNegative() ? '-' : '');

		defaultFormatted = defaultFormatted.replace('%i', innerValue.isInteger() ? innerValue.toFormat(0) : formattedValue);

		if(symbol) {
			defaultFormatted = defaultFormatted.replace('%s', symbol);
		}

		if(code) {
			defaultFormatted = defaultFormatted.replace('%c', code);
		}

		if(typeof formatter === 'function') {
			return formatter({
				value,
				defaultFormatted,
				symbol,
				code,
				decimalDigits,
				thousandsSeparator,
				decimalSeparator,
				pattern
			});
		}

		return defaultFormatted;
	}

	/**
	 * Parse money based on settings
	 * @param {string} value - Monetary value to be parsed
	 * @param {object|string|Currency} settings - Parsing settings, currency code or currency
	 * @returns {Money} - Parsed "Money" value
	 */
	static parse(value, settings) {
		let
			options = this._getOptions(settings),
			{
				symbol,
				code,
				thousandsSeparator,
				decimalSeparator,
				decimalDigits,
				pattern,
				parser
			} = options;

		let defaultParsed = this._replaceAll(value, thousandsSeparator, '');
		defaultParsed = this._replaceAll(defaultParsed, symbol, '');
		defaultParsed = this._replaceAll(defaultParsed, code, '');
		defaultParsed = this._replaceAll(defaultParsed, decimalSeparator, '');
		defaultParsed =	defaultParsed.replace(/\s/g, '');
		defaultParsed = new Money(defaultParsed, code);

		if(typeof parser === 'function') {
			return parser({
				symbol,
				code,
				thousandsSeparator,
				decimalSeparator,
				decimalDigits,
				pattern,
				value,
				defaultParsed
			});
		}

		return defaultParsed;
	}

	/**
	 * Replace all case-insensitive instances of a string in another string
	 * @param {string} source - source string
	 * @param {string} search - search string
	 * @param {string} replacement - replacement string
	 * @returns {string} - final string result
	 * @private
	 */
	static _replaceAll(source, search, replacement) {
		let
			esc = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
			reg = new RegExp(esc, 'ig');
		return source.replace(reg, replacement);
	}

	/**
	 * Get formatting details
	 * @param {Money} value - Monetary value to be formatted
	 * @param {object|string|Currency} [settings] - Formatting settings, currency code or currency
	 * @returns {{symbol: string, code: string, value: BigNumber, decimalDigits: number, pattern: string}} - Formatting details
	 * @private
	 */
	static _getFormattingDetails(value, settings) {
		let {
			symbol,
			code,
			thousandsSeparator,
			decimalSeparator,
			decimalDigits,
			pattern,
			formatter
		} = this._getOptions(settings, value);

		if(settings === undefined || (settings instanceof Currency && value.getCurrency().is(settings))) {
			value = value.getAmountAsBigNumber();
		}
		else {
			const BN = value.getBigNumberConstructor().clone({
				FORMAT: {
					decimalSeparator,
					groupSeparator: thousandsSeparator,
					groupSize: 3,
					secondaryGroupSize: 0,
					fractionGroupSeparator: ' ',
					fractionGroupSize: 0
				}
			});

			value = new BN(value.getAmountAsBigNumber());
		}

		return {
			symbol,
			code,
			value,
			decimalDigits,
			thousandsSeparator,
			decimalSeparator,
			pattern,
			formatter
		};
	}

	/**
	 * Get formatting/parsing options
	 * @param {object|string|Currency} [settings] - Formatting settings, currency code or currency
	 * @param {Money} [value] - Monetary value to be formatted
	 * @returns {{symbol: string, code: string, thousandsSeparator: string, decimalSeparator: string, decimalDigits: number, pattern: string}} - Formatting/parsing details
	 * @private
	 */
	static _getOptions(settings, value = null) {
		if(settings === undefined && value instanceof Money) {
			return value.getCurrency().getSettings();
		}

		// TODO: merge this logic with that of the currency class initialization

		if(typeof settings === 'string') {
			settings = CurrencyStore.get(settings);
		}

		if(settings instanceof Currency) {
			return settings.getSettings();
		}

		if(typeof settings !== 'object') {
			throw new InvalidCurrencyError('Invalid currency options provided.');
		}

		if(typeof settings.code !== 'string' || !settings.code) {
			throw new InvalidCurrencyError('Invalid currency settings; code is required.');
		}

		if(CurrencyStore.has(settings.code)) {
			settings = {
				...CurrencyStore.get(settings.code),
				...settings
			};
		}

		return {
			thousandsSeparator: ',',
			decimalSeparator: '.',
			decimalDigits: 2,
			pattern: '%s%ns%v',
			formatter: null,
			parser: null,
			symbol: settings.code,
			...settings,
		};
	}
}
