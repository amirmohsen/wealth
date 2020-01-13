import { BaseCurrencyInputSettings, FrozenBaseCurrency } from 'src/fp/types';
import currency from '../currency';

const clone = (inputCurrency: FrozenBaseCurrency, customSettings: BaseCurrencyInputSettings = {}): FrozenBaseCurrency =>
  currency(inputCurrency.code, {
    ...inputCurrency,
    ...customSettings,
  });

export default clone;
