import getData from './internals/getData';
import assertCurrencyCode from './internals/assertCurrencyCode';

/**
 * Delete a registered currency
 * @param code - Currency code
 */
const deregister = (code: string): void => {
  const data = getData();
  assertCurrencyCode(code);
  delete data[code];
};

export default deregister;
