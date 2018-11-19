import BigNumber from 'bignumber.js';

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
enum ROUNDING {
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

export default ROUNDING;
