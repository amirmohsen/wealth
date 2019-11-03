import BigNumber from 'bignumber.js';
import deepFreeze from 'deep-freeze';
import { oneLine } from 'common-tags';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import Currency, { CurrencyInputSettings } from '../Currency';
import CurrencyMismatchError from '../errors/CurrencyMismatchError';
import WrongInputError from '../errors/WrongInputError';
import { convertBigNumberToStringInteger, getSmallestUnitAsBigNumber, getSmallestUnitDivisor } from './fn/_internals';
import ROUNDING from '../constants/ROUNDING';

/**
 * @example
 * Basic usage
 * ```js
 * import { Money } from 'wealth'
 * let price = new Money('7856', 'USD'); // $78.56
 * ```
 */
export class Money {
  /**
   * Internal currency
   */
  currency: Currency;

  /**
   * Internal value as a big number
   */
  value: BigNumber;

  /**
   * BigNumber constructor used by this "Money" instance
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
   * @param currency - currency code as string, currency settings or instance of `Currency`
   */
  constructor(value: number | string | Money, currency: string | CurrencyInputSettings | Currency) {
    this.currency = new Currency(currency);
    this.bigNumberConstructor = this.generateBigNumberConstructor();
    this.value = this.preProcessInputValue(value, this.bigNumberConstructor);
    deepFreeze(this);
  }

  /**
   * Checks if the current currency is the same as that of the parameter
   * @param value - value to check currency against the current value
   * @returns - true if the current value has the same currency as the parameter
   */
  hasSameCurrency(value: Money): boolean {
    if (!(value instanceof Money)) {
      throw new WrongInputError('The input value must be a "Money" instance.');
    }
    return this.currency.is(value.currency);
  }

  /**
   * Create a new money instance, holding an identical value and currency to the current one
   * @returns - the cloned money instance
   */
  clone(): Money {
    const MoneyConstructor = this.constructor as typeof Money;
    return new MoneyConstructor(this.amount, this.currency);
  }

  /**
   * Get the current value as an instance of BigNumber
   * @returns - Internal BigNumber representation of the current value
   */
  get amountAsBigNumber(): BigNumber {
    return this.value;
  }

  /**
   * Get the current value as a string integer
   * @returns - String integer representation of the current value
   */
  get amountAsStringInteger(): string {
    return convertBigNumberToStringInteger(this, this.value);
  }

  /**
   * Get the current value as a string float
   * @returns - String float representation of the current value
   */
  get amountAsStringFloat(): string {
    return this.value.toFixed(this.currency.decimalDigits);
  }

  /**
   * Get the current value as a string float  (same as `amountAsStringFloat`)
   * @returns - String float representation of the current value
   */
  get amount(): string {
    return this.amountAsStringFloat;
  }

  /**
   * Get the current value as a string float (same as `amount`)
   * @returns - String float representation of the current value
   */
  toString(): string {
    return this.amount;
  }

  /**
   * Get the smallest unit of the current monetary value, i.e., 0.01 (aka penny) in a USD money
   * @returns - new Money instance holding the smallest unit of the current monetary value
   */
  get smallestUnit(): Money {
    const MoneyConstructor = this.constructor as typeof Money;
    return new MoneyConstructor(getSmallestUnitAsBigNumber(this).toString(), this.currency);
  }

  /**
   * Get a simple object representing the current monetary value
   * @returns - object with a string integer value and currency code
   */
  toJSON(): { amount: string; currency: string } {
    return {
      amount: this.amount,
      currency: this.currency.toJSON(),
    };
  }

  /**
   * Check that the currency of the passed value matches the current currency.
   * If not, throw an error.
   * @param value - The money object which is used for currency check
   */
  private checkValueCurrency(value: Money): void {
    if (!this.hasSameCurrency(value)) {
      throw new CurrencyMismatchError();
    }
  }

  /**
   * Convert the constructor input value to an internal BigNumber instance
   * @param value - integer, integer string, float string, instance of `Money`
   * @param BN - BigNumber constructor used by this "Money" instance
   * @returns - Internal BigNumber instance
   */
  private preProcessInputValue(value: number | string | Money, BN: typeof BigNumber): BigNumber {
    if (value instanceof Money) {
      this.checkValueCurrency(value);
      return value.amountAsBigNumber;
    }

    const divisor = getSmallestUnitDivisor(this);

    if (
      divisor.isGreaterThan(1) &&
      ((typeof value === 'string' && isInt(value)) || Number.isInteger(value as number))
    ) {
      const bignumber = new BN(value);

      return bignumber.dividedBy(divisor).decimalPlaces(this.currency.decimalDigits);
    }

    if (typeof value === 'string' && isFloat(value)) {
      return new BN(value);
    }

    throw new WrongInputError(
      oneLine`
      The input value must be either an integer,
      an integer-like string, a float-like string or a "Money" instance.
      `,
    );
  }

  /**
   * Generate a compatible BigNumber constructor
   * @returns - a new BigNumber constructor
   */
  private generateBigNumberConstructor(): typeof BigNumber {
    return BigNumber.clone({
      DECIMAL_PLACES: 20,
      ROUNDING_MODE: ROUNDING.HALF_UP as any,
      FORMAT: {
        decimalSeparator: this.currency.decimalSeparator,
        groupSeparator: this.currency.thousandsSeparator,
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: ' ',
        fractionGroupSize: 0,
      },
    });
  }

  /**
   * Creates a new instance of Money
   * @param value - integer, integer string, float string, instance of `Money`
   * @param currency - currency code as string, currency settings or instance of `Currency`
   */
  static init(value: number | string | Money, currency: string | CurrencyInputSettings | Currency): Money {
    const MoneyConstructor = this as typeof Money;
    return new MoneyConstructor(value, currency);
  }
}

export default Money;
