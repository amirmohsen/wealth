import BigNumber from 'bignumber.js';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import CurrencyFormatter from 'currency-formatter';
import Currency from "./Currency";

export default class Money {

	static ROUND_UP = BigNumber.ROUND_UP;

	static ROUND_DOWN = BigNumber.ROUND_DOWN;

	static ROUND_CEIL = BigNumber.ROUND_CEIL;

	static ROUND_FLOOR = BigNumber.ROUND_FLOOR;

	static ROUND_HALF_UP = BigNumber.ROUND_HALF_UP;

	static ROUND_HALF_DOWN = BigNumber.ROUND_HALF_DOWN;

	static ROUND_HALF_EVEN = BigNumber.ROUND_HALF_EVEN;

	static ROUND_HALF_CEIL = BigNumber.ROUND_HALF_CEIL;

	static ROUND_HALF_FLOOR = BigNumber.ROUND_HALF_FLOOR;

	static DEFAULT_SETTINGS = {
		roundingMode: BigNumber.ROUND_UP
	};

	constructor(value = '0', currency = 'USD', options = {}) {
		this._currency = new Currency(currency);
		this._options = {...this.constructor.DEFAULT_SETTINGS, ...options};
		this._value = this._preProcessInputValue(value);
	}

	add(value) {
		value = new this.constructor(value, this._currency, this._options);
		let newValue = this._value.plus(value._getInnerBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
	}

	subtract(value) {
		value = new this.constructor(value, this._currency, this._options);
		let newValue = this._value.minus(value._getInnerBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
	}

	multiply(value, rounding = this._options.roundingMode) {
		let newValue = this._value.times(value).round(this._currency.getDecimalDigits(), rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
	}

	divide(value, rounding = this._options.roundingMode) {
		let newValue = this._value.dividedBy(value).round(this._currency.getDecimalDigits(), rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
	}

	equals(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.equals(value._getInnerBigNumber());
	}

	greaterThan(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.greaterThan(value._getInnerBigNumber());
	}

	greaterThanOrEqualTo(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.greaterThanOrEqualTo(value._getInnerBigNumber());
	}

	lessThan(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.lessThan(value._getInnerBigNumber());
	}

	lessThanOrEqualTo(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.lessThanOrEqualTo(value._getInnerBigNumber());
	}

	absolute() {
		let newValue = this._value.absoluteValue();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
	}

	floor() {
		let newValue = this._value.floor();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
	}

	ceil() {
		let newValue = this._value.ceil();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
	}

	allocate(ratios) {
		let
			remainder = this._value,
			results = [],
			total = ratios.reduce((total, ratio) => total.plus(ratio), new BigNumber('0'));

		for(let ratio of ratios) {
			let share = this._value.times(ratio).dividedBy(total).floor();
			results.push(share);
			remainder = remainder.minus(share);
		}

		let i = 0;

		while(true) {
			const
				BN = this._getBigNumberConstructor(),
				unit = (new BN('1'))
					.dividedBy(this._currency.getDecimalDigits())
					.round(this._currency.getDecimalDigits(), this._options.roundingMode);

			results[i] = results[i].plus(unit);
			remainder = remainder.minus(unit);

			++i;

			if(remainder.lessThanOrEqualTo(0)) {
				break;
			}

			if(i === results.length) {
				i = 0;
			}
		}

		// for(let i = 0; remainder.comparedTo(0) === 1; ++i) {
		// 	const
		// 		BN = this._getBigNumberConstructor(),
		// 		unit = (new BN('1'))
		// 			.dividedBy(this._currency.getDecimalDigits())
		// 			.round(this._currency.getDecimalDigits(), this._options.roundingMode);
		//
		// 	results[i] = results[i].plus(unit);
		// 	remainder = remainder.minus(unit);
		//
		// 	if(i === results.length - 1) {
		// 		i = 0;
		// 	}
		// }

		for(let [index, result] of results.entries()) {
			results[index] = new this.constructor(this._convertBigNumberToStringInteger(result), this._currency);
		}

		return results;
	}

	allocateTo() {

	}

	clone() {
		return this.constructor(this.getAmount(), this._currency, this._options);
	}

	getAmount() {
		return this._convertBigNumberToStringInteger(this._value);
	}

	toString() {
		return this.getAmount();
	}

	getCurrency() {
		return this._currency;
	}

	toJSON() {
		return {
			amount: this.getAmount(),
			currency: this._currency.getCode()
		};
	}

	format() {
		return CurrencyFormatter.format(this._value.toString(), {
			code: this._currency.getCode()
		});
	}

	_preProcessInputValue(value) {
		if(value instanceof Money) {
			return value._getInnerBigNumber();
		}

		const BN = this._getBigNumberConstructor();

		if(Number.isInteger(value) || (typeof value === 'string' && isInt(value))) {
			value = new BN(value);

			return value
				.dividedBy(10 ** this._currency.getDecimalDigits())
				.round(this._currency.getDecimalDigits(), this._options.roundingMode);
		}

		if(typeof value === 'string' && isFloat(value)) {
			return new BN(value);
		}

		throw new Error('The input value must be either an integer, an integer-like string, a float-like string or a "Money" instance.');
	}

	_convertBigNumberToStringInteger(value) {
		return value.times(10 ** this._currency.getDecimalDigits()).toString();
	}

	_getInnerBigNumber() {
		return this._value;
	}

	_getBigNumberConstructor() {
		return BigNumber.another({
			DECIMAL_PLACES: this._currency.getDecimalDigits(),
			ROUNDING_MODE: this._options.roundingMode
		});
	}

	static parse(value, currency, options = {}) {
		value = CurrencyFormatter.unformat(value, {code: currency}).toString();
		return new this(value.toString(), currency, options);
	}
}