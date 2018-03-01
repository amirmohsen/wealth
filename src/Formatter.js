import InvalidCurrencyError from './errors/InvalidCurrencyError';
import CurrencyStore from './CurrencyStore';
import Money from './Money';
import Currency from './Currency';

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
		const
			details = this._getFormattingDetails(value, settings),
			{
				symbol,
				code,
				decimalDigits,
				pattern,
				formatter
			} = details;

		if(typeof formatter === 'function') {
			return formatter(value, details);
		}

		let
			formattedValue = details.value.absoluteValue().toFormat(decimalDigits),
			formatted = pattern.replace('%v', formattedValue);

		formatted = formatted.replace('%ns', details.value.isNegative() ? '-' : '');

		formatted = formatted.replace('%i', details.value.isInteger() ? details.value.toFormat(0) : formattedValue);

		if(symbol) {
			formatted = formatted.replace('%s', symbol);
		}

		if(code) {
			formatted = formatted.replace('%c', code);
		}

		return formatted;
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
				parser
			} = options;

		if(typeof parser === 'function') {
			return parser(value, options);
		}

		value = this._replaceAll(value, thousandsSeparator, '');
		value = this._replaceAll(value, symbol, '');
		value = this._replaceAll(value, code, '');
		value = this._replaceAll(value, decimalSeparator, '');
		value =	value.replace(/\s/g, '');

		return new Money(value, code);
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

			value = new BN(value);
		}

		return {
			symbol,
			code,
			value,
			decimalDigits,
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

		if(typeof settings === 'string') {
			settings = settings.toUpperCase();

			if(!CurrencyStore.has(settings)) {
				throw new InvalidCurrencyError(`No currency with code "${settings}" is registered.`);
			}

			return CurrencyStore.get(settings);
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
