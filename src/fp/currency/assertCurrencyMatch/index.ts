import { FrozenBaseCurrency } from 'src/fp/types';
import { CurrencyMismatchError } from 'src/shared/errors';
import isSameAs from '../isSameAs';

const assertCurrencyMatch = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): void => {
  if (!isSameAs(currencyA, currencyB)) {
    throw new CurrencyMismatchError(`Currencies don't match: ${currencyA} and ${currencyB}`);
  }
};

export default assertCurrencyMatch;
