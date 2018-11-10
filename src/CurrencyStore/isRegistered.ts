import data from './data';

/**
 * Check if currency has been registered
 * @param code - Currency code
 * @returns - True if currency has been registered
 */
const isRegistered = (code: string) => code.toUpperCase() in data;

export default isRegistered;
