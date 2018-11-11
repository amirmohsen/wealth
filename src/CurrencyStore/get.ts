import getData from './data';
import isRegistered from './isRegistered';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';

/**
 * Get currency settings
 * @param code - Currency code
 * @returns - Currency settings
 */
const get = (code: string) => {
  const data = getData();
  if (!isRegistered(code)) {
    throw new InvalidCurrencyError(`No currency with code "${code}" is registered.`);
  }
  return data[code.toUpperCase()];
};

export default get;
