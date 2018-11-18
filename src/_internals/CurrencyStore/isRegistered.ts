import getData from './internals/getData';
import assertCurrencyCode from './internals/assertCurrencyCode';

/**
 * Check if currency has been registered
 * @param code - Currency code
 * @returns - True if currency has been registered
 */
const isRegistered = (code: string) => {
  const data = getData();
  assertCurrencyCode(code);
  return code in data;
};

export default isRegistered;
