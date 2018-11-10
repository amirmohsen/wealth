import deepFreeze from 'deep-freeze';
import data from './data';
import { CurrencyInputSettings, CurrencySettings } from '../Currency';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';

/**
 * Set (register or replace) a currency
 * @param code - Currency code
 * @param settings - Currency settings
 */
const register = (code: string, settings: CurrencyInputSettings = {}) => {
  if (typeof code !== 'string' || !code) {
    throw new InvalidCurrencyError('Invalid currency settings; code is required.');
  }

  const finalSettings: CurrencySettings = {
    ...settings,
    code,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    decimalDigits: 2,
    pattern: '%ns%s%v',
    symbol: settings.symbol || code,
  };

  data[code.toUpperCase()] = deepFreeze(finalSettings);
};

export default register;
