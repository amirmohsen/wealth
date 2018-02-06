import InvalidCurrencyError from './errors/InvalidCurrencyError';
import CurrencyStore from './CurrencyStore';
import Money from './Money';

class Formatter {

	format(value, settings) {
		let {
			symbol,
			code,
			thousandsSeparator,
			decimalSeparator,
			decimalDigits,
			format,
		} = this._getOptions(settings);

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

		let formatted = format.replace('%v', value.toFormat(decimalDigits));

		if(symbol) {
			formatted = format.replace('%s', symbol);
		}

		if(code) {
			formatted = format.replace('%c', code);
		}

		return formatted;
	}

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
			.replace(decimalSeparator, '.');

		return new Money(value, code);
	}

	_getOptions(code) {
		if(typeof code === 'string') {
			code = code.toUpperCase();

			if(!CurrencyStore.has(code)) {
				throw new InvalidCurrencyError(`No currency with code "${code}" is registered.`);
			}

			return CurrencyStore.get(code);
		}

		if(typeof code !== 'object') {
			throw new InvalidCurrencyError('Invalid currency options provided.');
		}

		return {
			...code,
			thousandsSeparator: ',',
			decimalSeparator: '.',
			decimalDigits: 2,
			format: '%v'
		};
	}
}

export default new Formatter();
