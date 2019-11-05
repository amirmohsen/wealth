import { currencySymbol } from 'src/fp/symbols';
import { BaseCurrencyInputSettingsWithRequiredCode, BaseCurrency } from 'src/fp/types';
import getDefaultSettings from 'src/fp/currency/getDefaultCurrencySettings';

const mergeCurrencyInput = (settings: BaseCurrencyInputSettingsWithRequiredCode): BaseCurrency => ({
  ...getDefaultSettings(settings.code),
  ...settings,
  $$typeof: currencySymbol,
});

export default mergeCurrencyInput;
