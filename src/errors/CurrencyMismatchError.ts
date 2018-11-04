import WealthError from './WealthError';

/**
 * Error thrown when the currency of a parameter
 * doesn't match the currency of the current "Money" object.
 * @example
 * try {
 *  // operation
 * }
 * catch(e) {
 *  if(e instanceof CurrencyMismatchError) {
 *      // handle error
 *  }
 * }
 */
export default class CurrencyMismatchError extends WealthError {

  /**
   * @param message - Error message
   */
  constructor(message = 'Currency mismatch between values') {
    super(message);
  }
}
