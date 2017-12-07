import BigNumber from 'bignumber.js';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import Currency from './Currency';

export default class Money {

	static ROUNDING = {
		UP: BigNumber.ROUND_UP,
		DOWN: BigNumber.ROUND_DOWN,
		CEIL: BigNumber.ROUND_CEIL,
		FLOOR: BigNumber.ROUND_FLOOR,
		HALF_UP: BigNumber.ROUND_HALF_UP,
		HALF_DOWN: BigNumber.ROUND_HALF_DOWN,
		HALF_EVEN: BigNumber.ROUND_HALF_EVEN,
		HALF_CEIL: BigNumber.ROUND_HALF_CEIL,
		HALF_FLOOR: BigNumber.ROUND_HALF_FLOOR
	};

	constructor(value, currency) {
		this._currency = new Currency(currency);
		this._value = this._preProcessInputValue(value);
	}

	add(value) {
		value = new this.constructor(value, this._currency);
		let newValue = this._value.plus(value.getAmountAsBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	subtract(value) {
		value = new this.constructor(value, this._currency);
		let newValue = this._value.minus(value.getAmountAsBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	multiply(value, rounding = this.constructor.ROUNDING.HALF_UP) {
		let newValue = this._value.times(value).round(this._currency.getDecimalDigits(), rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	divide(value, rounding = this.constructor.ROUNDING.HALF_UP) {
		let newValue = this._value.dividedBy(value).round(this._currency.getDecimalDigits(), rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	equals(value) {
		value = new this.constructor(value, this._currency);
		return this._value.equals(value.getAmountAsBigNumber());
	}

	greaterThan(value) {
		value = new this.constructor(value, this._currency);
		return this._value.greaterThan(value.getAmountAsBigNumber());
	}

	greaterThanOrEqualTo(value) {
		value = new this.constructor(value, this._currency);
		return this._value.greaterThanOrEqualTo(value.getAmountAsBigNumber());
	}

	lessThan(value) {
		value = new this.constructor(value, this._currency);
		return this._value.lessThan(value.getAmountAsBigNumber());
	}

	lessThanOrEqualTo(value) {
		value = new this.constructor(value, this._currency);
		return this._value.lessThanOrEqualTo(value.getAmountAsBigNumber());
	}

	absolute() {
		let newValue = this._value.absoluteValue();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	floor() {
		let newValue = this._value.floor();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	ceil() {
		let newValue = this._value.ceil();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	allocate(ratios) {
		let
			allocations = [],
			totalValue = this.clone(),
			remainder = this.clone(),
			total = ratios.reduce((total, ratio) => total.plus(ratio), new BigNumber('0'));

		for(let ratio of ratios) {
			let share = totalValue
				.multiply(ratio, this.constructor.ROUNDING.FLOOR)
				.divide(total, this.constructor.ROUNDING.FLOOR);

			allocations.push(share);
			remainder = remainder.subtract(share);
		}

		return this._addRemainderToAllocations(allocations, remainder);
	}

	allocateTo(count) {
		let
			allocations = [],
			totalValue = this.clone(),
			baseShare = totalValue.divide(count, this.constructor.ROUNDING.FLOOR),
			remainder = totalValue.subtract(baseShare.multiply(count, this.constructor.ROUNDING.FLOOR));

		for(let i = 0; i < count; i++) {
			allocations.push(baseShare.clone());
		}

		return this._addRemainderToAllocations(allocations, remainder);
	}

	clone() {
		return new this.constructor(this.getAmount(), this._currency);
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

	getSmallestUnit() {
		return new this.constructor(this._getSmallestUnitAsBigNumber().toString(), this._currency);
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
				.round(this._currency.getDecimalDigits());
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
		// The values below are the default but we need a new constructor in case the default is changed by external code.
		return BigNumber.another({
			DECIMAL_PLACES: 20,
			ROUNDING_MODE: this.constructor.ROUNDING.HALF_UP
		});
	}

	static parse(value, currency) {
		currency = new Currency(currency);
		value = currency.unformat(value);
		return new this(value, currency);
	}
}