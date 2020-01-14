import { FrozenBaseCurrency } from 'src/fp/types';
import stringifyCurrency from '../stringifyCurrency';

const serializeCurrency = (currency: FrozenBaseCurrency): string =>
  currency.toJSON ? currency.toJSON(currency) : stringifyCurrency(currency);

export default serializeCurrency;
