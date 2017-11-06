import BigNumber from 'bignumber.js';
import isInt from 'validator/lib/isInt';

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

	static DEFAULT_OPTIONS = {
		decimalPlaces: 2,
		roundingMode: BigNumber.ROUND_UP
	};

	constructor(value = '0', options = {}) {
		value = this._preProcessInputValue(value);
		this._options = { ...this.constructor.DEFAULT_OPTIONS, ...options};
		this._value = this._createBigNumberFromFloatOrStringFloat(value);
	}

	add(value) {
		value = new this.constructor(value, this._options);
		let newValue = this._value.plus(value._getInnerBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._options);
	}

	subtract(value) {
		value = new this.constructor(value, this._options);
		let newValue = this._value.minus(value._getInnerBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._options);
	}

	multiply(value, rounding = BigNumber.ROUND_UP) {
		let newValue = this._value.times(value).round(this._options.decimalPlaces, rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._options);
	}

	divide(value, rounding = BigNumber.ROUND_UP) {
		let newValue = this._value.dividedBy(value).round(this._options.decimalPlaces, rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._options);
	}

	equals(value) {
		value = new this.constructor(value, this._options);
		return this._value.equals(value._getInnerBigNumber());
	}

	greaterThan(value) {
		value = new this.constructor(value, this._options);
		return this._value.greaterThan(value._getInnerBigNumber());
	}

	greaterThanOrEqualTo(value) {
		value = new this.constructor(value, this._options);
		return this._value.greaterThanOrEqualTo(value._getInnerBigNumber());
	}

	lessThan(value) {
		value = new this.constructor(value, this._options);
		return this._value.lessThan(value._getInnerBigNumber());
	}

	lessThanOrEqualTo(value) {
		value = new this.constructor(value, this._options);
		return this._value.lessThanOrEqualTo(value._getInnerBigNumber());
	}

	absolute() {
		let newValue = this._value.absoluteValue();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._options);
	}

	ceil() {
		let newValue = this._value.ceil();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._options);
	}

	floor() {
		let newValue = this._value.floor();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._options);
	}

	clone() {
		return this.constructor(this.getAmount(), this._options);
	}

	getAmount() {
		return this._convertBigNumberToStringInteger(this._value);
	}

	toString() {
		return this.getAmount();
	}

	_preProcessInputValue(value) {
		if(value instanceof Money) {
			return value._getInnerBigNumber().toString();
		}
		else if(Number.isInteger(value)) {
			value = value.toString();
		}
		else if(!isInt(value, { allow_leading_zeroes: false })) {
			throw new Error('The input value must be either an integer, an integer-like string or a "Money" instance.');
		}

		switch(value.length) {
			case 1:
				return `0.0${value}`;
			case 2:
				return `0.${value}`;
			default:
				return `${value.substring(0, value.length - 2)}.${value.substring(value.length - 2)}`;
		}
	}

	_convertBigNumberToStringInteger(value) {
		return value.times(10 ** this._options.decimalPlaces).toString();
	}

	_getInnerBigNumber() {
		return this._value;
	}

	_createBigNumberFromFloatOrStringFloat(value) {
		const BN = BigNumber.another({ DECIMAL_PLACES: this._options.decimalPlaces, ROUNDING_MODE: this._options.roundingMode});
		return new BN(value);
	}
}