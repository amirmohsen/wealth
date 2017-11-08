import CurrencyFormatter from 'currency-formatter';

export default class Currency {

	constructor(currency = 'USD') {
		this._currencySettings = CurrencyFormatter.findCurrency(this._preProcess(currency));
	}

	getSettings() {
		return this._currencySettings;
	}

	toString() {
		return this.getCode();
	}

	toJSON() {
		return this.getCode();
	}

	clone() {
		return new this.constructor(this.getCode());
	}

	getCode() {
		return this._currencySettings.code;
	}

	getSymbol() {
		return this._currencySettings.symbol;
	}

	getThousandsSeparator() {
		return this._currencySettings.thousandsSeparator;
	}

	getDecimalSeparator() {
		return this._currencySettings.decimalSeparator;
	}

	getSymbolOnLeft() {
		return this._currencySettings.symbolOnLeft;
	}

	getSpaceBetweenAmountAndSymbol() {
		return this._currencySettings.spaceBetweenAmountAndSymbol;
	}

	getDecimalDigits() {
		return this._currencySettings.decimalDigits;
	}

	_preProcess(currency) {
		if(currency instanceof Currency) {
			return currency.getCode();
		}
		return currency;
	}
}