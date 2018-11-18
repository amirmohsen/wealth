import { DeepReadonly } from 'deep-freeze';
import { CurrencySettings } from '../../../Currency';

export interface CurrencySettingsInternalStore {
  [key: string]: DeepReadonly<CurrencySettings>;
}

const data: CurrencySettingsInternalStore = {};

export default () => data;
