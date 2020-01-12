import { FrozenBaseCurrency } from 'src/fp/types';
import { CurrencySymbol } from 'src/symbols';

const isCurrency = (currency: FrozenBaseCurrency): boolean => Boolean(currency) && currency.$$typeof === CurrencySymbol;

export default isCurrency;
