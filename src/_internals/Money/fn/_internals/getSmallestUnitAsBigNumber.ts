import BigNumber from 'bignumber.js';
import { Money } from '../../../Money';
import getSmallestUnitDivisor from './getSmallestUnitDivisor';

/**
 * Get the smallest unit of the currency as a big number
 * @returns - Smallest unit of the currency
 */
const getSmallestUnitAsBigNumber = (money: Money) => {
  return (new BigNumber('1')).dividedBy(getSmallestUnitDivisor(money));
};

export default getSmallestUnitAsBigNumber;
