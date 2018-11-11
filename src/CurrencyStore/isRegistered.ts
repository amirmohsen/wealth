import getData from './data';

/**
 * Check if currency has been registered
 * @param code - Currency code
 * @returns - True if currency has been registered
 */
const isRegistered = (code: string) => {
  const data = getData();
  return code.toUpperCase() in data;
};

export default isRegistered;
