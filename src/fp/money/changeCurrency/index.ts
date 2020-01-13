import { FrozenBaseMoney, FrozenBaseCurrency } from 'src/fp/types';
import amountAsStringFloat from '../amountAsStringFloat';
import money from '../money';

const changeCurrency = (inputMoney: FrozenBaseMoney, currency: FrozenBaseCurrency): FrozenBaseMoney =>
  money(amountAsStringFloat(inputMoney), currency);

export default changeCurrency;
