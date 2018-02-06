import WealthError from './WealthError';

/**
 * Error thrown when invalid currency is provided
 * @example
 * try {
 *  // operation
 * }
 * catch(e) {
 *  if(e instanceof InvalidCurrencyError) {
 *      // handle error
 *  }
 * }
 */
export default class InvalidCurrencyError extends WealthError {

	/**
	 * @param {string} message - Error message
	 */
	constructor(message = 'Invalid currency') {
		super(message);
	}
}
