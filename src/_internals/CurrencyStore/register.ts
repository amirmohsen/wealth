import deepFreeze from 'deep-freeze';
import getData from './internals/getData';
import { CurrencyInputSettings, CurrencySettings } from '../Currency';
import getDefaultSettings from '../Currency/getDefaultSettings';
import assertCurrencyCode from './internals/assertCurrencyCode';

/**
 * Set (register or replace) a currency
 * @param settings - Currency settings
 */
const register = (settings: CurrencyInputSettings): void => {
  const data = getData();
  const { code } = settings;

  assertCurrencyCode(code);

  const finalSettings: CurrencySettings = {
    ...getDefaultSettings(code),
    symbol: code,
    ...settings,
  };

  data[code] = deepFreeze(finalSettings);
};

export default register;
