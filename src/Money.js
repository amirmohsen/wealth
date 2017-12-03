import BigNumber from 'bignumber.js';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import Currency from './Currency';

export default class Money {

	static ROUNDING_MODES = {
		ROUND_UP: BigNumber.ROUND_UP,
		ROUND_DOWN: BigNumber.ROUND_DOWN,
		ROUND_CEIL: BigNumber.ROUND_CEIL,
		ROUND_FLOOR: BigNumber.ROUND_FLOOR,
		ROUND_HALF_UP: BigNumber.ROUND_HALF_UP,
		ROUND_HALF_DOWN: BigNumber.ROUND_HALF_DOWN,
		ROUND_HALF_EVEN: BigNumber.ROUND_HALF_EVEN,
		ROUND_HALF_CEIL: BigNumber.ROUND_HALF_CEIL,
		ROUND_HALF_FLOOR: BigNumber.ROUND_HALF_FLOOR
	};

	static DEFAULT_SETTINGS = {
		roundingMode: BigNumber.ROUND_UP
	};

	constructor(value, currency, options = {}) {
		this._currency = new Currency(currency);
		this._options = {...this.constructor.DEFAULT_SETTINGS, ...options};
		this._value = this._preProcessInputValue(value);
	}

	add(value) {
		value = new this.constructor(value, this._currency, this._options);
		let newValue = this._value.plus(value.getAmountAsBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
	}

	subtract(value) {
		value = new this.constructor(value, this._currency, this._options);
		let newValue = this._value.minus(value.getAmountAsBigNumber());
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
		return this._value.equals(value.getAmountAsBigNumber());
	}

	greaterThan(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.greaterThan(value.getAmountAsBigNumber());
	}

	greaterThanOrEqualTo(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.greaterThanOrEqualTo(value.getAmountAsBigNumber());
	}

	lessThan(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.lessThan(value.getAmountAsBigNumber());
	}

	lessThanOrEqualTo(value) {
		value = new this.constructor(value, this._currency, this._options);
		return this._value.lessThanOrEqualTo(value.getAmountAsBigNumber());
	}

	round(rounding = this._options.roundingMode) {
		let newValue = this._value.round(this._currency.getDecimalDigits(), rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency, this._options);
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
			allocations = [],
			totalValue = this.clone({roundingMode: this.constructor.ROUNDING_MODES.ROUND_FLOOR}),
			remainder = this.clone(),
			total = ratios.reduce((total, ratio) => total.plus(ratio), new BigNumber('0'));

		for(let ratio of ratios) {
			let share = totalValue
				.multiply(ratio, this.constructor.ROUNDING_MODES.ROUND_FLOOR)
				.divide(total, this.constructor.ROUNDING_MODES.ROUND_FLOOR);

			allocations.push(share);
			remainder = remainder.subtract(share);
		}

		return this._addRemainderToAllocations(allocations, remainder);
	}

	allocateTo(count) {
		let
			allocations = [],
			totalValue = this.clone({roundingMode: this.constructor.ROUNDING_MODES.ROUND_FLOOR}),
			baseShare = totalValue.divide(count, this.constructor.ROUNDING_MODES.ROUND_FLOOR),
			remainder = totalValue.subtract(baseShare.multiply(count));

		for(let i = 0; i < count; i++) {
			allocations.push(baseShare.clone());
		}

		return this._addRemainderToAllocations(allocations, remainder);
	}

	clone(options = {}) {
		return new this.constructor(this.getAmount(), this._currency, {...this._options, ...options});
	}

	format() {
		return this._currency.format(this._value.toString());
	}

	getAmountAsBigNumber() {
		return this._value;
	}

	getAmountAsStringInteger() {
		return this.getAmount();
	}

	getAmountAsStringFloat() {
		return this._value.toString();
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

	getSmallestUnit(options = {}) {
		return new this.constructor(this._getSmallestUnitAsBigNumber().toString(), this._currency, {...this._options, ...options});
	}

	toJSON() {
		return {
			amount: this.getAmount(),
			currency: this._currency.toString()
		};
	}

	_addRemainderToAllocations(allocations, remainder) {
		let
			i = 0,
			noMoney = new this.constructor('0', this._currency),
			smallestUnit = this.getSmallestUnit();

		while(!remainder.equals(noMoney)) {
			allocations[i] = allocations[i].add(smallestUnit);
			remainder = remainder.subtract(smallestUnit);

			i++;

			if(i === allocations.length) {
				i = 0;
			}
		}

		return allocations;
	}

	_preProcessInputValue(value) {
		if(value instanceof Money) {
			return value.getAmountAsBigNumber();
		}

		let divisor = this._getSmallestUnitDivisor();

		const BN = this._getBigNumberConstructor();

		if(divisor.greaterThan(1) && (Number.isInteger(value) || (typeof value === 'string' && isInt(value)))) {
			value = new BN(value);

			return value
				.dividedBy(divisor)
				.round(this._currency.getDecimalDigits(), this._options.roundingMode);
		}

		if(typeof value === 'string' && isFloat(value)) {
			return new BN(value);
		}

		throw new Error('The input value must be either an integer, an integer-like string, a float-like string or a "Money" instance.');
	}

	_getSmallestUnitDivisor() {
		let	decimalDigits = this._currency.getDecimalDigits();
		return (new BigNumber('10')).toPower(decimalDigits);
	}

	_getSmallestUnitAsBigNumber() {
		return (new BigNumber('1')).dividedBy(this._getSmallestUnitDivisor());
	}

	_convertBigNumberToStringInteger(value) {
		return value.times(this._getSmallestUnitDivisor()).toString();
	}

	_getBigNumberConstructor() {
		return BigNumber.another({
			DECIMAL_PLACES: this._currency.getDecimalDigits(),
			ROUNDING_MODE: this._options.roundingMode
		});
	}

	static parse(value, currency, options = {}) {
		currency = new Currency(currency);
		value = currency.unformat(value);
		return new this(value, currency, options);
	}
}