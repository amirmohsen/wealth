import { InvalidCurrencyError } from 'src/errors';
import { FrozenBaseCurrency } from 'src/fp/types';
import isCurrency from '../isCurrency';

const assertCurrency = (currency: FrozenBaseCurrency): true => {
  if (!isCurrency(currency)) {
    throw new InvalidCurrencyError(currency);
  }
  return true;
};

export default assertCurrency;
