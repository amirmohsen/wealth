import { CurrencySymbol } from 'src/symbols';
import getDefaultCurrencySettings from 'src/fp/currency/getDefaultCurrencySettings';
import { BaseCurrencyInputSettingsWithRequiredCode, BaseCurrency } from 'src/fp/types';

const mergeCurrencyInput = <T>(settings: BaseCurrencyInputSettingsWithRequiredCode<T>): BaseCurrency =>
  Object.assign(Object.create(null), {
    ...getDefaultCurrencySettings(settings.code),
    ...settings,
    $$typeof: CurrencySymbol,
  });

export default mergeCurrencyInput;
