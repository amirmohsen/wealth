import { BaseCurrencyInputSettingsWithRequiredCode, BaseCurrency } from 'src/fp/types';
import getDefaultSettings from 'src/fp/currency/getDefaultSettings';

const mergeCurrencyInput = (settings: BaseCurrencyInputSettingsWithRequiredCode): BaseCurrency => ({
  ...getDefaultSettings(settings.code),
  ...settings,
});

export default mergeCurrencyInput;
