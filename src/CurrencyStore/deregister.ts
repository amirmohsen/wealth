import data from './data';

/**
 * Delete a registered currency
 * @param code - Currency code
 */
const deregister = (code: string) => {
  return delete data[code.toUpperCase()];
};

export default deregister;
