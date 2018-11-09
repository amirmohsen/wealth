import Money from '../Money/Money';

export default (baseClass: typeof Money) => (
  class EqualityCheck extends baseClass {
    /**
     * Performs an equality check
     * @param value - value to compare to the current value; type same as constructor
     * @returns - true if value is considered equal to the current value
     */
    equals(value: number|string|Money) {
      value = new Money(value, this.currency);
      return this.value.isEqualTo(value.amountAsBigNumber);
    }

    /**
     * Performs a check if the current value is greater than the parameter
     * @param value - value to compare to the current value; type same as constructor
     * @returns - true if the current value is greater than the parameter
     */
    greaterThan(value: number|string|Money) {
      value = new Money(value, this.currency);
      return this.value.isGreaterThan(value.amountAsBigNumber);
    }

    /**
     * Performs a check if the current value is greater than or equal to the parameter
     * @param value - value to compare to the current value; type same as constructor
     * @returns - true if the current value is greater than or equal to the parameter
     */
    greaterThanOrEqualTo(value: number|string|Money) {
      value = new Money(value, this.currency);
      return this.value.isGreaterThanOrEqualTo(value.amountAsBigNumber);
    }

    /**
     * Performs a check if the current value is less than the parameter
     * @param value - value to compare to the current value; type same as constructor
     * @returns - true if the current value is less than the parameter
     */
    lessThan(value: number|string|Money) {
      value = new Money(value, this.currency);
      return this.value.isLessThan(value.amountAsBigNumber);
    }

    /**
     * Performs a check if the current value is less than or equal to the parameter
     * @param value - value to compare to the current value; type same as constructor
     * @returns - true if the current value is less than or equal to the parameter
     */
    lessThanOrEqualTo(value: number|string|Money) {
      value = new Money(value, this.currency);
      return this.value.isLessThanOrEqualTo(value.amountAsBigNumber);
    }
  }
);
