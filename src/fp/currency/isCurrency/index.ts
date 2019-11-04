import { FrozenBaseCurrency } from 'src/fp/types';
import { currencySymbol } from 'src/fp/symbols';

const isCurrency = (currency: FrozenBaseCurrency): boolean => Boolean(currency[currencySymbol]);

export default isCurrency;
