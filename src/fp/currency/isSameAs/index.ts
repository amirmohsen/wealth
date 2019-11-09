import isEqual from 'lodash/isEqual';
import { FrozenBaseCurrency } from 'src/fp/types';
import isCurrency from '../isCurrency';

const isSameAs = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): boolean =>
  isCurrency(currencyA) && isCurrency(currencyB) && isEqual(currencyA, currencyB);

export default isSameAs;
