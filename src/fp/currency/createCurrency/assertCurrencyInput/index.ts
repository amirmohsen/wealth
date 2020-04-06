import { InvalidCurrencyError } from 'src/errors';
import { BaseCurrencyInputSettings, BaseCurrencyInputSettingsWithRequiredCode } from 'src/fp/types';

const assertCurrencyInput = <T>(
  code: string,
  settings: BaseCurrencyInputSettings<T> = {},
): BaseCurrencyInputSettingsWithRequiredCode<T> => {
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
