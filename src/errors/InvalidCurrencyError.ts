import WealthError from './WealthError';

/**
 * Error thrown when invalid currency is provided
 * @example
 * Basic usage
 * ```js
 * try {
 *  // operation
 * }
 * catch(e) {
 *  if(e instanceof InvalidCurrencyError) {
 *      // handle error
 *  }
 * }
 * ```
 */
export default class InvalidCurrencyError extends WealthError {

  /**
   * @param message - Error message
   */
  constructor(message = 'Invalid currency') {
    super(message);
  }
}
