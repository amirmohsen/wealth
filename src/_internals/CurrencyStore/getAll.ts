import { DeepReadonly } from 'deep-freeze';
import { CurrencySettings } from '../Currency';
import getData from './internals/getData';

/**
 * Get all registered currencies
 * @returns - List of currencies, sorted by code alphabetically
 */
const getAll = (): CurrencySettings[]  => {
  const data = getData();
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
