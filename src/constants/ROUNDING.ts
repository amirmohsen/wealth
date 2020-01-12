import BigNumber from 'bignumber.js';

export type RoundingType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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
