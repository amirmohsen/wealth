import getData from './internals/getData';
import isRegistered from './isRegistered';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';
import assertCurrencyCode from './internals/assertCurrencyCode';

/**
 * Get currency settings
 * @param code - Currency code
 * @returns - Currency settings
 */
const get = (code: string) => {
  const data = getData();
  assertCurrencyCode(code);
  if (!isRegistered(code)) {
    throw new InvalidCurrencyError(`No currency with code "${code}" is registered.`);
  }
  return data[code];
};

export default get;
