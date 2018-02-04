import BigNumber from 'bignumber.js';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import Currency from './Currency';
import CurrencyMismatchError from './CurrencyMismatchError';
import WrongInputError from './WrongInputError';

/**
 * @example
 * let price = new Money('7856', 'USD'); // $78.56
 */
export default class Money {

	/**
	 * Rounding modes you can use in your operations.
	 * These map directly to [`BigNumber`'s rounding modes](http://mikemcl.github.io/bignumber.js/#constructor-properties).
	 * @type {object} ROUNDING - rounding modes
	 * @property {number} ROUNDING.UP - Rounds away from zero
	 * @property {number} ROUNDING.DOWN - Rounds towards zero
	 * @property {number} ROUNDING.CEIL - Rounds towards Infinity
	 * @property {number} ROUNDING.FLOOR - Rounds towards -Infinity
	 * @property {number} ROUNDING.HALF_UP - Rounds towards nearest neighbour. If equidistant, rounds away from zero
	 * @property {number} ROUNDING.HALF_DOWN - Rounds towards nearest neighbour. If equidistant, rounds towards zero
	 * @property {number} ROUNDING.HALF_EVEN - Rounds towards nearest neighbour. If equidistant, rounds towards even neighbour
	 * @property {number} ROUNDING.HALF_CEIL - Rounds towards nearest neighbour. If equidistant, rounds towards Infinity
	 * @property {number} ROUNDING.HALF_FLOOR - Rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
	 *
	 * @example
	 * let
	 *      price = new Money('7856', 'USD'), // $78.56
	 *      discountedAndRoundedUp = price.multiply('0.70'), // $55.00
	 *      discountedAndRoundedDown = price.multiply('0.70', Money.ROUNDING.DOWN); // $54.99
	 */
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

	/**
	 * @example <caption>Integer as value</caption>
	 * let price = new Money(7856, 'USD'); // $78.56
	 *
	 * @example <caption>String integer as value</caption>
	 * let price = new Money('7856', 'USD'); // $78.56
	 *
	 * @example <caption>String Float as value</caption>
	 * let price = new Money('78.56', 'USD'); // $78.56
	 *
	 * @example <caption>Money instance as value</caption>
	 * let price = new Money(new Money('78.56'), 'USD'); // $78.56 - same as using clone()
	 *
	 * @example <caption>Currency instance as currency</caption>
	 * let price = new Money('7856', new Currency('USD')); // $78.56
	 *
	 * @param {number|string|Money} value - integer, integer string, float string, instance of `Money`
	 * @param {string|Currency} currency - currency code as string, instance of `Currency`
	 */
	constructor(value, currency) {
		/**
		 * Internal currency
		 * @type {Currency} - Internal Currency instance
		 * @private
		 */
		this._currency = new Currency(currency);
		/**
		 * Internal value as a big number
		 * @type {BigNumber} - Internal BigNumber instance holding the value
		 * @private
		 */
		this._value = this._preProcessInputValue(value);
	}

	/**
	 * Performs addition
	 * @param {number|string|Money} value - value to be added to the current value; type same as constructor
	 * @returns {Money} - new Money instance after addition
	 */
	add(value) {
		value = new this.constructor(value, this._currency);
		let newValue = this._value.plus(value.getAmountAsBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	/**
	 * Performs subtraction
	 * @param {number|string|Money} value - value to be subtracted from the current value; type same as constructor
	 * @returns {Money} - new Money instance after subtraction
	 */
	subtract(value) {
		value = new this.constructor(value, this._currency);
		let newValue = this._value.minus(value.getAmountAsBigNumber());
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	/**
	 * Performs multiplication
	 * @param {number|string} value - value to multiply the current value
	 * @param {number} [rounding=ROUNDING.HALF_UP] - rounding mode used in this operation; has to be one of the rounding modes in `Money.ROUNDING`
	 * @returns {Money} - new Money instance after multiplication
	 */
	multiply(value, rounding = this.constructor.ROUNDING.HALF_UP) {
		let newValue = this._value.times(value).decimalPlaces(this._currency.getDecimalDigits(), rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	/**
	 * Performs division
	 * @param {number|string} value - value to divide the current value by
	 * @param {number} [rounding=ROUNDING.HALF_UP] - rounding mode used in this operation; has to be one of the rounding modes in `Money.ROUNDING`
	 * @returns {Money} - new Money instance after division
	 */
	divide(value, rounding = this.constructor.ROUNDING.HALF_UP) {
		let newValue = this._value.dividedBy(value).decimalPlaces(this._currency.getDecimalDigits(), rounding);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	/**
	 * Performs an equality check
	 * @param {number|string|Money} value - value to compare to the current value; type same as constructor
	 * @returns {boolean} - true if value is considered equal to the current value
	 */
	equals(value) {
		value = new this.constructor(value, this._currency);
		return this._value.isEqualTo(value.getAmountAsBigNumber());
	}

	/**
	 * Performs a check if the current value is greater than the parameter
	 * @param {number|string|Money} value - value to compare to the current value; type same as constructor
	 * @returns {boolean} - true if the current value is greater than the parameter
	 */
	greaterThan(value) {
		value = new this.constructor(value, this._currency);
		return this._value.isGreaterThan(value.getAmountAsBigNumber());
	}

	/**
	 * Performs a check if the current value is greater than or equal to the parameter
	 * @param {number|string|Money} value - value to compare to the current value; type same as constructor
	 * @returns {boolean} - true if the current value is greater than or equal to the parameter
	 */
	greaterThanOrEqualTo(value) {
		value = new this.constructor(value, this._currency);
		return this._value.isGreaterThanOrEqualTo(value.getAmountAsBigNumber());
	}

	/**
	 * Performs a check if the current value is less than the parameter
	 * @param {number|string|Money} value - value to compare to the current value; type same as constructor
	 * @returns {boolean} - true if the current value is less than the parameter
	 */
	lessThan(value) {
		value = new this.constructor(value, this._currency);
		return this._value.isLessThan(value.getAmountAsBigNumber());
	}

	/**
	 * Performs a check if the current value is less than or equal to the parameter
	 * @param {number|string|Money} value - value to compare to the current value; type same as constructor
	 * @returns {boolean} - true if the current value is less than or equal to the parameter
	 */
	lessThanOrEqualTo(value) {
		value = new this.constructor(value, this._currency);
		return this._value.isLessThanOrEqualTo(value.getAmountAsBigNumber());
	}

	/**
	 * Return the absolute monetary value of the current value, i.e., remove the minus sign if the value is below zero
	 * @returns {Money} - new Money instance with the absolute value
	 */
	absolute() {
		let newValue = this._value.absoluteValue();
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	/**
	 * Return the largest integer less than or equal to the current value
	 * @returns {Money} - new Money instance with the floor value
	 */
	floor() {
		let newValue = this._value.decimalPlaces(0, this.constructor.ROUNDING.FLOOR);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	/**
	 * Return the smallest integer greater than or equal to the current value
	 * @returns {Money} - new Money instance with the ceiling value
	 */
	ceil() {
		let newValue = this._value.decimalPlaces(0, this.constructor.ROUNDING.CEIL);
		return new this.constructor(this._convertBigNumberToStringInteger(newValue), this._currency);
	}

	/**
	 * Checks if the current currency is the same as that of the parameter
	 * @param {Money} value - value to check currency against the current value; type same as constructor
	 * @returns {boolean} - true if the current value has the same currency as the parameter
	 */
	hasSameCurrency(value) {
		if(!(value instanceof Money)) {
			throw new WrongInputError('The input value must be a "Money" instance.');
		}
		return this._currency.is(value.getCurrency());
	}

	/**
	 * Split the current value by an array of ratios
	 * @param {number[]|string[]} ratios - an array of numbers by which to divide up the current value
	 * @returns {Money[]} - an array of new Money instances, resulting from splitting the current value
	 */
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

	/**
	 * Split the current value by the count
	 * @param {number|string} count - count by which to allocate the current value (must be a 1+ integer)
	 * @returns {Money[]} - an array of new Money instances, resulting from splitting the current value
	 */
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

	/**
	 * Create a new money instance, holding an identical value and currency to the current one
	 * @returns {Money} - the cloned money instance
	 */
	clone() {
		return new this.constructor(this.getAmount(), this._currency);
	}

	/**
	 * Format the current value based on the currency
	 * @returns {string} - formatted money
	 */
	format() {
		return this._currency.format(this._value.toString());
	}

	/**
	 * Get the current value as an instance of BigNumber
	 * @returns {BigNumber} - Internal BigNumber representation of the current value
	 */
	getAmountAsBigNumber() {
		return this._value;
	}

	/**
	 * Get the current value as a string integer (same as `getAmount`)
	 * @returns {string} - String integer representation of the current value
	 */
	getAmountAsStringInteger() {
		return this.getAmount();
	}

	/**
	 * Get the current value as a string float
	 * @returns {string} - String float representation of the current value
	 */
	getAmountAsStringFloat() {
		return this._value.toString();
	}

	/**
	 * Get the current value as a string integer (same as `getAmountAsStringInteger`)
	 * @returns {string} - String integer representation of the current value
	 */
	getAmount() {
		return this._convertBigNumberToStringInteger(this._value);
	}

	/**
	 * Get the current value as a string integer (same as `getAmount`)
	 * @returns {string} - String integer representation of the current value
	 */
	toString() {
		return this.getAmount();
	}

	/**
	 * Get the internal Currency instance
	 * @returns {Currency} - Internal Currency instance
	 */
	getCurrency() {
		return this._currency;
	}

	/**
	 * Get the smallest unit of the current monetary value, i.e., 0.01 (aka penny) in a USD money
	 * @returns {Money} - new Money instance holding the smallest unit of the current monetary value
	 */
	getSmallestUnit() {
		return new this.constructor(this._getSmallestUnitAsBigNumber().toString(), this._currency);
	}

	/**
	 * Get a simple object representing the current monetary value
	 * @returns {{amount: string, currency: Currency}} - object with a string integer value and currency code
	 */
	toJSON() {
		return {
			amount: this.getAmount(),
			currency: this._currency.toString()
		};
	}

	/**
	 * Check that the currency of the passed value matches the current currency. If not, throw an error.
	 * @param {Money} value - The money object which is used for currency check
	 * @private
	 */
	_checkValueCurrency(value) {
		if(!this.hasSameCurrency(value)) {
			throw new CurrencyMismatchError();
		}
	}

	/**
	 * Used by allocation methods to add the remainder to the array of allocations
	 * @param {Money[]} allocations - an array of Money instances already allocated
	 * @param {Money} remainder - a Money instance with the remainder yet to be added to the array of allocations
	 * @returns {Money[]} - the final allocations array of Money instances
	 * @private
	 */
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

	/**
	 * Convert the constructor input value to an internal BigNumber instance
	 * @param {number|string|Money} value - integer, integer string, float string, instance of `Money`
	 * @returns {BigNumber} - Internal BigNumber instance
	 * @private
	 */
	_preProcessInputValue(value) {
		if(value instanceof Money) {
			this._checkValueCurrency(value);
			return value.getAmountAsBigNumber();
		}

		let divisor = this._getSmallestUnitDivisor();

		const BN = this._getBigNumberConstructor();

		if(divisor.isGreaterThan(1) && (Number.isInteger(value) || (typeof value === 'string' && isInt(value)))) {
			value = new BN(value);

			return value
				.dividedBy(divisor)
				.decimalPlaces(this._currency.getDecimalDigits());
		}

		if(typeof value === 'string' && isFloat(value)) {
			return new BN(value);
		}

		throw new WrongInputError('The input value must be either an integer, an integer-like string, a float-like string or a "Money" instance.');
	}

	/**
	 * Get the smallest unit divisor for the current value's currency, i.e., 10 to the power of the currency's decimal digits.
	 * It is used for converting an integer value to a float value (or vice versa).
	 * @returns {BigNumber} - Smallest unit divisor
	 * @private
	 */
	_getSmallestUnitDivisor() {
		let	decimalDigits = this._currency.getDecimalDigits();
		return (new BigNumber('10')).exponentiatedBy(decimalDigits);
	}

	/**
	 * Get the smallest unit of the currency as a big number
	 * @returns {BigNumber} - Smallest unit of the currency
	 * @private
	 */
	_getSmallestUnitAsBigNumber() {
		return (new BigNumber('1')).dividedBy(this._getSmallestUnitDivisor());
	}

	/**
	 * Convert a BigNumber to a string integer
	 * @param {BigNumber} value - value to be converted
	 * @returns {string} - String integer value of the BigNumber value
	 * @private
	 */
	_convertBigNumberToStringInteger(value) {
		return value.times(this._getSmallestUnitDivisor()).toString();
	}

	/**
	 * The values below are the default but we need a new constructor in case the default is changed by external code.
	 * @returns {object} - BigInteger constructor with 20 decimal places and default rounding half up
	 * @private
	 */
	_getBigNumberConstructor() {
		return BigNumber.clone({
			DECIMAL_PLACES: 20,
			ROUNDING_MODE: this.constructor.ROUNDING.HALF_UP
		});
	}

	/**
	 * Parse a formatted money string into an instance of Money
	 * @param {string} value - the formatted money string
	 * @param {string|Currency} currency - the currency of the formatted string
	 * @returns {Money} - a Money instance holding the parsed value and currency
	 */
	static parse(value, currency) {
		currency = new Currency(currency);
		value = currency.unformat(value);
		return new this(value, currency);
	}
}
