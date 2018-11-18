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
 *  if(e instanceof ClassAugmentationError) {
 *      // handle error
 *  }
 * }
 * ```
 */
export default class ClassAugmentationError extends WealthError {

  /**
   * @param message - Error message
   */
  constructor(message = 'Class augmentation error') {
    /* istanbul ignore next */
    super(message);
  }
}
