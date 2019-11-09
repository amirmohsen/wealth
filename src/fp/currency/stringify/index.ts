import { FrozenBaseCurrency } from 'src/fp/types';

const stringify = (currency: FrozenBaseCurrency): string => currency.code;

export default stringify;
