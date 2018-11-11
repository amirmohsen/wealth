import deepFreeze from 'deep-freeze';
import getData from './data';
import { CurrencyInputSettings, CurrencySettings } from '../Currency';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';
import getDefaultSettings from '../Currency/getDefaultSettings';
import { WrongInputError } from '../errors';

/**
 * Set (register or replace) a currency
 * @param settings - Currency settings
 */
const register = (settings: CurrencyInputSettings) => {
  const data = getData();
  const { code } = settings;

  if (typeof code !== 'string' || !code) {
    throw new InvalidCurrencyError('Invalid currency settings; code is required.');
  }

  if (code !== code.trim().toUpperCase()) {
    throw new WrongInputError(
      'Currency code must be uppercase and contain no leading or trailing spaces',
    );
  }

  const finalSettings: CurrencySettings = {
    ...getDefaultSettings(code),
    ...settings,
    symbol: settings.symbol || code,
  };

  data[code] = deepFreeze(finalSettings);
};

export default register;
