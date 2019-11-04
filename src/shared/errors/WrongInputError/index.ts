import WealthError from '../WealthError';

/**
 * Error thrown when the input argument is wrong
 * @example
 * Basic usage
 * ```js
 * try {
 *  // operation
 * }
 * catch(e) {
 *  if(e instanceof WrongInputError) {
 *      // handle error
 *  }
 * }
 * ```
 */
export default class WrongInputError extends WealthError {
  /**
   * @param message - Error message
   */
  constructor(message = 'Wrong input argument') {
    /* istanbul ignore next */
    super(message);
  }
}
