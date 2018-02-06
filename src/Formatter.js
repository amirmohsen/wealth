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
 * );
 */
class Formatter {

	/**
	 * Format money based on settings
	 * @param {Money} value - Monetary value to be formatted
	 * @param {object|string|Currency} [settings] - Formatting settings, currency code or currency
	 * @returns {string} - Formatted money string
	 */
	format(value, settings) {
		const
			details = this._getFormattingDetails(value, settings),
			{
				symbol,
				code,
				decimalDigits,
				pattern
			} = details;

		let formatted = pattern.replace('%v', details.value.toFormat(decimalDigits));

		if(symbol) {
			formatted = pattern.replace('%s', symbol);
		}

		if(code) {
			formatted = pattern.replace('%c', code);
		}

		return formatted;
	}

	/**
	 * Parse money based on settings
	 * @param {string} value - Monetary value to be parsed
	 * @param {object|string|Currency} settings - Parsing settings, currency code or currency
	 * @returns {Money} - Parsed "Money" value
	 */
	parse(value, settings) {
		let {
			symbol,
			code,
			thousandsSeparator,
			decimalSeparator
		} = this._getOptions(settings);

		value = value
			.replace(new RegExp(thousandsSeparator), '')
			.replace(symbol, '')
			.replace(code, '')
			.replace(decimalSeparator, '.')
			.trim();

		return new Money(value, code);
	}

	/**
	 * Get formatting details
	 * @param {Money} value - Monetary value to be formatted
	 * @param {object|string|Currency} [settings] - Formatting settings, currency code or currency
	 * @returns {{symbol: string, code: string, value: BigNumber, decimalDigits: number, pattern: string}} - Formatting details
	 * @private
	 */
	_getFormattingDetails(value, settings) {
		let {
			symbol,
			code,
			thousandsSeparator,
			decimalSeparator,
			decimalDigits,
			pattern
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
			pattern
		};
	}

	/**
	 * Get formatting/parsing options
	 * @param {object|string|Currency} [settings] - Formatting settings, currency code or currency
	 * @param {Money} [value] - Monetary value to be formatted
	 * @returns {{symbol: string, code: string, thousandsSeparator: string, decimalSeparator: string, decimalDigits: number, pattern: string}} - Formatting/parsing details
	 * @private
	 */
	_getOptions(settings, value = null) {
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

		if(settings.code) {
			settings = {
				...CurrencyStore.get(settings.code),
				...settings
			};
		}

		return {
			thousandsSeparator: ',',
			decimalSeparator: '.',
			decimalDigits: 2,
			pattern: '%v',
			...settings,
		};
	}
}

export default new Formatter();
