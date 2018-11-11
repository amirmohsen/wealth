import deepFreeze from 'deep-freeze';
import getData from './data';
import { CurrencyInputSettings, CurrencySettings } from '../Currency';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';
import getDefaultSettings from '../Currency/getDefaultSettings';

/**
 * Set (register or replace) a currency
 * @param code - Currency code
 * @param settings - Currency settings
 */
const register = (code: string, settings: CurrencyInputSettings = {}) => {
  const data = getData();

  if (typeof code !== 'string' || !code) {
    throw new InvalidCurrencyError('Invalid currency settings; code is required.');
  }

  const finalSettings: CurrencySettings = {
    ...settings,
    ...getDefaultSettings(code),
    symbol: settings.symbol || code,
  };

  data[code.trim().toUpperCase()] = deepFreeze(finalSettings);
};

export default register;
