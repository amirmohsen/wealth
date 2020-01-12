import { FrozenBaseCurrency } from 'src/fp/types';
import { CurrencyMismatchError } from 'src/errors';
import isSameAs from '../isSameAs';

const assertCurrencyMatch = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): true => {
  if (!isSameAs(currencyA, currencyB)) {
    throw new CurrencyMismatchError(currencyA, currencyB);
  }
  return true;
};

export default assertCurrencyMatch;
