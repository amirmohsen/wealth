import register from './register';
import { CurrencyInputSettings } from '../Currency';

export interface CurrencySettingsMap {
  [code: string]: CurrencyInputSettings;
}

/**
 * Set multiple currencies in one go
 * @param map - A map of currency settings
 */
const setMultiple = (map: CurrencySettingsMap) => {
  for (const [code, settings] of Object.entries(map)) {
    register(code, settings);
  }
};

export default setMultiple;
