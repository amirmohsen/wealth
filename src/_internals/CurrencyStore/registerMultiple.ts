import register from './register';
import { CurrencyInputSettings } from '../Currency';

/**
 * Set multiple currencies in one go
 * @param map - A list of currency settings
 */
const registerMultiple = (list: CurrencyInputSettings[]): void => {
  for (const settings of list) {
    register(settings);
  }
};

export default registerMultiple;
