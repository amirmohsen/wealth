import BigNumber from 'bignumber.js';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import Currency from '../Currency/Currency';
import CurrencyMismatchError from '../errors/CurrencyMismatchError';
import WrongInputError from '../errors/WrongInputError';
import Formatter from '../Formatter/Formatter';
import { CurrencyInputSettings } from '../Currency/CurrencyStore';

/**
 * Rounding modes you can use in your operations.
 * These map directly to
 * [`BigNumber`'s rounding modes](http://mikemcl.github.io/bignumber.js/#constructor-properties).
 *
 * @example
 * Rounding mode usage
 * ```js
 * const
 *      price = new Money('7856', 'USD'), // $78.56
 *      discountedAndRoundedUp = price.multiply('0.70'), // $55.00
 *      discountedAndRoundedDown = price.multiply('0.70', ROUNDING.DOWN); // $54.99
 * ```
 */
export enum ROUNDING {
  /**
   * Rounds away from zero
   */
  UP = BigNumber.ROUND_UP,
  /**
   * Rounds towards zero
   */
  DOWN = BigNumber.ROUND_DOWN,
  /**
   * Rounds towards Infinity
   */
  CEIL = BigNumber.ROUND_CEIL,
  /**
   * Rounds towards Infinity
   */
  FLOOR = BigNumber.ROUND_FLOOR,
  /**
   * Rounds towards nearest neighbour.
   * If equidistant, rounds away from zero
   */
  HALF_UP = BigNumber.ROUND_HALF_UP,
  /**
   * Rounds towards nearest neighbour.
   * If equidistant, rounds towards zero
   */
  HALF_DOWN = BigNumber.ROUND_HALF_DOWN,
  /**
   * Rounds towards nearest neighbour.
   * If equidistant, rounds towards even neighbour
   */
  HALF_EVEN = BigNumber.ROUND_HALF_EVEN,
  /**
   * Rounds towards nearest neighbour.
   * If equidistant, rounds towards Infinity
   */
  HALF_CEIL = BigNumber.ROUND_HALF_CEIL,
  /**
   * Rounds towards nearest neighbour.
   * If equidistant, rounds towards Infinity
   */
  HALF_FLOOR = BigNumber.ROUND_HALF_FLOOR,
}

/**
 * @example
 * Basic usage
 * ```js
 * import { Money } from 'wealth'
 * let price = new Money('7856', 'USD'); // $78.56
 * ```
 */
export default class Money {

  /**
   * Internal currency
   */
  currency: Currency;

  /**
   * BigNumber constructor used by this "Money" instance
   */
  value: BigNumber;

  /**
   * Internal value as a big number
   */
  bigNumberConstructor: typeof BigNumber;

  /**
   * @example
   * Integer as value
   * ```js
   * let price = new Money(7856, 'USD'); // $78.56
   * ```
   *
   * @example
   * String integer as value
   * ```js
   * let price = new Money('7856', 'USD'); // $78.56
   * ```
   *
   * @example
   * String Float as value
   * ```js
   * let price = new Money('78.56', 'USD'); // $78.56
   * ```
   *
   * @example
   * Money instance as value
   * ```js
   * let price = new Money(new Money('78.56', 'USD'), 'USD'); // $78.56 - same as using clone()
   * ```
   *
   * @example
   * Currency instance as currency
   * ```js
   * let price = new Money('7856', new Currency('USD')); // $78.56
   * ```
   *
   * @param value - integer, integer string, float string, instance of `Money`
   * @param currency - currency code as string, instance of `Currency`
   */
  constructor(value: number|string|Money, currency: string|Currency) {
    this.currency = new Currency(currency);
    this.bigNumberConstructor = this.generateBigNumberConstructor();
    this.value = this.preProcessInputValue(value, this.bigNumberConstructor);
    Object.freeze(this);
  }

  /**
   * Performs addition
   * @param value - value to be added to the current value;
   * type same as constructor
   * @returns - new Money instance after addition
   */
  add(value: number|string|Money) {
    const moneyValue = new Money(value, this.currency);
    const newValue = this.value.plus(moneyValue.getAmountAsBigNumber());
    return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
  }

  /**
   * Performs subtraction
   * @param value - value to be subtracted from the current value; type same as constructor
   * @returns - new Money instance after subtraction
   */
  subtract(value: number|string|Money) {
    const moneyValue = new Money(value, this.currency);
    const newValue = this.value.minus(moneyValue.getAmountAsBigNumber());
    return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
  }

  /**
   * Performs multiplication
   * @param value - value to multiply the current value
   * @param rounding - rounding mode used in this operation
   * @returns - new Money instance after multiplication
   */
  multiply(value: number|string, rounding = ROUNDING.HALF_UP) {
    const newValue = this.value
      .times(value)
      .decimalPlaces(this.currency.getDecimalDigits(), rounding as any);
    return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
  }

  /**
   * Performs division
   * @param value - value to divide the current value by
   * @param rounding - rounding mode used in this operation
   * @returns - new Money instance after division
   */
  divide(value: number|string, rounding = ROUNDING.HALF_UP) {
    const newValue = this.value
      .dividedBy(value)
      .decimalPlaces(this.currency.getDecimalDigits(), rounding as any);
    return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
  }

  /**
   * Performs an equality check
   * @param value - value to compare to the current value; type same as constructor
   * @returns - true if value is considered equal to the current value
   */
  equals(value: number|string|Money) {
    value = new Money(value, this.currency);
    return this.value.isEqualTo(value.getAmountAsBigNumber());
  }

  /**
   * Performs a check if the current value is greater than the parameter
   * @param value - value to compare to the current value; type same as constructor
   * @returns - true if the current value is greater than the parameter
   */
  greaterThan(value: number|string|Money) {
    value = new Money(value, this.currency);
    return this.value.isGreaterThan(value.getAmountAsBigNumber());
  }

  /**
   * Performs a check if the current value is greater than or equal to the parameter
   * @param value - value to compare to the current value; type same as constructor
   * @returns - true if the current value is greater than or equal to the parameter
   */
  greaterThanOrEqualTo(value: number|string|Money) {
    value = new Money(value, this.currency);
    return this.value.isGreaterThanOrEqualTo(value.getAmountAsBigNumber());
  }

  /**
   * Performs a check if the current value is less than the parameter
   * @param value - value to compare to the current value; type same as constructor
   * @returns - true if the current value is less than the parameter
   */
  lessThan(value: number|string|Money) {
    value = new Money(value, this.currency);
    return this.value.isLessThan(value.getAmountAsBigNumber());
  }

  /**
   * Performs a check if the current value is less than or equal to the parameter
   * @param value - value to compare to the current value; type same as constructor
   * @returns - true if the current value is less than or equal to the parameter
   */
  lessThanOrEqualTo(value: number|string|Money) {
    value = new Money(value, this.currency);
    return this.value.isLessThanOrEqualTo(value.getAmountAsBigNumber());
  }

  /**
   * Return the absolute monetary value of the current value,
   * i.e., remove the minus sign if the value is below zero
   * @returns - new Money instance with the absolute value
   */
  absolute() {
    const newValue = this.value.absoluteValue();
    return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
  }

  /**
   * Return the largest integer less than or equal to the current value
   * @returns - new Money instance with the floor value
   */
  floor() {
    const newValue = this.value.decimalPlaces(0, ROUNDING.FLOOR as any);
    return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
  }

  /**
   * Return the smallest integer greater than or equal to the current value
   * @returns - new Money instance with the ceiling value
   */
  ceil() {
    const newValue = this.value.decimalPlaces(0, ROUNDING.CEIL as any);
    return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
  }

  /**
   * Checks if the current currency is the same as that of the parameter
   * @param value - value to check currency against the current value; type same as constructor
   * @returns - true if the current value has the same currency as the parameter
   */
  hasSameCurrency(value: number|string|Money): Boolean {
    if (!(value instanceof Money)) {
      throw new WrongInputError('The input value must be a "Money" instance.');
    }
    return this.currency.is(value.getCurrency());
  }

  /**
   * Split the current value by an array of ratios
   * @param ratios - an array of numbers by which to divide up the current value
   * @returns - an array of new Money instances, resulting from splitting the current value
   */
  allocate(ratios: (string|number)[]): Money[] {
    const
      allocations: Money[] = [],
      totalValue = this.clone(),
      total: BigNumber = ratios.reduce(
        (total, ratio) => total.plus(ratio),
        new BigNumber('0'),
      );

    let remainder = this.clone();

    for (const ratio of ratios) {
      const share = totalValue
        .multiply(ratio, ROUNDING.FLOOR)
        .divide(total.toString(), ROUNDING.FLOOR);

      allocations.push(share);
      remainder = remainder.subtract(share);
    }

    return this.addRemainderToAllocations(allocations, remainder);
  }

  /**
   * Split the current value by the count
   * @param count - count by which to allocate the current value (must be a 1+ integer)
   * @returns - an array of new Money instances, resulting from splitting the current value
   */
  allocateTo(count: number|string): Money[] {
    const
      allocations: Money[] = [],
      totalValue = this.clone(),
      baseShare = totalValue.divide(count, ROUNDING.FLOOR),
      remainder = totalValue.subtract(baseShare.multiply(count, ROUNDING.FLOOR));

    for (let i = 0; i < count; i++) {
      allocations.push(baseShare.clone());
    }

    return this.addRemainderToAllocations(allocations, remainder);
  }

  /**
   * Create a new money instance, holding an identical value and currency to the current one
   * @returns - the cloned money instance
   */
  clone() {
    return new Money(this.getAmount(), this.currency);
  }

  /**
   * Format the current value based on the currency
   * @param settings - formatting settings (optional)
   * @returns - formatted money
   */
  format(settings?: CurrencyInputSettings): string {
    return this.currency.format(this, settings);
  }

  /**
   * Get the current value as an instance of BigNumber
   * @returns - Internal BigNumber representation of the current value
   */
  getAmountAsBigNumber() {
    return this.value;
  }

  /**
   * Get the current value as a string integer (same as `getAmount`)
   * @returns - String integer representation of the current value
   */
  getAmountAsStringInteger(): string {
    return this.getAmount();
  }

  /**
   * Get the current value as a string float
   * @returns - String float representation of the current value
   */
  getAmountAsStringFloat() {
    return this.value.toString();
  }

  /**
   * Get the current value as a string integer (same as `getAmountAsStringInteger`)
   * @returns - String integer representation of the current value
   */
  getAmount(): string {
    return this.convertBigNumberToStringInteger(this.value);
  }

  /**
   * Get the current value as a string integer (same as `getAmount`)
   * @returns - String integer representation of the current value
   */
  toString() {
    return this.getAmount();
  }

  /**
   * Get the internal Currency instance
   * @returns - Internal Currency instance
   */
  getCurrency() {
    return this.currency;
  }

  /**
   * Get the smallest unit of the current monetary value, i.e., 0.01 (aka penny) in a USD money
   * @returns - new Money instance holding the smallest unit of the current monetary value
   */
  getSmallestUnit() {
    return new Money(this.getSmallestUnitAsBigNumber().toString(), this.currency);
  }

  /**
   * Get BigNumber constructor used by this "Money" instance
   * @returns
   */
  getBigNumberConstructor() {
    return this.bigNumberConstructor;
  }

  /**
   * Get a simple object representing the current monetary value
   * @returns - object with a string integer value and currency code
   */
  toJSON() {
    return {
      amount: this.getAmount(),
      currency: this.currency.toJSON(),
    };
  }

  /**
   * Check that the currency of the passed value matches the current currency.
   * If not, throw an error.
   * @param value - The money object which is used for currency check
   */
  private checkValueCurrency(value: Money) {
    if (!this.hasSameCurrency(value)) {
      throw new CurrencyMismatchError();
    }
  }

  /**
   * Used by allocation methods to add the remainder to the array of allocations
   * @param allocations - an array of Money instances already allocated
   * @param remainder - a Money instance with the remainder yet to be added
   * to the array of allocations
   * @returns - the final allocations array of Money instances
   */
  private addRemainderToAllocations(allocations: Money[], remainder: Money) {
    const
      noMoney = new Money('0', this.currency),
      smallestUnit = this.getSmallestUnit();

    let i = 0;

    while (!remainder.equals(noMoney)) {
      allocations[i] = allocations[i].add(smallestUnit);
      remainder = remainder.subtract(smallestUnit);
      i++;
    }

    return allocations;
  }

  /**
   * Convert the constructor input value to an internal BigNumber instance
   * @param value - integer, integer string, float string, instance of `Money`
   * @param BN - BigNumber constructor used by this "Money" instance
   * @returns - Internal BigNumber instance
   */
  private preProcessInputValue(value: number|string|Money, BN: typeof BigNumber) {
    if (value instanceof Money) {
      this.checkValueCurrency(value);
      return value.getAmountAsBigNumber();
    }

    const divisor = this.getSmallestUnitDivisor();

    if (
      divisor.isGreaterThan(1)
      && (
        (typeof value === 'string' && isInt(value))
        || Number.isInteger(value as number)
      )
    ) {
      const bignumber = new BN(value);

      return bignumber
        .dividedBy(divisor)
        .decimalPlaces(this.currency.getDecimalDigits());
    }

    if (typeof value === 'string' && isFloat(value)) {
      return new BN(value);
    }

    throw new WrongInputError(
      `The input value must be either an integer,
      an integer-like string, a float-like string or a "Money" instance.`,
    );
  }

  /**
   * Get the smallest unit divisor for the current value's currency,
   * i.e., 10 to the power of the currency's decimal digits.
   * It is used for converting an integer value to a float value (or vice versa).
   * @returns - Smallest unit divisor
   */
  private getSmallestUnitDivisor() {
    const	decimalDigits = this.currency.getDecimalDigits();
    return (new BigNumber('10')).exponentiatedBy(decimalDigits);
  }

  /**
   * Get the smallest unit of the currency as a big number
   * @returns - Smallest unit of the currency
   */
  private getSmallestUnitAsBigNumber() {
    return (new BigNumber('1')).dividedBy(this.getSmallestUnitDivisor());
  }

  /**
   * Convert a BigNumber to a string integer
   * @param value - value to be converted
   * @return - String integer value of the BigNumber value
   */
  private convertBigNumberToStringInteger(value: BigNumber) {
    return value.times(this.getSmallestUnitDivisor()).toString();
  }

  /**
   * Generate a compatible BigNumber constructor
   * @returns - a new BigNumber constructor
   */
  private generateBigNumberConstructor() {
    return BigNumber.clone({
      DECIMAL_PLACES: 20,
      ROUNDING_MODE: ROUNDING.HALF_UP as any,
      FORMAT: {
        decimalSeparator: this.currency.getDecimalSeparator(),
        groupSeparator: this.currency.getThousandsSeparator(),
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: ' ',
        fractionGroupSize: 0,
      },
    });
  }

  /**
   * Parse a formatted money string into an instance of Money
   * @param value - the formatted money string
   * @param settings - the formatting settings
   * @returns - a Money instance holding the parsed value and currency
   */
  static parse(value: string, settings: CurrencyInputSettings|string|Currency): Money {
    return Formatter.parse(value, settings);
  }
}
