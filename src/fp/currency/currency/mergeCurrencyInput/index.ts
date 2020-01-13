import { CurrencySymbol } from 'src/symbols';
import { BaseCurrencyInputSettingsWithRequiredCode, BaseCurrency } from 'src/fp/types';
import getDefaultSettings from 'src/fp/currency/getDefaultCurrencySettings';

const mergeCurrencyInput = (settings: BaseCurrencyInputSettingsWithRequiredCode): BaseCurrency =>
  Object.assign(Object.create(null), {
    ...getDefaultSettings(settings.code),
    ...settings,
    $$typeof: CurrencySymbol,
  });

export default mergeCurrencyInput;
