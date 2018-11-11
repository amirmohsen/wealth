import register from './register';
import { CurrencyInputSettings } from '../Currency';

/**
 * Set multiple currencies in one go
 * @param map - A map of currency settings
 */
const setMultiple = (list: CurrencyInputSettings[]) => {
  for (const settings of list) {
    register(settings);
  }
};

export default setMultiple;
