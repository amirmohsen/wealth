import getData from './internals/getData';
import assertCurrencyCode from './internals/assertCurrencyCode';

/**
 * Delete a registered currency
 * @param code - Currency code
 */
const deregister = (code: string) => {
  const data = getData();
  assertCurrencyCode(code);
  return delete data[code];
};

export default deregister;
