import { FrozenBaseCurrency } from 'src/fp/types';
import stringify from '../stringify';

const serialize = (currency: FrozenBaseCurrency): string => stringify(currency);

export default serialize;
