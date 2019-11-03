import BigNumber from 'bignumber.js';
import { Money } from '../..';
import getSmallestUnitDivisor from './getSmallestUnitDivisor';

/**
 * Convert a BigNumber to a string integer
 * @param value - value to be converted
 * @return - String integer value of the BigNumber value
 */
const convertBigNumberToStringInteger = (money: Money, value: BigNumber): string => {
  return value.times(getSmallestUnitDivisor(money)).toString();
};

export default convertBigNumberToStringInteger;
