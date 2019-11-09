import { BaseCurrencyInputSettings, BaseCurrencyInputSettingsWithRequiredCode } from 'src/fp/types';
import { InvalidCurrencyError } from 'src/shared/errors';

const assertCurrencyInput = (
  code: string,
  settings: BaseCurrencyInputSettings = {},
): BaseCurrencyInputSettingsWithRequiredCode => {
  if (typeof code !== 'string' || !code) {
    throw new InvalidCurrencyError('Currency code is required.');
  }

  if (typeof settings.code !== 'undefined' && settings.code !== code) {
    throw new InvalidCurrencyError('Currency code does not match the settings code.');
  }

  return {
    code,
    ...settings,
  };
};

export default assertCurrencyInput;
