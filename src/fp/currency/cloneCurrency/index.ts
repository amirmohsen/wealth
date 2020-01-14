import { BaseCurrencyInputSettings, FrozenBaseCurrency } from 'src/fp/types';
import currency from '../createCurrency';

const cloneCurrency = (
  inputCurrency: FrozenBaseCurrency,
  customSettings: BaseCurrencyInputSettings = {},
): FrozenBaseCurrency =>
  currency(inputCurrency.code, {
    ...inputCurrency,
    ...customSettings,
  });

export default cloneCurrency;
