import Money, { ROUNDING } from '../Money/Money';

export abstract class Calculator {
  abstract add(value: number|string|Money): Money;
  abstract subtract(value: number|string|Money): Money;
  abstract multiply(value: number|string, rounding?: ROUNDING): Money;
  abstract divide(value: number|string, rounding?: ROUNDING): Money;
}

/**
 * @example
 * Basic usage
 * ```js
 * import { Money, Calculator } from 'wealth';
 * export default Calculator(Money); // Money instance with a built-in Calculator
 * ```
 */
export default (baseClass: typeof Money) => (
  class Calculator extends baseClass {

    /**
     * Performs addition
     * @param value - value to be added to the current value;
     * type same as constructor
     * @returns - new Money instance after addition
     */
    add(value: number|string|Money) {
      const moneyValue = new Money(value, this.currency);
      const newValue = this.value.plus(moneyValue.amountAsBigNumber);
      return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
    }

    /**
     * Performs subtraction
     * @param value - value to be subtracted from the current value; type same as constructor
     * @returns - new Money instance after subtraction
     */
    subtract(value: number|string|Money) {
      const moneyValue = new Money(value, this.currency);
      const newValue = this.value.minus(moneyValue.amountAsBigNumber);
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
        .decimalPlaces(this.currency.decimalDigits, rounding as any);
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
        .decimalPlaces(this.currency.decimalDigits, rounding as any);
      return new Money(this.convertBigNumberToStringInteger(newValue), this.currency);
    }
  }
);
