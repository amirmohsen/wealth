import ISOCurrencies from './iso-currencies';
import InvalidCurrencyError from './errors/InvalidCurrencyError';

class CurrencyStore {

	_data = {
		...ISOCurrencies
	};

	set(code, settings) {
		settings = {
			...settings,
			thousandsSeparator: ',',
			decimalSeparator: '.',
			decimalDigits: 2,
			format: '%v'
		};

		if(!settings.code || !settings.symbol) {
			throw new InvalidCurrencyError('Invalid currency settings. Code and symbol are required.');
		}

		this._data[code] = settings;
	}

	get(code) {
		return this._data[code];
	}

	has(code) {
		return !!this.get(code);
	}

	del(code) {
		delete this._data[code];
	}
}

export default new CurrencyStore();
