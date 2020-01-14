import { FrozenBaseCurrency } from 'src/fp/types';

const stringifyCurrency = (currency: FrozenBaseCurrency): string =>
  currency.toString ? currency.toString(currency) : currency.code;

export default stringifyCurrency;
