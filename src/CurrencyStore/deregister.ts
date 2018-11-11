import getData from './data';

/**
 * Delete a registered currency
 * @param code - Currency code
 */
const deregister = (code: string) => {
  const data = getData();
  return delete data[code.toUpperCase()];
};

export default deregister;
