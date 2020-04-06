import BigNumber from 'bignumber.js';
import ROUNDING from 'src/constants/ROUNDING';
import { FrozenBaseCurrency } from 'src/fp/types';

const generateBigNumberConstructor = ({
  decimalSeparator,
  thousandsSeparator: groupSeparator,
}: FrozenBaseCurrency): typeof BigNumber => {
  return BigNumber.clone({
    DECIMAL_PLACES: 20,
    ROUNDING_MODE: ROUNDING.HALF_UP,
    FORMAT: {
      decimalSeparator,
      groupSeparator,
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: ' ',
      fractionGroupSize: 0,
    },
  });
};

export default generateBigNumberConstructor;
