import { DeepReadonly } from 'deep-freeze';
import { CurrencySettings } from '../Currency';
import data from './data';

/**
 * Get all registered currencies
 * @returns - List of currencies, sorted by code alphabetically
 */
const getAll = (): CurrencySettings[]  => {
  return Object
    .values(data)
    .reduce(
      (
        all: CurrencySettings[],
        settings: DeepReadonly<CurrencySettings>,
      ) => [...all, settings as CurrencySettings],
      [],
      )
    .sort((a: CurrencySettings, b: CurrencySettings) => a.code.localeCompare(b.code));
};

export default getAll;
